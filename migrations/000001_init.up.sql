BEGIN;

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = ON;
SET check_function_bodies = FALSE;
SET client_min_messages = WARNING;
SET search_path = public, extensions;
SET default_tablespace = '';
Set default_with_oids = FALSE;

-- EXTENSIONS --

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- TABLES --

CREATE TABLE public.currency
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    symbol TEXT NOT NULL
);

CREATE TABLE public.category
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT
);

CREATE TABLE public.product
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image_id UUID,
    price FLOAT DEFAULT 0,
    currency_id UUID NOT NULL REFERENCES public.currency(id),
    rating FLOAT DEFAULT 0,
    category_id UUID NOT NULL REFERENCES public.category(id),
    specification JSONB,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
    CONSTRAINT valid_rating CHECK ( rating <= 5 )
);

-- DATA --

INSERT INTO public.currency
    (name, symbol)
VALUES
    ('Russian Ruble', 'RUB'),
    ('United States Dollar', 'USD'),
    ('Euro', 'EUR');

INSERT INTO public.category
    (name)
VALUES
    ('Household chemicals'),
    ('Food');


COMMIT;