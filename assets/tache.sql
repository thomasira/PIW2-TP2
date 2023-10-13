
USE DATABASE to-do-list;

CREATE TABLE tache(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tache VARCHAR(45) NOT NULL,
    description VARCHAR(200),
    importance INT NOT NULL
);