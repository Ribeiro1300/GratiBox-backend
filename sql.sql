CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plans" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"type" TEXT NOT NULL,
	"signup_date" TEXT NOT NULL,
	"delivery_dates" TEXT NOT NULL,
	"product" TEXT NOT NULL,
	"receiver_name" TEXT NOT NULL,
	"address" TEXT NOT NULL,
	"cep" integer NOT NULL,
	"city" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	CONSTRAINT "plans_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "plans" ADD CONSTRAINT "plans_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
