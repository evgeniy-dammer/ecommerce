package model

import "time"

type Product struct {
	Id            string     `json:"id"`
	Name          string     `json:"name"`
	Description   string     `json:"description"`
	ImageId       *string    `json:"image_id"`
	Price         float32    `json:"price"`
	CurrencyId    string     `json:"currency_id"`
	Rating        float32    `json:"rating"`
	CategoryId    string     `json:"category_id"`
	Specification *string    `json:"specification"`
	CreatedAt     time.Time  `json:"created_at"`
	UpdatedAt     *time.Time `json:"updated_at"`
}
