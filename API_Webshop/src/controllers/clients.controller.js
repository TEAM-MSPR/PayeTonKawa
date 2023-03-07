const { response } = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    host: 'belhbwa8yls2jtyfjluy-postgresql.services.clever-cloud.com',
    user: 'ubmbdses5wpeioit8co1',
    password: 'W8uDI19fylWgm1lDjQrDjLhKYhO83U',
    database: 'belhbwa8yls2jtyfjluy',
    port: '5432'
})

const getTest =  (req, res) => {
    res.send('Hello');
}

const setClients = async (req, res) => {
    const { id, nom, prenom, mail, pseudo, telephone } = req.body;
    await pool.query('INSERT INTO client VALUES ($1, $2, $3, $4, $5, $6)', [id, nom, prenom, mail, pseudo, telephone]);
    res.send('client crée');
}


module.exports = {
    getTest,
    setClients
}