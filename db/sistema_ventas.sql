CREATE TABLE Taller (
    id_taller SERIAL PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL
);

CREATE TABLE Producto (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    descripcion TEXT,
    cantidad INT,
    precio NUMERIC(10, 2),
    codigo_barras VARCHAR(40)
);

CREATE TABLE Insumo (
    id_insumo SERIAL PRIMARY KEY,
    color VARCHAR(40),
    familia VARCHAR(40),
    serie VARCHAR(40),
    fecha_entrada DATE,
    fecha_vencimiento DATE,
    fk_producto INT,
    FOREIGN KEY (fk_producto) REFERENCES Producto(id_producto)
);

CREATE TABLE Vehiculo (
    id_vehiculo SERIAL PRIMARY KEY,
    codigo_vehiculo VARCHAR(40) NOT NULL,
    cilindraje INT,
    linea_vehiculo VARCHAR(40) NOT NULL,
    fk_producto INT,
    FOREIGN KEY (fk_producto) REFERENCES Producto(id_producto)
);

CREATE TABLE Vendedor (
    id_vendedor SERIAL PRIMARY KEY,
    nombre_vendedor VARCHAR(40) NOT NULL,
    apellido_vendedor VARCHAR(40) NOT NULL,
    telefono INT
);

CREATE TABLE Concesionario (
    id_concesionario SERIAL PRIMARY KEY,
    nombre_concesionario VARCHAR(40) NOT NULL,
    direccion VARCHAR(40) NOT NULL,
    ciudad VARCHAR(40) NOT NULL,
    departamento VARCHAR(30),
    telefono INT,
    fk_vendedor INT,
    FOREIGN KEY (fk_vendedor) REFERENCES Vendedor(id_vendedor)
);

CREATE TABLE Cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombre_cliente VARCHAR(40) NOT NULL,
    apellido_cliente VARCHAR(40) NOT NULL,
    telefono_cliente INT,
	direccion_cliente VARCHAR(40) NOT NULL
);

