CREATE SCHEMA IF NOT EXISTS `zeekSchema`;

DROP USER IF EXISTS 'paywise_user'@'%';
CREATE USER 'paywise_user'@'%' IDENTIFIED WITH mysql_native_password BY 'd_k1S7-Vz9';
GRANT ALL privileges ON zeekSchema.* TO 'paywise_user'@'%';
FLUSH PRIVILEGES;
