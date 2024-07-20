const express = require('express');
const router = express.Router();
const pool = require('../db/config');

// Obtener todos los concesionarios
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Concesionario');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear un nuevo concesionario
router.post('/', async (req, res) => {
  try {
    const { nombre_concesionario, direccion, ciudad, departamento, telefono, fk_vendedor } = req.body;
    const result = await pool.query(
      'INSERT INTO Concesionario (nombre_concesionario, direccion, ciudad, departamento, telefono, fk_vendedor) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre_concesionario, direccion, ciudad, departamento, telefono, fk_vendedor]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener un concesionario por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Concesionario WHERE id_concesionario = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Concesionario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar un concesionario
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_concesionario, direccion, ciudad, departamento, telefono, fk_vendedor } = req.body;
    const result = await pool.query(
      'UPDATE Concesionario SET nombre_concesionario = $1, direccion = $2, ciudad = $3, departamento = $4, telefono = $5, fk_vendedor = $6 WHERE id_concesionario = $7 RETURNING *',
      [nombre_concesionario, direccion, ciudad, departamento, telefono, fk_vendedor, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Concesionario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar un concesionario
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM Concesionario WHERE id_concesionario = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Concesionario no encontrado' });
    }
    res.json({ message: 'Concesionario eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
