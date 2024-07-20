const express = require('express');
const router = express.Router();
const pool = require('../db/config');

// Obtener todos los insumos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Insumo');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error interno servidor' });
  }
});

// Crear un nuevo insumo
router.post('/', async (req, res) => {
  try {
    const { color, familia, serie, fecha_entrada, fecha_vencimiento, fk_producto } = req.body;
    const result = await pool.query(
      'INSERT INTO Insumo (color, familia, serie, fecha_entrada, fecha_vencimiento, fk_producto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [color, familia, serie, fecha_entrada, fecha_vencimiento, fk_producto]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error interno servidor' });
  }
});

// Obtener un insumo por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Insumo WHERE id_insumo = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Insumo no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error interno servidor' });
  }
});

// Actualizar un insumo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { color, familia, serie, fecha_entrada, fecha_vencimiento, fk_producto } = req.body;
    const result = await pool.query(
      'UPDATE Insumo SET color = $1, familia = $2, serie = $3, fecha_entrada = $4, fecha_vencimiento = $5, fk_producto = $6 WHERE id_insumo = $7 RETURNING *',
      [color, familia, serie, fecha_entrada, fecha_vencimiento, fk_producto, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Insumo no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error interno servidor' });
  }
});

// Eliminar un insumo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM Insumo WHERE id_insumo = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Insumo no encontrado' });
    }
    res.json({ message: 'Insumo eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error interno servidor' });
  }
});

module.exports = router;
