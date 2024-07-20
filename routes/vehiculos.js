const express = require('express');
const router = express.Router();
const pool = require('../db/config');

// Obtener todos los vehículos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Vehiculo');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear un nuevo vehículo
router.post('/', async (req, res) => {
  try {
    const { codigo_vehiculo, cilindraje, linea_vehiculo, fk_producto } = req.body;
    const result = await pool.query(
      'INSERT INTO Vehiculo (codigo_vehiculo, cilindraje, linea_vehiculo, fk_producto) VALUES ($1, $2, $3, $4) RETURNING *',
      [codigo_vehiculo, cilindraje, linea_vehiculo, fk_producto]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener un vehículo por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Vehiculo WHERE id_vehiculo = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar un vehículo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo_vehiculo, cilindraje, linea_vehiculo, fk_producto } = req.body;
    const result = await pool.query(
      'UPDATE Vehiculo SET codigo_vehiculo = $1, cilindraje = $2, linea_vehiculo = $3, fk_producto = $4 WHERE id_vehiculo = $5 RETURNING *',
      [codigo_vehiculo, cilindraje, linea_vehiculo, fk_producto, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar un vehículo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM Vehiculo WHERE id_vehiculo = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    res.json({ message: 'Vehículo eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
