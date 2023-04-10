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


.PHONY: proto
proto: clean format gen lint

# ===================== BUF =====================

BUF_VERSION=v1.12.0

.PHONY: buf-install
buf-install:
ifeq ($(shell uname -s), Darwin)
	@[ ! -f $(GOPATH)/bin/buf ] || exit 0 && \
	tmp=$$(mktemp -d) && cd $$tmp && \
	curl -L -o buf \
		https://github.com/bufbuild/buf/releases/download/v$(BUF_VERSION)/buf-Darwin-arm64 && \
	mv buf $(GOPATH)/bin/buf && \
	chmod +x $(GOPATH)/bin/buf
else
	@[ ! -f $(GOPATH)/bin/buf ] || exit 0 && \
	tmp=$$(mktemp -d) && cd $$tmp && \
	curl -L -o buf \
		https://github.com/bufbuild/buf/releases/download/v$(BUF_VERSION)/buf-Linux-x86_64 && \
	mv buf $(GOPATH)/bin/buf && \
	chmod +x $(GOPATH)/bin/buf
endif

.PHONY: gen
gen: buf-install
	@$(GOPATH)/bin/buf generate
	@for dir in $(CURDIR)/gen/go/*/; do \
	  cd $$dir && \
	  go mod init && go mod tidy; \
  	done

.PHONY: lint
lint: buf-install
	@$(GOPATH)/bin/buf lint

.PHONY: format
format: buf-install
	@$(GOPATH)/bin/buf format


.PHONY: clean
clean:
	@rm -rf ./gen || true