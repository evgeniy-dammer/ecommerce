package storage

import (
	"github.com/evgeniy-dammer/ecommerce/pkg/client/postgresql"
	"github.com/evgeniy-dammer/ecommerce/pkg/logger"
)

type storage struct {
	client postgresql.Client
	logger *logger.Logger
}
