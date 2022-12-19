-- Banco de dados
CREATE DATABASE "shortly";
\c shortly

-- Estrutura das tabelas
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"name" varchar(50) NOT NULL,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL
);

CREATE TABLE "urls" (
	"id" serial PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES "users"("id"),
	"shortUrl" TEXT NOT NULL,
	"url" TEXT NOT NULL,
	"visitCount" integer NOT NULL
);

CREATE TABLE "sections" (
	"id" serial PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES "users"("id"),
	"token" TEXT NOT NULL
);

-- Dados para as tabelas