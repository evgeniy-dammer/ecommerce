APP_BIN = app/build/app

### Application
appbuild: clean
	go mod download && go build -o ecommerce ./app/cmd/app/main.go

apprun:
	go run ./app/cmd/app/main.go

appclean:
	rm -f app/ecommerce

applint:
	golangci-lint run


# Database
dbrun:
	docker run -d --name ecommerce-db -e POSTGRES_PASSWORD=qwerty -p 5432:5432 --rm postgres:9.4


# Documentation
swagger:
	swag init -g ./app/cmd/app/main.go -o ./app/docs


# Migrations
migrcreate:
	migrate create -ext sql -dir ./migrations -seq init

migrup:
	migrate -path ./migrations -database 'postgres://postgres:${DB_PASSWORD}@localhost:5432/postgres?sslmode=disable' up

migrdown:
	migrate -path ./migrations -database 'postgres://postgres:${DB_PASSWORD}@localhost:5432/postgres?sslmode=disable' down


# Containers
imagebuild: imageclean
	docker build -t ecommerce app/

imageclean:
	docker image rm -f ecommerce

imageprune:
	docker image prune

contrun:
	docker run -dit --rm -p 1111:1111 --name ecommerce ecommerce

contstop:
	docker stop ecommerce