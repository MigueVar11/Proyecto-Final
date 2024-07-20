const express = require('express');
const router = express.Router();
const pool = require('../db/config');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Producto');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, cantidad, precio, codigo_barras } = req.body;
    const result = await pool.query(
      'INSERT INTO Producto (nombre, descripcion, cantidad, precio, codigo_barras) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, descripcion, cantidad, precio, codigo_barras]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Producto WHERE id_producto = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Error en el servidor' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, cantidad, precio, codigo_barras } = req.body;
    const result = await pool.query(
      'UPDATE Producto SET nombre = $1, descripcion = $2, cantidad = $3, precio = $4, codigo_barras = $5 WHERE id_producto = $6 RETURNING *',
      [nombre, descripcion, cantidad, precio, codigo_barras, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM Producto WHERE id_producto = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor'});
  }
});

module.exports = router;
