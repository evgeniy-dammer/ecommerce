FROM golang:alpine AS builder
WORKDIR /app
COPY . ./
RUN go mod download && go build -o ecommerce app/cmd/app/main.go

FROM alpine:3.17.0
WORKDIR /app
RUN addgroup -S user && adduser -S user -G user

COPY --from=builder /app/ecommerce /app/ecommerce
COPY .env  /app/

RUN chown -R user:user /app
USER user
CMD ["/app/ecommerce"]