-- ****************** PostgreSQL ******************;
-- ************************************************;


-- ************************************** "Privileges"

CREATE TABLE "Privileges"
(
 "id"         serial PRIMARY KEY ,
 "name"       varchar(255) NOT NULL ,
 "createdAt"  timestamp with time zone NOT NULL DEFAULT NOW() ,
 "updatedAt"  timestamp with time zone NOT NULL DEFAULT NOW()
);





-- ************************************** "Admins"

CREATE TABLE "Admins"
(
 "id"             serial PRIMARY KEY ,
 "name"           varchar(255) NOT NULL ,
 "email"          varchar(255) NOT NULL ,
 "phone"          varchar(50) NOT NULL ,
 "passwordHash"   varchar(255) NOT NULL ,
 "createdAt"      timestamp with time zone NOT NULL DEFAULT NOW() ,
 "updatedAt"      timestamp with time zone NOT NULL DEFAULT NOW()
);





-- ************************************** "ProductCategories"

CREATE TABLE "ProductCategories"
(
 "id"         serial PRIMARY KEY ,
 "name"       varchar(100) NOT NULL ,
 "createdAt"  timestamp with time zone NOT NULL DEFAULT NOW() ,
 "updatedAt"  timestamp with time zone NOT NULL DEFAULT NOW()
);





-- ************************************** "Users"

CREATE TABLE "Users"
(
 "id"             serial PRIMARY KEY ,
 "name"           varchar(255) NOT NULL ,
 "email"          varchar(255) NOT NULL ,
 "phone"          varchar(50) NOT NULL ,
 "passwordHash"   varchar(255) NOT NULL ,
 "createdAt"      timestamp with time zone NOT NULL DEFAULT NOW() ,
 "updatedAt"      timestamp with time zone NOT NULL DEFAULT NOW()
);





-- ************************************** "AdminPrivileges"

CREATE TABLE "AdminPrivileges"
(
 "id"           serial PRIMARY KEY ,
 "adminId"      bigserial NOT NULL REFERENCES "Admins" ("id") ,
 "privilegeId"  bigserial NOT NULL REFERENCES "Privileges" ("id") ,
 CONSTRAINT "adminPrivilegesAdmin" FOREIGN KEY ("adminId") REFERENCES "Admins" ("id") ,
 CONSTRAINT "adminPrivilegesPrivilege" FOREIGN KEY ("privilegeId") REFERENCES "Privileges" ("id")
);





-- ************************************** "Orders"

CREATE TABLE "Orders"
(
 "id"         bigserial PRIMARY KEY ,
 "userId"     bigserial NOT NULL REFERENCES "Users" ("id") ,
 "createdAt"  timestamp with time zone NOT NULL DEFAULT NOW() ,
 "updatedAt"  timestamp with time zone NOT NULL DEFAULT NOW() ,
 CONSTRAINT "ordersUser" FOREIGN KEY ("userId") REFERENCES "Users" ("id")
);





-- ************************************** "Products"

CREATE TABLE "Products"
(
 "id"           bigserial PRIMARY KEY ,
 "categoryId"   bigserial NOT NULL REFERENCES "ProductCategories" ("id") ,
 "name"         varchar(255) NOT NULL ,
 "description"  text NOT NULL ,
 "imageUrl"     text NOT NULL ,
 "createdAt"    timestamp with time zone NOT NULL DEFAULT NOW() ,
 "updatedAt"    timestamp with time zone NOT NULL DEFAULT NOW() ,
 CONSTRAINT "productsCategory" FOREIGN KEY ("categoryId") REFERENCES "ProductCategories" ("id")
);


-- ************************************** "ProductOrders"

CREATE TABLE "ProductOrders"
(
 "id"         bigserial PRIMARY KEY ,
 "orderId"   bigserial NOT NULL REFERENCES "Orders" ("id") ,
 "productId" bigserial NOT NULL REFERENCES "Products" ("id") ,
 CONSTRAINT "productOrdersOrder" FOREIGN KEY ("orderId") REFERENCES "Orders" ("id") ,
 CONSTRAINT "productOrdersProduct" FOREIGN KEY ("productId") REFERENCES "Products" ("id")
);
