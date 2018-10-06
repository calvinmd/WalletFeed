-- ****************** PostgreSQL ******************;
-- ************************************************;


-- ************************************** "privileges"

CREATE TABLE "privileges"
(
 "id"           serial PRIMARY KEY ,
 "name"         varchar(255) NOT NULL ,
 "created_at"   timestamp with time zone NOT NULL DEFAULT NOW() ,
 "updated_at"   timestamp with time zone NOT NULL DEFAULT NOW()
);





-- ************************************** "admins"

CREATE TABLE "admins"
(
 "id"                 serial PRIMARY KEY ,
 "name"               varchar(255) NOT NULL ,
 "email"              varchar(255) NOT NULL ,
 "phone"              varchar(50) NOT NULL ,
 "password_hash"      varchar(255) NOT NULL ,
 "created_at"         timestamp with time zone NOT NULL DEFAULT NOW() ,
 "updated_at"         timestamp with time zone NOT NULL DEFAULT NOW()
);





-- ************************************** "product_categories"

CREATE TABLE "product_categories"
(
 "id"           serial PRIMARY KEY ,
 "name"         varchar(100) NOT NULL ,
 "created_at"   timestamp with time zone NOT NULL DEFAULT NOW() ,
 "updated_at"   timestamp with time zone NOT NULL DEFAULT NOW()
);





-- ************************************** "users"

CREATE TABLE "users"
(
 "id"               serial PRIMARY KEY ,
 "name"             varchar(255) NOT NULL ,
 "email"            varchar(255) NOT NULL ,
 "phone"            varchar(50) NOT NULL ,
 "password_hash"    varchar(255) NOT NULL ,
 "created_at"       timestamp with time zone NOT NULL DEFAULT NOW() ,
 "updated_at"       timestamp with time zone NOT NULL DEFAULT NOW()
);





-- ************************************** "admin_privileges"

CREATE TABLE "admin_privileges"
(
 "id"           serial PRIMARY KEY ,
 "admin_id"      bigserial NOT NULL REFERENCES "admins" ("id") ,
 "privilege_id"  bigserial NOT NULL REFERENCES "privileges" ("id") ,
 CONSTRAINT "admin_privileges_admin" FOREIGN KEY ("admin_id") REFERENCES "admins" ("id") ,
 CONSTRAINT "admin_privileges_privilege" FOREIGN KEY ("privilege_id") REFERENCES "privileges" ("id")
);





-- ************************************** "orders"

CREATE TABLE "orders"
(
 "id"         bigserial PRIMARY KEY ,
 "user_id"     bigserial NOT NULL REFERENCES "users" ("id") ,
 "created_at"  timestamp with time zone NOT NULL DEFAULT NOW() ,
 "updated_at"  timestamp with time zone NOT NULL DEFAULT NOW() ,
 CONSTRAINT "orders_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);





-- ************************************** "products"

CREATE TABLE "products"
(
 "id"           bigserial PRIMARY KEY ,
 "category_id"   bigserial NOT NULL REFERENCES "product_categories" ("id") ,
 "name"         varchar(255) NOT NULL ,
 "description"  text NOT NULL ,
 "image_url"     text NOT NULL ,
 "created_at"    timestamp with time zone NOT NULL DEFAULT NOW() ,
 "updated_at"    timestamp with time zone NOT NULL DEFAULT NOW() ,
 CONSTRAINT "products_category" FOREIGN KEY ("category_id") REFERENCES "product_categories" ("id")
);


-- ************************************** "product_orders"

CREATE TABLE "product_orders"
(
 "id"         bigserial PRIMARY KEY ,
 "order_id"   bigserial NOT NULL REFERENCES "orders" ("id") ,
 "product_id" bigserial NOT NULL REFERENCES "products" ("id") ,
 CONSTRAINT "product_orders_order" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ,
 CONSTRAINT "product_orders_product" FOREIGN KEY ("product_id") REFERENCES "products" ("id")
);
