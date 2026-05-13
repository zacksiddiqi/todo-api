const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /todos - fetch all the todos

router.get('/', async(req, res) => {
    try{
        const result = await pool.query('SELECT * FROM todos')
    } catch(err){

    }
});