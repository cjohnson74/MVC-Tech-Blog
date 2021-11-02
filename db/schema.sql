DROP DATABASE IF EXISTS techblog_db;
CREATE DATABASE techblog_db;

USE techblog_db;

DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS blogpost;
CREATE TABLE blogpost (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    date_created DATETIME NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id)
    REFERENCES user(id)
);

DROP TABLE IF EXISTS user_blogpost;
CREATE TABLE user_blogpost (
    blogpost_id INT NOT NULL,
    FOREIGN KEY (blogpost_id)
    REFERENCES blogpost(id),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id)
    REFERENCES user(id)
);

DROP TABLE IF EXISTS comment;
CREATE TABLE comment (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    date_created DATETIME NOT NULL,
    blogpost_id INT NOT NULL,
    FOREIGN KEY (blogpost_id)
    REFERENCES blogpost(id),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id)
    REFERENCES user(id)
);