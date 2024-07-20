const express = require('express');
const router = express.Router();
const pool = require('../db/config');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Cliente');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear un nuevo cliente
router.post('/', async (req, res) => {
  try {
    const { nombre_cliente, apellido_cliente, telefono_cliente, direccion_cliente, email } = req.body;
    const result = await pool.query(
      'INSERT INTO Cliente (nombre_cliente, apellido_cliente, telefono_cliente, direccion_cliente, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre_cliente, apellido_cliente, telefono_cliente, direccion_cliente, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Cliente WHERE id_cliente = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar un cliente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_cliente, apellido_cliente, telefono_cliente, direccion_cliente, email } = req.body;
    const result = await pool.query(
      'UPDATE Cliente SET nombre_cliente = $1, apellido_cliente = $2, telefono_cliente = $3, direccion_cliente = $4, email = $5 WHERE id_cliente = $6 RETURNING *',
      [nombre_cliente, apellido_cliente, telefono_cliente, direccion_cliente, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM Cliente WHERE id_cliente = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({ message: 'Cliente eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
