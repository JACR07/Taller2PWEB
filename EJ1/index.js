const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Porcentajes usados para el cálculo
const PORCENTAJE_IVA = 0.13;   // 13%
const PORCENTAJE_RENTA = 0.10; // 10%

app.use(express.json());

/**
 * revisa que el monto recibido sea un numero mayor a cero.
 * @param {string} valor - Valor crudo tomado del parametro de la URL.
 * @returns {{esValido: boolean, monto: number|null}}
 */
function validarMonto(valor) {
  // Convertimos a número. Number('') -> 0, Number('abc') -> NaN
  const monto = Number(valor);

  if (valor === undefined || valor.trim() === '' || Number.isNaN(monto)) {
    return { esValido: false, monto: null }; // si no es numerico
  }

  if (monto === 0) {
    return { esValido: false, monto: null }; // cuando es igual a 0
  }

  if (monto < 0) {
    return { esValido: false, monto: null }; // cuando es negativo
  }

  return { esValido: true, monto };
}

// Ruta principal del ejercicio: /api/funcion/:parametroURL
app.get('/api/calculo/:monto', (req, res) => {
  const { monto: montoParam } = req.params;
  const { esValido, monto } = validarMonto(montoParam);

  if (!esValido) {
    return res.status(400).json({
      error: 'El salario debe ser un número mayor a cero',
    });
  }

  const iva = Number((monto * PORCENTAJE_IVA).toFixed(2));
  const renta = Number((monto * PORCENTAJE_RENTA).toFixed(2));

  return res.status(200).json({
    monto,
    iva,
    renta,
  });
});

//rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Prueba: http://localhost:${PORT}/api/calculo/1000`);
});
