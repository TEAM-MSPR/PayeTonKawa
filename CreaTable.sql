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
	CONSTRAINT revendeur_pk PRIMARY KEY (id),
	CONSTRAINT revendeur_fk FOREIGN KEY (id_entreprise) REFERENCES public.entreprise(id)
);

CREATE TABLE public.commande (
	id varchar NOT NULL,
	"id-produit" varchar NOT NULL,
	"id-revendeur" varchar NOT NULL,
	"id-client" varchar NOT NULL,
	CONSTRAINT commande_pk PRIMARY KEY (id),
	CONSTRAINT commande_fk FOREIGN KEY ("id-produit") REFERENCES public.produit(id),
	CONSTRAINT commande_fk_1 FOREIGN KEY ("id-revendeur") REFERENCES public.revendeur(id),
	CONSTRAINT commande_fk_2 FOREIGN KEY ("id-client") REFERENCES public.client(id)
);

CREATE TABLE public.produit (
	id varchar NOT NULL,
	stock float4 NULL,
	nom varchar NOT NULL,
	"Modele-3d" bytea NULL,
	CONSTRAINT produit_pk PRIMARY KEY (id)
);

CREATE TABLE public.client (
	id varchar NOT NULL,
	nom varchar NULL,
	prenom varchar NULL,
	mail varchar NULL,
	pseudo varchar NULL,
	telephone varchar NULL,
	CONSTRAINT client_pk PRIMARY KEY (id)
);

CREATE TABLE public.entreprise (
	id varchar NOT NULL,
	nom varchar NULL,
	mail varchar NULL,
	téléphone varchar NULL,
	CONSTRAINT entreprise_pk PRIMARY KEY (id)
);

CREATE TABLE public.commande (
	id varchar NOT NULL,
	"id-produit" varchar NOT NULL,
	"id-revendeur" varchar NOT NULL,
	"id-client" varchar NOT NULL,
	CONSTRAINT commande_pk PRIMARY KEY (id),
	CONSTRAINT commande_fk FOREIGN KEY ("id-produit") REFERENCES public.produit(id),
	CONSTRAINT commande_fk_1 FOREIGN KEY ("id-revendeur") REFERENCES public.revendeur(id),
	CONSTRAINT commande_fk_2 FOREIGN KEY ("id-client") REFERENCES public.client(id)
);

CREATE TABLE public.catalogue_revendeur (
	id_revendeur varchar NOT NULL,
	id_produit varchar NOT NULL,
	CONSTRAINT catalogue_revendeur_fk FOREIGN KEY (id_revendeur) REFERENCES public.revendeur(id),
	CONSTRAINT catalogue_revendeur_fk_1 FOREIGN KEY (id_produit) REFERENCES public.produit(id)
);
