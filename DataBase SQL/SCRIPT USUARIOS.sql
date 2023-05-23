--Se usa la base de datos de Master
USE master 
GO


--Verificacion si la base de datos existe
IF EXISTS(SELECT * FROM sys.databases WHERE name = 'Logins')
BEGIN
   PRINT 'La base de datos se borro'
   -- elminicacion de la base de datos
   DROP DATABASE Logins 
END
GO
--Creacion de la base de datos
CREATE DATABASE Logins
GO


USE Logins
GO


--Verificacion de la existencia de las tabla privilegio
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'privilegios')
BEGIN 
	PRINT 'La tabla de datos se borro'
	DROP TABLE privilegios
END
GO

--Creacion de la tabla privilegios 
CREATE TABLE privilegios(
	cvePrivilegio int not null IDENTITY(1,1), --FK
	privilegio varchar(50),
	
	CONSTRAINT pk_CvePrivilegio PRIMARY KEY(cvePrivilegio)
);
GO



--Verificacion de la existencia de las tabla usuario
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'usuarios')
BEGIN 
	PRINT 'La tabla de datos se borro'
	DROP TABLE usuarios
END
GO
--Creacion de la tabla usuarios
CREATE TABLE usuarios(
	idUsuario int not null IDENTITY(1,1), --PK
	nombre varchar(25),
	apP varchar(25),
	apM varchar(25),
	correoElectronico varchar(60),
	contraseña varchar(50),
	cvePrivilegio int not null, --FK
	CONSTRAINT pk_idUsuario PRIMARY KEY(idUsuario),
	CONSTRAINT fk_cvePrivilegio FOREIGN KEY(cvePrivilegio) REFERENCES privilegios(cvePrivilegio) on delete cascade,
);
GO



IF EXISTS(SELECT * FROM sys.tables WHERE name = 'personal')
BEGIN
	PRINT('La tabla personal se la eliminado exitosamente')
	DROP TABLE personal
END
GO


CREATE TABLE personal(
	idUsuario int not null,
	jefeInmediato int 
	
	CONSTRAINT fk_idUsuario FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) on delete cascade

);
GO





--Verificacion de la existencia de la tabla Usuarios Eliminados
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'usuariosEliminados')
BEGIN
	PRINT 'La tabla usuariosEliminados se ha eliminado de manera exitosa'
	DROP TABLE usuariosEliminados
END

--Creacion de la tabla usuarios eliminados
CREATE TABLE usuariosEliminados(
	idUsuario int not null,
	nombre varchar(40),
	apP varchar(40),
	apM varchar(40),
	cvePrivilegio int not null,
	fechaEliminacion date
);
GO

--Verificacion de existencia de la tabla usuariosActualizados
IF EXISTS(SELECT * FROM sys.tables WHERE name = 'usuariosActualizados')
BEGIN
	PRINT('Se ha eliminado la tabla usuariosActualizados exitosamente')
	DROP TABLE usuariosActualizados
END
GO

CREATE TABLE usuariosActualizados(
	idUsuario int not null,
	nombre varchar(25),
	apP varchar(25),
	apM varchar(25),
	cvePrivilegio int not null,
	fechaActualizacion date
)




----------------------Creacion de triggers-----------------------------------

--Trigger para la tabla usuarios
CREATE TRIGGER tr_usuariosEliminados
ON dbo.usuarios
AFTER DELETE
AS
BEGIN
    INSERT INTO usuariosEliminados (idUsuario, nombre, apP, apM, cvePrivilegio, fechaEliminacion)
    SELECT idUsuario, nombre, apP, apM, cvePrivilegio, GETDATE()
    FROM DELETED;
END
GO

--Trigger para cuendo el usuario recibe una actualizacion 

CREATE TRIGGER tr_actualizacionesUsuario
ON usuarios
AFTER UPDATE
AS
BEGIN
    INSERT INTO dbo.usuariosActualizados(idUsuario, nombre, apP, apM, cvePrivilegio, fechaActualizacion)
    SELECT  i.idUsuario, i.nombre, i.apP, i.apM, i.cvePrivilegio, GETDATE()
    FROM INSERTED as i
    INNER JOIN DELETED as d ON i.idUsuario = d.idUsuario;
END


----------------------Creacion de procedimientos-----------------------------------



------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--Datos de prueba y codigo de prueba (Eliminar en el producto final)


--Datos de prueba de privilegios 
INSERT INTO privilegios VALUES('superusuarios');
INSERT INTO privilegios VALUES('distribuidor');
INSERT INTO privilegios VALUES('operador');
INSERT INTO privilegios VALUES ('vendedor')

SELECT * FROM privilegios

--Datos de ejemplo de usuarios
INSERT INTO dbo.usuarios VALUES ('Ricardo','aboytes', 'perez', 'jefazo1@ejemplo.com', 'contraseñafuerte1234', 1);
-- Generar 20 registros aleatorios
DECLARE @i INT = 1

WHILE @i <= 20
BEGIN
    INSERT INTO usuarios (nombre, apP, apM, correoElectronico, contraseña, cvePrivilegio)
    VALUES ('Usuario' + CAST(@i AS VARCHAR), 'ApellidoP' + CAST(@i AS VARCHAR), 'ApellidoM' + CAST(@i AS VARCHAR), 
            'usuario' + CAST(@i AS VARCHAR) + '@ejemplo.com', 'contraseña' + CAST(@i AS VARCHAR), 
            ABS(CHECKSUM(NEWID())) % 3 + 2) -- Generar un valor aleatorio entre 2 y 4 para cvePrivilegio
    SET @i = @i + 1
END




--Para ver los datos
SELECT * FROM privilegios
SELECT * FROM usuariosActualizados
SELECT * FROM usuarios
SELECT * FROM usuariosEliminados


UPDATE [Logins].[dbo].[usuarios] 
SET 
nombre = 'Vamos con todo', 
apP = 'holis',	
apM = 'como tan', 
cvePrivilegio = 1
WHERE idUsuario = 12




