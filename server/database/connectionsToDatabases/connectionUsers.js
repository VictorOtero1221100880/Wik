import  sql  from 'mssql'
import { databaseLogins } from '../../config'


const sqlConfig = {
  user: databaseLogins.user,
  password:databaseLogins.password,
  database: databaseLogins.database,
  server: databaseLogins.server,
  pool: {
    max: 100,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

export async function getConnectionToUsers(){
    try {
        // make sure that any items are correctly URL encoded in the connection string
        const pool = await sql.connect(sqlConfig)
        console.log("Conexion con usuarios exitosa")
        return pool; 
       } catch (err) {
        console.log(err)
        console.log("Hubi un error")
       }      
}

