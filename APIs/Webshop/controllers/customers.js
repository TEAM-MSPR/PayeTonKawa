import { Pool } from 'pg';
const pool = new Pool({
    host: 'belhbwa8yls2jtyfjluy-postgresql.services.clever-cloud.com',
    user: 'ubmbdses5wpeioit8co1',
    password: 'W8uDI19fylWgm1lDjQrDjLhKYhO83U',
    database: 'belhbwa8yls2jtyfjluy',
    port: '5432'
})

const getProduits = async (req, res) => {
    const response = await pool.query('SELECT * FROM produit'); 
    res.status(200).json(response.rows)
}

export default {
    getProduits
}