CREATE TABLE Venta (
    id_venta SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    fk_cliente INT,
    fk_vendedor INT,
    FOREIGN KEY (fk_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (fk_vendedor) REFERENCES Vendedor(id_vendedor)
);

CREATE TABLE DetalleVenta (
    id_detalle SERIAL PRIMARY KEY,
    cantidad INT,
    precio_unitario NUMERIC(10, 2),
    fk_venta INT,
    fk_producto INT,
    FOREIGN KEY (fk_venta) REFERENCES Venta(id_venta),
    FOREIGN KEY (fk_producto) REFERENCES Producto(id_producto)
);

CREATE TABLE Producto_Taller (
    id_producto_taller SERIAL PRIMARY KEY,
    fk_taller INT,
    fk_producto INT,
    FOREIGN KEY (fk_taller) REFERENCES Taller(id_taller),
    FOREIGN KEY (fk_producto) REFERENCES Producto(id_producto)
);

INSERT INTO Taller (nombre) VALUES --Arrancamos como id 3 con taller 1
    ('Taller A',
'Taller A',
'Taller 1');

INSERT INTO Producto (nombre, descripcion, cantidad, precio, codigo_barras) VALUES
    ('Filtro de Aceite', 'Filtro de aceite para motores de gasolina', 50, 10.99, '000123456789'),
    ('Aceite de Motor', 'Aceite sintético 5W-30', 100, 29.99, '000987654321'),
    ('Pastillas de Freno', 'Pastillas de freno de alto rendimiento', 75, 45.50, '001234567890'),
    ('Bujías', 'Juego de 4 bujías de iridio', 40, 35.00, '009876543210'),
    ('Líquido de Frenos', 'Líquido de frenos DOT 4', 60, 12.50, '002345678901'),
    ('Filtro de Aire', 'Filtro de aire para motores de alta eficiencia', 30, 20.00, '008765432109'),
    ('Batería Automotriz', 'Batería de 12V 60Ah', 25, 120.00, '003456789012'),
    ('Anticongelante', 'Anticongelante para motor', 80, 15.99, '007654321098'),
    ('Correa de Distribución', 'Correa de distribución reforzada', 20, 85.00, '004567890123'),
    ('Amortiguadores', 'Amortiguadores delanteros', 10, 150.00, '006543210987');

INSERT INTO Insumo (color, familia, serie, fecha_entrada, fecha_vencimiento, fk_producto) VALUES
    ('Negro', 'Filtros', 'Serie 001', '2023-01-15', '2024-01-15', 1),
    ('Transparente', 'Líquidos', 'Serie 002', '2023-02-20', '2024-02-20', 2),
    ('Rojo', 'Frenos', 'Serie 003', '2023-03-25', '2024-03-25', 3),
    ('Plateado', 'Encendido', 'Serie 004', '2023-04-30', '2024-04-30', 4),
    ('Amarillo', 'Líquidos', 'Serie 005', '2023-05-10', '2024-05-10', 5),
    ('Azul', 'Filtros', 'Serie 006', '2023-06-15', '2024-06-15', 6),
    ('Blanco', 'Baterías', 'Serie 007', '2023-07-20', '2024-07-20', 7),
    ('Verde', 'Líquidos', 'Serie 008', '2023-08-25', '2024-08-25', 8),
    ('Marrón', 'Cinturones', 'Serie 009', '2023-09-30', '2024-09-30', 9),
    ('Gris', 'Amortiguadores', 'Serie 010', '2023-10-05', '2024-10-05', 10);

INSERT INTO Vehiculo (codigo_vehiculo, cilindraje, linea_vehiculo, fk_producto) VALUES
    ('MH001', 1600, 'Sedán', 1),
    ('FH002', 2000, 'Camioneta', 2),
    ('VH003', 1800, 'Compacto', 3),
    ('VN004', 2500, 'Camioneta', 4),
    ('MR005', 1400, 'Hatchback', 5),
    ('VH006', 2200, 'Sedan', 6),
    ('RH007', 1900, 'Compacto', 7),
    ('HH008', 1700, 'Convertible', 8),
    ('VH009', 2100, 'Coupe', 9),
    ('GG010', 2300, 'Convertible', 10);

INSERT INTO Vendedor (nombre_vendedor, apellido_vendedor, telefono) VALUES
    ('Pedro', 'Gómez', 111222333),
    ('María', 'López', 444555666),
    ('Juan', 'Martínez', 777888999),
    ('Ana', 'Rodríguez', 222333444),
    ('Carlos', 'Pérez', 555666777),
    ('Laura', 'González', 888999000),
    ('Miguel', 'Hernández', 333444555),
    ('Elena', 'Sánchez', 666777888),
    ('Javier', 'Ramírez', 999000111),
    ('Rosa', 'Torres', 444555666);

INSERT INTO Concesionario (nombre_concesionario, direccion, ciudad, departamento, telefono, fk_vendedor) VALUES
    ('Concesionario La 12', 'Calle Principal 123', 'Ciudad A', 'Departamento X', 111111111, 1),
    ('Concesionario La loma', 'Av. Central 456', 'Ciudad B', 'Departamento Y', 222222222, 2),
    ('Concesionario Tu carro', 'Carrera 789', 'Ciudad C', 'Departamento Z', 333333333, 3),
    ('Concesionario CrediFacil', 'Av. Libertadores 1000', 'Ciudad D', 'Departamento W', 444444444, 4),
    ('Concesionario CrediLondo', 'Calle Mayor 567', 'Ciudad E', 'Departamento V', 555555555, 5),
    ('Concesionario Once', 'Carrera 890', 'Ciudad F', 'Departamento U', 666666666, 6),
    ('Concesionario Caldas', 'Av. Independencia 123', 'Ciudad G', 'Departamento T', 777777777, 7),
    ('Concesionario Scaloneta', 'Calle Real 890', 'Ciudad H', 'Departamento S', 888888888, 8),
    ('Concesionario La 30', 'Av. Bolívar 456', 'Ciudad I', 'Departamento R', 999999999, 9),
    ('Concesionario Del rio', 'Carrera 1234', 'Ciudad J', 'Departamento Q', 1010101010, 10);

INSERT INTO Cliente (nombre_cliente, apellido_cliente, telefono_cliente, direccion_cliente, email) VALUES
('Juan', 'Pérez', 123456789, 'Calle 123', 'juan.perez@example.com'),
('Ana', 'Martínez', 987654321, 'Avenida 456', 'ana.martinez@example.com'),
('Luis', 'Gómez', 555555555, 'Boulevard 789', 'luis.gomez@example.com'),
('María', 'López', 444444444, 'Plaza 101', 'maria.lopez@example.com'),
('Carlos', 'Ruiz', 333333333, 'Pasaje 202', 'carlos.ruiz@example.com'),
('Laura', 'García', 666666666, 'Avenida Central', 'laura.garcia@example.com'),
('Roberto', 'Hernández', 777777777, 'Calle Principal', 'roberto.hernandez@example.com'),
('Sofía', 'Díaz', 888888888, 'Avenida Sur', 'sofia.diaz@example.com'),
('Diego', 'Ramírez', 999999999, 'Boulevard Este', 'diego.ramirez@example.com'),
('Elena', 'Torres', 111111111, 'Calle Norte', 'elena.torres@example.com');

INSERT INTO Venta (fecha, fk_cliente, fk_vendedor) VALUES
    ('2024-06-01', 1, 1),
    ('2024-06-02', 2, 2),
    ('2024-06-03', 3, 3),
    ('2024-06-04', 4, 4),
    ('2024-06-05', 5, 5),
    ('2024-06-06', 6, 6),
    ('2024-06-07', 7, 7),
    ('2024-06-08', 8, 8),
    ('2024-06-09', 9, 9),
    ('2024-06-10', 10, 10);



-- Eliminar los registros existentes
DELETE FROM DetalleVenta;

-- Reiniciar la secuencia de id_detalle
ALTER SEQUENCE detalleventa_id_detalle_seq RESTART WITH 1;

-- Insertar los datos reorganizados con precio_total calculado
INSERT INTO DetalleVenta (cantidad, precio_unitario, fk_venta, fk_producto, tipo_producto, precio_total)
VALUES
    (2, ROUND(50.00 * 1.19, 2), 1, 1, 'vehículo', ROUND(2 * 50.00 * 1.19, 2)),
    (1, ROUND(29.99 * 1.19, 2), 2, 2, 'insumo', ROUND(1 * 29.99 * 1.19, 2)),
    (4, ROUND(45.50 * 1.19, 2), 3, 3, 'vehículo', ROUND(4 * 45.50 * 1.19, 2)),
    (6, ROUND(35.00 * 1.19, 2), 4, 4, 'insumo', ROUND(6 * 35.00 * 1.19, 2)),
    (3, ROUND(12.50 * 1.19, 2), 5, 5, 'vehículo', ROUND(3 * 12.50 * 1.19, 2)),
    (1, ROUND(20.00 * 1.19, 2), 6, 6, 'insumo', ROUND(1 * 20.00 * 1.19, 2)),
    (2, ROUND(120.00 * 1.19, 2), 7, 7, 'vehículo', ROUND(2 * 120.00 * 1.19, 2)),
    (5, ROUND(15.99 * 1.19, 2), 8, 8, 'insumo', ROUND(5 * 15.99 * 1.19, 2)),
    (1, ROUND(85.00 * 1.19, 2), 9, 9, 'vehículo', ROUND(1 * 85.00 * 1.19, 2)),
    (2, ROUND(150.00 * 1.19, 2), 10, 10, 'insumo', ROUND(2 * 150.00 * 1.19, 2));


INSERT INTO Producto_Taller (fk_taller, fk_producto) VALUES
    (3, 1),
    (3, 2),
    (3, 3),
    (3, 4),
    (3, 5),
    (3, 6),
    (3, 7),
    (3, 8),
    (3, 9),
    (3, 10);

--PRUEBAS
SELECT*FROM Cliente;
DELETE FROM Producto_Taller;
ALTER SEQUENCE producto_taller_id_producto_taller_seq RESTART WITH 1;

ALTER SEQUENCE detalleventa_id_detalle_seq RESTART WITH 1;

DELETE FROM DetalleVenta;
ALTER SEQUENCE detalleventa_id_detalle_seq RESTART WITH 1
	


ALTER TABLE Cliente ADD COLUMN email VARCHAR(255);




