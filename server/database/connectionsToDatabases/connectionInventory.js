import  sql  from 'mssql'
import {databaseInventario} from '../../config'


const sqlConfig = {
  user: databaseInventario.user,
  password: databaseInventario.password,
  database: databaseInventario.database,
  server: databaseInventario.server,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

async function getConnectionToInventory(){
    try {
        // make sure that any items are correctly URL encoded in the connection string
        const pool = await sql.connect(sqlConfig)
          return pool; 
       } catch (err) {
        console.log(err)
        console.log("Hubo un error")
       }      
}
export {sql}