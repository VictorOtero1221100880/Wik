//Con esto traemos la coneccion a la base de datos
import { getConnectionToUsers, sql, userQuerys } from '../database'

/**
 * @method getOneUser
 * @description Metodo que permite obtener solo un usuario apartir de un id
 * @param {id} req.params.id
 * @author Victor Javier Otero Vizcayno
 * 19/05/2023
 */
export const getUser = async (req, res) => {
    let idUsuario = req.params.id;
    const pool = await getConnectionToUsers();
    try {
        const OneUser = await pool.request()
            .input('idUsuario', sql.Int, idUsuario)
            .query(userQuerys.getOneuserbyId)

        switch (OneUser.rowsAffected[0]) {
            //No se encontraron resultados por Id
            case 0:
                res.json(OneUser)
                break;
            //Se encontro solo un resultado
            case 1:
                res.json(OneUser)
                break;
            //Error 404
            default:
                res.json({msg: 404})
                break;
        }
    }
    catch (err) {
        console.log("error n1")
       try {
        const OneUser = await pool.request()
            .input('correo', sql.VarChar, idUsuario)
            .query(userQuerys.getOneuserbyEmail)

        switch (OneUser.rowsAffected[0]) {
            //No se encontraron resultados por correo
            case 0:
                res.json(OneUser)
                break;
            //Se encontro solo un resultado
            case 1:
                res.json(OneUser)
                break;
            //Error 404
            default:
                res.json({ msg: 404 })
                break;
        }
       } catch (error) {
        console.log("error n2 de getuser")
        res.json(error)
       }
       
    }
}

/**
 * @method getUserById
 * @description Metodo que permite obtener informacion de un usuario a partir del idUsuario
 * @param {id} req.params.id
 * @param {pass} req.params.pass
 * @author Victor Javier Otero Vizcayno
 * 18/05/2023
 */
export const getUserById = async (req, res) => {

    let idUsuario = req.params.id;
    let pass = req.params.pass;
    const pool = await getConnectionToUsers();
    try {
        const OneUser = await pool.request()
            .input('idUsuario', sql.Int, idUsuario)
            .input('pass', sql.VarChar, pass)
            .query(userQuerys.getUserById)

        switch (OneUser.rowsAffected[0]) {
            //No se encontraron resultados por Id
            case 0:
                res.json(OneUser)
                break;
            //Se encontro solo un resultado
            case 1:
                res.json(OneUser)
                break;
            //Error 404
            default:
                res.json({status: "Se ha tenido un error con la base de datos"})
                break;
        }
    } catch (err) {
       console.log("error n1 no se encontro por id el usuario")
       try {
        const OneUser = await pool.request()
            .input('correo', sql.VarChar, idUsuario)
            .input('pass', sql.VarChar, pass)
            .query(userQuerys.getUserByEmail)

        switch (OneUser.rowsAffected[0]) {
            //No se encontraron resultados por Id
            case 0:
                res.json(OneUser)
                break;
            //Se encontro solo un resultado
            case 1:
                res.json(OneUser)
                break;
            //Error 404
            default:
                res.json({ msg: "error" })
                break;
        }
       } catch (error) {
        res.json(error)
        console.log("error n2")
       }
    }
}






/**
 * @method createNewEmplooye
 * @description Metodo que permite agregar un usuario junto a todos sus datos
 * 
 * @author Victor Javier Otero Vizcayno
 * 11/05/2023
 */
export const createNewEmplooye = async (req, res) => {
    const { nombre, apP, apM, cvePrivilegio } = req.body;
    if (nombre == null || apP == null || apM == null || cvePrivilegio == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
    try {
        const pool = await getConnectionToUsers();
        const respuesta = await pool.request()
            .input("nombre", sql.VarChar, nombre)
            .input("apP", sql.VarChar, apP)
            .input("apM", sql.VarChar, apM)
            .input("cvePrivilegio", sql.Int, cvePrivilegio)
            .query(userQuerys.insertUser);
        res.json(respuesta)
        console.log(nombre + apP + apM + cvePrivilegio)
    } catch (err) {
        res.status(500);
        res.send(err.message)
    }
}


/**
 * @method deleteEmplooye
 * @description Metodo que permite eliminar informacion de un usuario a partir del idUsuario
 * @param {id} req.params.id
 * @author Victor Javier Otero Vizcayno
 * 11/05/2023
 */
export const deleteEmplooye = async (req, res) => {
    let idUsuario = req.params.id;
    try {
        const pool = await getConnectionToUsers();
        const usuarioEliminado = await pool.request().input("idUsuario", sql.Int, idUsuario)
            .query(userQuerys.deleteUser)
        if (usuarioEliminado.rowsAffected[0] == 1) {
            res.json({ status: 1, msg: "Se ha eliminado el usuario exitosamente" })
        } else if (usuarioEliminado.rowsAffected[0] == 0) {
            res.json({
                status: 2,
                msg: "No se ha eliminado ningun usuario. "
            })
        } else {
            res.json({
                status: 3,
                msg: "Se han eliminado mas de 1 usuario. Tener cuidado"
            })
        }
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}


/**
 * @method updateEmplooye
 * @description Metodo que permite actualizar informacion de un usuario a partir del idUsuario
 * 
 * @author Victor Javier Otero Vizcayno
 * 11/05/2023
 */
export const updateEmplooye = async (req, res) => {
    let idUsuario = req.params.id;
    const { nombre, apP, apM, cvePrivilegio } = req.body;
    if (nombre == null || apP == null || apM == null || cvePrivilegio == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
    try {
        const pool = await getConnectionToUsers();
        const result = await pool.request()
            .input("idUsuario", sql.Int, idUsuario)
            .input("nombre", sql.VarChar, nombre)
            .input("apP", sql.VarChar, apP)
            .input("apM", sql.VarChar, apM)
            .input("cvePrivilegio", sql.Int, cvePrivilegio)
            .query(userQuerys.updateUser)

        if (result.rowsAffected[0] == 1) {
            res.json({
                status: 1,
                msg: "El usuario se ha actualizado correctamente"
            })
        } else if (result.rowsAffected[0] == 0) {
            res.json({
                status: 2,
                msg: "No se ha actualizado el usuario. Checar la consulta"
            })
        } else {
            res.json({
                status: 3,
                msg: "Se ha actualizado a mas de un usuario."
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500);
        res.send(error.message)
    }

}