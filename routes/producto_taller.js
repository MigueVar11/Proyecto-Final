const express = require('express');
const router = express.Router();
const pool = require('../db/config');

// Obtener todos los registros de Producto_Taller
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Producto_Taller');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
