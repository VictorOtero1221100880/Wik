export const userQuerys = {
    getAllUser: "SELECT * FROM [Logins].[dbo].[usuarios]",
    insertUser: "INSERT INTO [Logins].[dbo].[usuarios] values(@nombre, @apP , @apM , @cvePrivilegio)",
    getUserById: "SELECT nombre, apP, apM, cvePrivilegio FROM [Logins].[dbo].[usuarios] WHERE idUsuario = @idUsuario AND contraseña = @pass",
    getUserByEmail:  "SELECT nombre, apP, apM, cvePrivilegio FROM [Logins].[dbo].[usuarios] WHERE correoElectronico = @correo AND contraseña = @pass",
    deleteUser: "DELETE usuarios WHERE idUsuario = @idUsuario",
    getOneuserbyId: "SELECT idUsuario FROM [Logins].[dbo].[usuarios] WHERE idUsuario = @idUsuario",
    getOneuserbyEmail: "SELECT correoElectronico FROM [Logins].[dbo].[usuarios] WHERE correoElectronico = @correo",
    updateUser: "UPDATE [Logins].[dbo].[usuarios] SET nombre = @nombre, apP = @apP,	apM = @apM, cvePrivilegio = @cvePrivilegio WHERE idUsuario = @idUsuario"
}