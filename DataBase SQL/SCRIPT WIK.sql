--Se usa la base de datos de Master
USE master 
GO


--Verificacion si la base de datos existe
IF EXISTS(SELECT * FROM sys.databases WHERE name = 'WIK')
BEGIN
   PRINT 'La base de datos se borro'
   -- elminicacion de la base de datos
   DROP DATABASE WIK
END


--Creacion de la base de datos
CREATE DATABASE WIK 