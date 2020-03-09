CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" text UNIQUE NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "role" text NOT NULL,
  "active" bool NOT NULL DEFAULT true,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "notes" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "title" text NOT NULL,
  "body" text,
  "created_at" timestamp DEFAULT (now())
);

ALTER TABLE "notes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

