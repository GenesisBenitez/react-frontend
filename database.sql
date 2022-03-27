create database fruitProject;

create table seller(
    id int not null auto_increment,
    firstname varchar(100) not null,
    lastname varchar(100) not null,
    username varchar(100) not null,
    password varchar(100) not null,
    description varchar(1500),
    street_address varchar(250) not null,
    city varchar(100) not null,
    state varchar(100),
    country varchar(100) not null,
    primary key(id)
);

insert into seller(firstname,lastname,username,password,description,street_address,city,state,country)values('Genesis', 'Benitez', 'gen','1234', 'Seller from Atlanta,GA', '1000 America Ave', 'Atlanta', 'GA', 'United States Of America');
