import { config } from "dotenv"
config()

console.log(process.env.PORT)


export const puerto = {
    port: process.env.PORT || 4000,
}

export const databaseLogins = {
    user: process.env.DB_USER_LOGIN || '',
    password: process.env.DB_PASSWORD_LOGIN ||'',
    database: process.env.DB_DATABASE_LOGIN||'',
    server: process.env.DB_SERVER_LOGIN||''
}

export const databaseInventario = {
    user: process.env.DB_USER_Inventario ||'',
    password: process.env.DB_PASSWORD_Inventario||'',
    database: process.env.DB_DATABASE_Inventario||'',
    server: process.env.DB_SERVER_Inventario||''
}