import { Router } from "express";


import {deleteEmplooye,createNewEmplooye, getUser, getUserById, updateEmplooye} from '../controllers/loginControllers'

//Se crea el objeto de router 
const router = Router() 

//Con esta ruta se obtiene todos los usuarios
router.get('/api/login/:id', getUser)

///Con esta ruta se obtiene un solo usuario
router.get('/api/login/:id/:pass', getUserById)


//Con esta ruta se crea un usuario
router.post('/api/newUser', createNewEmplooye)



//Ruta para eliminar a un usuarioo
router.delete('/api/deleteUser/:id', deleteEmplooye)

//Ruta para actualiza al usuario
router.put('/api/updateUser/:id', updateEmplooye)

//se exporta el objeto
export default router