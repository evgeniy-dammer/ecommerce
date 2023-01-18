package storage

import (
	"context"
	"github.com/Masterminds/squirrel"
	"github.com/evgeniy-dammer/ecommerce/internal/domain/product/model"
	db "github.com/evgeniy-dammer/ecommerce/pkg/client/postgresql/model"
	"github.com/evgeniy-dammer/ecommerce/pkg/logger"
)

const (
	tableProduct = "public.product"
)

type ProductStorage struct {
	queryBuilder squirrel.StatementBuilderType
	client       PostgreSQLClient
	logger       *logger.Logger
}

func NewProductStorage(client PostgreSQLClient, logger *logger.Logger) ProductStorage {
	return ProductStorage{
		queryBuilder: squirrel.StatementBuilder.PlaceholderFormat(squirrel.Dollar),
		client:       client,
		logger:       logger,
	}
}

func (s *ProductStorage) queryLogger(sql, table string, args []interface{}) *logger.Logger {
	return s.logger.ExtraFields(map[string]interface{}{
		"sql":   sql,
		"table": table,
		"args":  args,
	})
}

func (s *ProductStorage) All(ctx context.Context) ([]model.Product, error) {
	query := s.queryBuilder.Select("id").
		Column("name").
		Column("description").
		Column("image_id").
		Column("price").
		Column("currency_id").
		Column("rating").
		Column("category_id").
		Column("specification").
		Column("created_at").
		Column("updated_at").
		From(tableProduct)

	// TODO filtering and sorting

	sql, args, err := query.ToSql()

	lgr := s.queryLogger(sql, tableProduct, args)
	if err != nil {
		err = db.ErrCreateQuery(err)
		lgr.Error(err)
		return nil, err
	}

	lgr.Trace("do query")
	rows, err := s.client.Query(ctx, sql, args...)

	defer rows.Close()

	if err != nil {
		err = db.ErrDoQuery(err)
		lgr.Error(err)
		return nil, err
	}

	list := make([]model.Product, 0)

	for rows.Next() {
		p := model.Product{}

		if err = rows.Scan(&p.Id, &p.Name, &p.Description, &p.ImageId, &p.Price, &p.CurrencyId, &p.Rating, &p.CategoryId, &p.Specification, &p.CreatedAt, &p.UpdatedAt); err != nil {
			err = db.ErrScan(err)
			lgr.Error(err)
			return nil, err
		}

		list = append(list, p)
	}

	return list, nil
}
