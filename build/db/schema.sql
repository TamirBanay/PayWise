CREATE SCHEMA IF NOT EXISTS `zeekSchema`;

DROP USER IF EXISTS 'PayWise_db_root'@'%';
CREATE USER 'PayWise_db_root'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL ON *.* TO 'PayWise_db_root'@'%';
FLUSH PRIVILEGES;