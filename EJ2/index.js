
const express = require('express');
const { validarPais, validarSalario } = require('./validaciones');
const { calcularImpuestos } = require('./calculos');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());


function manejarCalculoImpuestos(req, res) {
  try {
    const { pais, salario } = { ...req.query, ...req.body };

    // 1. Validar país
    const { clave, datos } = validarPais(pais);

    // 2. Validar salario
    const salarioBruto = validarSalario(salario);

    // 3. Calcular impuestos
    const resultado = calcularImpuestos(clave, datos, salarioBruto);

    return res.status(200).json(resultado);
  } catch (error) {
    // Cualquier fallo de validacion cae aqui
    return res.status(400).json({
      error: error.message || 'Ocurrió un error al procesar la solicitud',
    });
  }
}

app.post('/api/impuestos', manejarCalculoImpuestos);
app.get('/api/impuestos', manejarCalculoImpuestos);

//bienvenida
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de cálculo de IVA y Renta según país (Centroamérica)',
    uso: {
      metodo: 'POST',
      ruta: '/api/impuestos',
      body: { pais: 'El Salvador', salario: 1000 },
    },
    pruebaRapida: '/api/impuestos?pais=elsalvador&salario=1000',
    paisesPermitidos: [
      'El Salvador',
      'Guatemala',
      'Costa Rica',
      'Honduras',
      'Panamá',
      'Nicaragua',
    ],
  });
});

//rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejador de errores general (por si algo lanza fuera de un try/catch de ruta)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Prueba: http://localhost:${PORT}/api/impuestos?pais=elsalvador&salario=1000`);
});
