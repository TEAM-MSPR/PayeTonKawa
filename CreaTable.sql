CREATE TABLE public.revendeur (
	id varchar NOT NULL,
	nom varchar NOT NULL,
	prenom varchar NOT NULL,
	mail varchar NOT NULL,
	id_entreprise varchar NOT NULL,
	"token" varchar NOT NULL,
	"qr-code" varchar NOT NULL,
	pseudo varchar NOT NULL,
	telephone varchar NULL,
	CONSTRAINT revendeur_pk PRIMARY KEY (id)
);
CREATE TABLE public.commande (
	id varchar NOT NULL,
	"id-produit" varchar NOT NULL,
	"id-revendeur" varchar NOT NULL,
	"id-client" varchar NOT NULL,
	CONSTRAINT commande_pk PRIMARY KEY (id)
);

CREATE TABLE public.produit (
	id varchar NOT NULL,
	stock float4 NULL,
	nom varchar NOT NULL,
	"Modele-3d" bytea NULL,
	CONSTRAINT produit_pk PRIMARY KEY (id)
);
