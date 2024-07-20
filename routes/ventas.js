const express = require('express');
const router = express.Router();
const pool = require('../db/config');
const sendMail = require('../mailer');

// Obtener todas las ventas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Venta');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Crear una nueva venta
router.post('/', async (req, res) => {
  try {
    const { fecha, fk_cliente, fk_vendedor } = req.body;
    const result = await pool.query(
      'INSERT INTO Venta (fecha, fk_cliente, fk_vendedor) VALUES ($1, $2, $3) RETURNING *',
      [fecha, fk_cliente, fk_vendedor]
    );
const venta = result.rows[0];
    res.json(venta);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error interno en el servidor' });
  }
});

module.exports = router;

