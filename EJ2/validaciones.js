const PAISES = require('./paises');

/**
 * Normaliza un texto: minusculas, sin espacios y sin tildes.
 * Permite que el usuario envie "El Salvador", "el salvador", "ElSalvador", etc.
 * @param {string} texto
 * @returns {string}
 */
function normalizarTexto(texto) {
  return String(texto)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/\s+/g, ''); // quita espacios
}

/**
 * Valida que el pais exista, no venga vacio y este dentro de la lista
 * de paises permitidos.
 * @param {string} pais - Pais ingresado
 * @returns {{clave: string, datos: object}} Datos del pais revisados
 * @throws {Error} Si el pais falta o no esta permitido
 */
function validarPais(pais) {
  if (pais === undefined || pais === null || String(pais).trim() === '') {
    throw new Error('El campo "pais" es requerido');
  }

  const clave = normalizarTexto(pais);
  const datos = PAISES[clave];

  if (!datos) {
    const listaPermitidos = Object.values(PAISES)
      .map((p) => p.nombre)
      .join(', ');
    throw new Error(
      `El pais "${pais}" no es valido. Paises permitidos: ${listaPermitidos}`
    );
  }

  return { clave, datos };
}

/**
 * Valida que el salario venga presente,numerico y mayor a cero
 * @param {string|number} salario - Salario enviado por el usuario
 * @returns {number} Salario convertido a numero
 * @throws {Error} Si el salario falta, no es numerico o no es mayor a cero
 */
function validarSalario(salario) {
  if (salario === undefined || salario === null || String(salario).trim() === '') {
    throw new Error('El campo "salario" es requerido');
  }

  const salarioNumerico = Number(salario);

  if (Number.isNaN(salarioNumerico)) {
    throw new Error('El salario debe ser un valor numérico');
  }

  if (salarioNumerico === 0) {
    throw new Error('El salario debe ser un número mayor a cero');
  }

  if (salarioNumerico < 0) {
    throw new Error('El salario no puede ser negativo');
  }

  return salarioNumerico;
}

module.exports = {
  normalizarTexto,
  validarPais,
  validarSalario,
};
