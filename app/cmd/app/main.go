package main

import (
	"context"
	"log"

	"github.com/evgeniy-dammer/ecommerce/internal/app"
	"github.com/evgeniy-dammer/ecommerce/internal/config"
	"github.com/evgeniy-dammer/ecommerce/pkg/logger"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	logr := logger.GetLogger(ctx)

	logr.Info("config initializing")
	cfg := config.GetConfig()

	log.Println("logger initialization")
	ctx = logger.ContextWithLogger(ctx, logr)

	a, err := app.NewApp(ctx, cfg)
	if err != nil {
		logger.GetLogger(ctx).Fatal(err)
	}

	logr.Info("Running Application")
	a.Run(ctx)
}
