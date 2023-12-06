create database cafeteriajs;


create table produtos(
	nome VARCHAR(255),
    preco DOUBLE,
    img VARCHAR(255),
    categoria VARCHAR(255),
    id INT PRIMARY KEY
);

use cafeteriajs;
drop table livros;
create table livros(
	titulo VARCHAR(255),
    autor VARCHAR(255),
    img VARCHAR(255),
    id INT PRIMARY KEY
);

CREATE TABLE usuarios(
	usuario VARCHAR(256) PRIMARY KEY NOT NULL,
    senha VARCHAR(256)
);

INSERT INTO usuarios (usuario, senha) VALUES ("bea", "bea");