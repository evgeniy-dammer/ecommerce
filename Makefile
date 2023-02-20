APP_BIN = app/build/app

### Application
.PHONY: appbuild
appbuild: clean
	go mod download && go build -o ecommerce ./app/cmd/app/main.go

.PHONY: apprun
apprun:
	go run ./app/cmd/app/main.go

.PHONY: appclean
appclean:
	rm -f app/ecommerce

.PHONY: applint
applint:
	golangci-lint run


# Database
.PHONY: dbrun
dbrun:
	docker run -d --name ecommerce-db -e POSTGRES_PASSWORD=qwerty -p 5432:5432 --rm postgres:9.4


# Documentation
.PHONY: swagger
swagger:
	swag init -g ./app/cmd/app/main.go -o ./app/docs


# Migrations
.PHONY: migrcreate
migrcreate:
	migrate create -ext sql -dir ./migrations -seq init

.PHONY: migrup
migrup:
	migrate -path ./migrations -database 'postgres://postgres:${DB_PASSWORD}@localhost:5432/postgres?sslmode=disable' up

.PHONY: migrdown
migrdown:
	migrate -path ./migrations -database 'postgres://postgres:${DB_PASSWORD}@localhost:5432/postgres?sslmode=disable' down


# Containers
.PHONY: imagebuild
imagebuild: imageclean
	docker build -t ecommerce app/

.PHONY: imageclean
imageclean:
	docker image rm -f ecommerce

.PHONY: imageprune
imageprune:
	docker image prune

.PHONY: contrun
contrun:
	docker run -dit --rm -p 1111:1111 --name ecommerce ecommerce

.PHONY: contstop
contstop:
	docker stop ecommerce