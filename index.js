const express = require('express');
const app = express();


// Middleware es para manejar JSON
app.use(express.json());

// C R U D
// Rutas - Talleres
const tallerRouter = require('./routes/taller');
app.use('/talleres', tallerRouter);

// Rutas - Productos
const productoRoutes = require('./routes/productos');
app.use('/productos', productoRoutes);

//Rutas - Insumos
const insumoRoutes = require('./routes/insumos');
app.use('/insumos', insumoRoutes);

//Rutas - Vehiculos
const vehículoRoutes =require ('./routes/vehiculos');
app.use('/vehiculos', vehículoRoutes);

//Rutas - Vendedores
const vendedorRoutes = require('./routes/vendedores');
app.use('/vendedores', vendedorRoutes);

//Rutas - Concesionario
const concesionarioRoutes = require('./routes/concesionario');
app.use('/concesionarios', concesionarioRoutes);

//Rutas - Clientes
const clienteRoutes = require('./routes/clientes');
app.use('/clientes', clienteRoutes);

//Rutas - ventas
const ventaRoutes = require('./routes/ventas');
app.use('/ventas', ventaRoutes);

//Rutas Detalle_Venta
const detalleVentaRoutes = require('./routes/detalle_venta');
app.use('/detalleVenta', detalleVentaRoutes);

//Rutas - ProductoTaller
const productoTallerRoutes = require('./routes/producto_taller');
app.use('/productoTaller', productoTallerRoutes);




// Puerto donde escuchará el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo http://localhost:${PORT}`);
});

