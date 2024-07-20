const express = require('express');
const router = express.Router();
const pool = require('../db/config');
const sendMail = require('../mailer');

// Obtener todos los detalles de las ventas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM DetalleVenta');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Insertar detalles de venta
router.post('/', async (req, res) => {
  try {
    const { cantidad, precio_unitario, fk_venta, fk_producto, tipo_producto } = req.body;
    const precio_total = (cantidad * precio_unitario).toFixed(2); // Calcular precio_total
    const result = await pool.query(
      'INSERT INTO DetalleVenta (cantidad, precio_unitario, fk_venta, fk_producto, tipo_producto, precio_total) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [cantidad, precio_unitario, fk_venta, fk_producto, tipo_producto, precio_total]
    );
    const detalleVenta = result.rows[0];

    // Obtener información de la venta y el cliente
    const ventaResult = await pool.query('SELECT * FROM Venta WHERE id_venta = $1', [fk_venta]);
    const venta = ventaResult.rows[0];

    const clienteResult = await pool.query('SELECT * FROM Cliente WHERE id_cliente = $1', [venta.fk_cliente]);
    const cliente = clienteResult.rows[0];

    const vendedorResult = await pool.query('SELECT * FROM Vendedor WHERE id_vendedor = $1', [venta.fk_vendedor]);
    const vendedor = vendedorResult.rows[0];
    const nombreVendedor = `${vendedor.nombre_vendedor} ${vendedor.apellido_vendedor}`;

    // Obtener todos los detalles de la venta
    const detallesResult = await pool.query('SELECT * FROM DetalleVenta WHERE fk_venta = $1', [fk_venta]);
    const detalles = detallesResult.rows;

    // Formatear los detalles de la venta
    let detallesTexto = '';
    detalles.forEach(detalle => {
      detallesTexto += `ID detalleVenta: ${detalle.id_detalle}, Cantidad: ${detalle.cantidad}, Precio Unitario: ${detalle.precio_unitario}, Tipo Producto: ${detalle.tipo_producto}, Precio Total: ${detalle.precio_total}\n`;
    });

    // Enviar correo de confirmación al cliente
    const clienteEmail = cliente.email; // Asumiendo que tienes el campo 'email' en la tabla Cliente
    const clienteNombre = `${cliente.nombre_cliente} ${cliente.apellido_cliente}`;
    const subject = 'Confirmación de Compra';
    const text = `Hola ${clienteNombre},\n\nGracias por su compra. Su número de venta es ${venta.id_venta}.\n\nDetalles de la compra:\n${detallesTexto}\n\nSaludos,\nEquipo de Ventas`;

    sendMail(clienteEmail, subject, text);

    // Notificarsobre la venta
    const empleadoEmail = 'nicollorozco36@gmail.com';
    const adminEmail = 'miguelvamo11@gmail.com';
    const subjectNotificacion = 'Nueva Venta Realizada';
    const textNotificacion = `Se ha realizado una nueva venta.\n\nNúmero de venta: ${venta.id_venta}\nCliente: ${clienteNombre}\nVendedor: ${nombreVendedor}\nFecha: ${venta.fecha}\n\nDetalles de la venta:\n${detallesTexto}\nGracias por tu compra.`;

    sendMail(empleadoEmail, subjectNotificacion, textNotificacion);
    sendMail(adminEmail, subjectNotificacion, textNotificacion);

    res.json(detalleVenta);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error interno en el servidor' });
  }
});

module.exports = router;
