DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    password VARCHAR(200),
    email VARCHAR(100) UNIQUE
);

DROP TABLE IF EXISTS contracts;
CREATE TABLE contracts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    type VARCHAR(200),
    per_payment double,
    term_length int,
    term_fee double,
    payment double,
    status VARCHAR(100)
);

DROP TABLE IF EXISTS cashkicks;
CREATE TABLE cashkicks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    status VARCHAR(200),
    maturity date,
    total_received double,
    total_financed double,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

DROP TABLE IF EXISTS cashkick_contract;
CREATE TABLE cashkick_contract (
    id INT PRIMARY KEY AUTO_INCREMENT,
    partial_amount double,
    user_id int,
    cashkick_id int,
    contract_id int,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (cashkick_id) REFERENCES cashkicks(id),
    FOREIGN KEY (contract_id) REFERENCES contracts	(id)
);

DROP TABLE IF EXISTS payment;
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    status VARCHAR(200),
    due_date date,
    expected_amount double,
    outstanding double,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES user(id)
);