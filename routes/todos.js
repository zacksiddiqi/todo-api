const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /todos - fetch all the todos

router.get('/', async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
        res.json(rows);
    } catch(err){
        res.status(500).json({error: err.message});
    }
});


 // GET /todos/:id - fetch a single todo
router.get('/:id', async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({error: 'Not Found'});
        res.json(rows[0]);
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

// POST /todos - create new todo
router.post('/', async(req, res) => {
    const {title} = req.body;
    if (!title) return res.status(400).json({error: 'Title is required'});
    try{
        const [result] = await pool.query(
            'INSERT INTO todos (title) VALUES (?)', [title]);
        const [rows] = await pool.query(
            'SELECT * FROM todos WHERE id = ?', [result.insertId]);
        res.status(201).json(rows[0]);
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

// PUT /todos/:id - update a todo
router.put('/:id', async(req, res) => {
    const {title, completed} = req.body;
    try{
        const [check] = await pool.query('SELECT * FROM todos WHERE id = ?', [req.params.id]);
        if (check.length === 0) return res.status(404).json({error: 'Not Found'});
        await pool.query('UPDATE todos SET title = COALESCE(?, title), completed = COALESCE(?, completed) WHERE id = ?',
            [title ?? null, completed ?? null, req.params.id]
        );
        const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [req.params.id]);
        res.json(rows[0]);
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

// DELETE /todos/:id - delete a todo
router.delete('/:id', async(req, res) => {
    try{
        const [check] = await pool.query('SELECT * FROM todos WHERE id = ?', [req.params.id]);
        if (check.length === 0) return res.status(404).json({error: 'Not Found'});
        await pool.query('DELETE FROM todos WHERE id = ?', [req.params.id]);
        res.json({message: 'Todo deleted successfully', id: parseInt(req.params.id)});
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;