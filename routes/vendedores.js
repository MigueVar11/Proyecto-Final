const express = require('express');
const router = express.Router();
const pool = require('../db/config');

// Obtener todos los vendedores
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Vendedor');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error interno en el servidor' });
  }
});

// Crear un nuevo vendedor
router.post('/', async (req, res) => {
  try {
    const { nombre_vendedor, apellido_vendedor, telefono } = req.body;
    const result = await pool.query(
      'INSERT INTO Vendedor (nombre_vendedor, apellido_vendedor, telefono) VALUES ($1, $2, $3) RETURNING *',
      [nombre_vendedor, apellido_vendedor, telefono]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error interno en el servidor' });
  }
});

// Obtener un vendedor por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Vendedor WHERE id_vendedor = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendedor no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error interno en el servidor' });
  }
});

// Actualizar un vendedor
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_vendedor, apellido_vendedor, telefono } = req.body;
    const result = await pool.query(
      'UPDATE Vendedor SET nombre_vendedor = $1, apellido_vendedor = $2, telefono = $3 WHERE id_vendedor = $4 RETURNING *',
      [nombre_vendedor, apellido_vendedor, telefono, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendedor no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error interno en el servidor' });
  }
});

// Eliminar un vendedor
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM Vendedor WHERE id_vendedor = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendedor no encontrado' });
    }
    res.json({ message: 'Vendedor eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error interno en el servidor' });
  }
});

module.exports = router;
