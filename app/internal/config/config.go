package config

import (
	"github.com/ilyakaznacheev/cleanenv"
	"log"
	"sync"
)

// Config handles environment config
type Config struct {
	IsDebug       bool `env:"IS_DEBUG" env-default:"false"`
	IsDevelopment bool `env:"IS_DEV" env-default:"false"`
	Listen        struct {
		Type       string `env:"LISTEN_TYPE" env-default:"port"`
		BindIP     string `env:"BIND_IP" env-default:"0.0.0.0"`
		Port       string `env:"PORT" env-default:"10000"`
		SocketFile string `env:"SOCKET_FILE" env-default:"app.sock"`
	}
	AppConfig struct {
		LogLevel  string `env:"LOG_LEVEL" env-default:"trace"`
		AdminUser struct {
			Email    string `env:"ADMIN_EMAIL" env-default:"admin"`
			Password string `env:"ADMIN_PASSWORD" env-default:"admin"`
		}
	}
}

var instance *Config
var once sync.Once

// GetConfig return configuration instance
func GetConfig() *Config {
	once.Do(func() {
		log.Print("gather config")
		
		instance = &Config{}
		
		if err := cleanenv.ReadEnv(instance); err != nil {
			var helpText = "Note Service"
			description, err := cleanenv.GetDescription(instance, &helpText)
			if err != nil {
				log.Fatalf("unable to get read error desciption: %s", err.Error())
			}
			
			log.Println(description)
			log.Fatalf("unable to read environment variables: %s", err.Error())
		}
	})
	return instance
}
