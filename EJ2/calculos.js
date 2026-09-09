/**
 * Calcula el IVA, la Renta y el salario neto para un salario y un pais dados,
 * y arma el objeto de respuesta con el formato solicitado.
 *
 * @param {string} claveNormalizada - Clave normalizada del pais 
 * @param {object} datosPais - Objeto con { nombre, iva, renta } del pais
 * @param {number} salarioBruto - Salario ingresado por el usuario
 * @returns {object} Objeto con el detalle del calculo de impuestos
 */
function calcularImpuestos(claveNormalizada, datosPais, salarioBruto) {
  const iva = Number((salarioBruto * datosPais.iva).toFixed(2));
  const renta = Number((salarioBruto * datosPais.renta).toFixed(2));
  const salarioNeto = Number((salarioBruto - iva - renta).toFixed(2));

  return {
    pais: claveNormalizada,
    salarioBruto,
    porcentajeIVA: `${Math.round(datosPais.iva * 100)}%`,
    porcentajeRenta: `${Math.round(datosPais.renta * 100)}%`,
    iva,
    renta,
    salarioNeto,
  };
}

module.exports = { calcularImpuestos };
