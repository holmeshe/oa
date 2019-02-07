# Online Assessment for VetRadar

## Install & start
```
>cd oa
>npm install
>DEBUG=cart:* npm start
```

then,

`http://localhost:3000/`
-> Browser

## APIs

`/products` : get all products

`/cart/add?id={product id}` : add one product to the cart

`/cart/view` : list cart

`/cart/remove?id={product id}` : remove one product from the cart

`/cart/removeAll?id={product id}` : remove all product (of one kind) from the cart

## SQLs for database establishing 

**(Just for reference, the SQLite file is already included in the working directory)**

==================================================================================

CREATE TABLE products(uid CHAR(32) PRIMARY KEY, name TEXT, price INTEGER);

INSERT INTO products values('b0885a5c2aa511e9b210d663bd873d93', 'Sledgehammer', 12576);

INSERT INTO products values('b0885d042aa511e9b210d663bd873d93', 'Axe', 19051);

INSERT INTO products values('b0885e622aa511e9b210d663bd873d93', 'Bandsaw', 56214);

INSERT INTO products values('b0885fac2aa511e9b210d663bd873d93', 'Chisel', 139);

INSERT INTO products values('b08860f62aa511e9b210d663bd873d93', 'Hacksaw', 1945);

==================================================================================

