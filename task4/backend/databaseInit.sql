create table category
(
    id   int auto_increment primary key,
    name varchar(256) null
);

create table order_status
(
    id   int auto_increment primary key,
    name varchar(256) not null
);

create table order_entity
(
    id              int auto_increment primary key,
    creation_date   datetime     null,
    user_name       varchar(256) not null,
    email           varchar(256) not null,
    phone           varchar(256) null,
    order_status_id int          not null,
    foreign key (order_status_id) references order_status (id)
);

create table product
(
    id          int auto_increment primary key,
    name        varchar(256) not null,
    description text         not null,
    unit_price  float        not null,
    unit_weight float        not null,
    category_id int          not null,
    foreign key (category_id) references category (id)
);

create table order_items
(
    id         int auto_increment primary key,
    order_id   int not null,
    product_id int not null,
    quantity   int not null,
    foreign key (product_id) references product (id),
    foreign key (order_id) references order_entity (id)
);

