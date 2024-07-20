const express = require('express');
const router = express.Router();
const pool = require('../db/config');

//VER TODOS LOS TALLERES
router.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Taller');
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error('Error en GET /talleres', err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

//CRUD TALLER
// Crear un nuevo taller
router.post('/', async (req, res) => {
  try {
    const { nombre } = req.body;
    const result = await pool.query('INSERT INTO Taller (nombre) VALUES ($1) RETURNING *', [nombre]);
    res.json(result.rows[0],{ message: 'Creado' });
  } catch (err) {
    console.error(err.message);
  }
});

// Obtener un taller por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Taller WHERE id_taller = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Actualizar un taller
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const result = await pool.query('UPDATE Taller SET nombre = $1 WHERE id_taller = $2 RETURNING *', [nombre, id]);
    res.json(result.rows[0],{ message: 'Actualizado' });
  } catch (err) {
    console.error(err.message);
  }
});

// Eliminar un taller
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM Taller WHERE id_taller = $1', [id]);
    res.json({ message: 'Taller eliminado' });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;


