package app

import (
	"context"
	"errors"
	"fmt"
	"golang.org/x/sync/errgroup"
	"net"
	"net/http"
	"time"

	_ "github.com/evgeniy-dammer/ecommerce/docs"
	"github.com/evgeniy-dammer/ecommerce/internal/config"
	"github.com/evgeniy-dammer/ecommerce/internal/domain/product/storage"
	"github.com/evgeniy-dammer/ecommerce/pkg/client/postgresql"
	"github.com/evgeniy-dammer/ecommerce/pkg/logger"
	"github.com/evgeniy-dammer/ecommerce/pkg/metric"
	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
	httpSwagger "github.com/swaggo/http-swagger"
)

type App struct {
	cfg        *config.Config
	router     *httprouter.Router
	pgClient   *pgxpool.Pool
	httpServer *http.Server
}

func NewApp(ctx context.Context, config *config.Config) (App, error) {
	logger.GetLogger(ctx).Info("router initializing")
	router := httprouter.New()

	logger.GetLogger(ctx).Info("documentation initializing")
	router.Handler(http.MethodGet, "/swagger", http.RedirectHandler("/swagger/index.html", http.StatusMovedPermanently))
	router.Handler(http.MethodGet, "/swagger/*any", httpSwagger.WrapHandler)

	logger.GetLogger(ctx).Info("heartbeat metric initializing")
	metricHandler := metric.Handler{}
	metricHandler.Register(router)

	pgConfig := postgresql.NewPgConfig(
		config.PostgreSQL.Username,
		config.PostgreSQL.Password,
		config.PostgreSQL.Host,
		config.PostgreSQL.Port,
		config.PostgreSQL.Database,
	)

	pgClient, err := postgresql.NewClient(ctx, 5, time.Second*5, pgConfig)

	if err != nil {
		logger.GetLogger(ctx).Fatal(err)
	}

	_ = storage.NewProductStorage(pgClient)

	return App{
		cfg:      config,
		router:   router,
		pgClient: pgClient,
	}, nil
}

func (a *App) Run(ctx context.Context) error {
	grp, ctx := errgroup.WithContext(ctx)

	grp.Go(func() error {
		return a.startHTTP(ctx)
	})

	logger.GetLogger(ctx).Info("application initialized and started")

	return grp.Wait()
}

func (a *App) startHTTP(ctx context.Context) error {
	logger.GetLogger(ctx).WithFields(map[string]interface{}{
		"IP":   a.cfg.HTTP.IP,
		"Port": a.cfg.HTTP.Port,
	})

	listener, err := net.Listen("tcp", fmt.Sprintf("%s:%d", a.cfg.HTTP.IP, a.cfg.HTTP.Port))
	if err != nil {
		logger.GetLogger(ctx).WithError(err).Fatal("failed to create listener")
	}

	c := cors.New(cors.Options{
		AllowedMethods:     a.cfg.HTTP.CORS.AllowedMethods,
		AllowedOrigins:     a.cfg.HTTP.CORS.AllowedOrigins,
		AllowCredentials:   a.cfg.HTTP.CORS.AllowCredentials,
		AllowedHeaders:     a.cfg.HTTP.CORS.AllowedHeaders,
		OptionsPassthrough: a.cfg.HTTP.CORS.OptionsPassthrough,
		ExposedHeaders:     a.cfg.HTTP.CORS.ExposedHeaders,
		Debug:              a.cfg.HTTP.CORS.Debug,
	})

	handler := c.Handler(a.router)

	a.httpServer = &http.Server{
		Handler:      handler,
		WriteTimeout: a.cfg.HTTP.WriteTimeout,
		ReadTimeout:  a.cfg.HTTP.ReadTimeout,
	}

	logger.GetLogger(ctx).Info("application completely initialized and started")

	if err = a.httpServer.Serve(listener); err != nil {
		switch {
		case errors.Is(err, http.ErrServerClosed):
			logger.GetLogger(ctx).Warning("server shutdown")
		default:
			logger.GetLogger(ctx).Fatal(err)
		}
	}

	err = a.httpServer.Shutdown(context.Background())

	if err != nil {
		logger.GetLogger(ctx).Fatal(err)
	}

	return err
}
