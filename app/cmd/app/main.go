package main

import (
	"log"
	
	"github.com/evgeniy-dammer/ecommerce/internal/app"
	"github.com/evgeniy-dammer/ecommerce/internal/config"
	"github.com/evgeniy-dammer/ecommerce/pkg/logger"
)

func main() {
	log.Println("config initialization")
	cfg := config.GetConfig()
	
	log.Println("logger initialization")
	logr := logger.GetLogger(cfg.AppConfig.LogLevel)
	
	a, err := app.NewApp(cfg, &logr)
	if err != nil {
		logr.Fatal(err)
	}
	
	logr.Println("Running Application")
	a.Run()
}
