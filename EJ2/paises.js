/**
 * Objeto de configuración con los países permitidos y sus porcentajes
 * de IVA y Renta.
 *
 * NOTA: Los porcentajes de "Renta" en la vida real suelen ser progresivos
 * (varían por tramos de ingreso). Para efectos de este ejercicio se usa
 * un porcentaje fijo representativo por país, tal como lo hace el ejemplo
 * de El Salvador (13% IVA / 10% Renta).
 *
 * La clave de cada país es su nombre "normalizado": minúsculas y sin espacios,
 * para que la validación no dependa de mayúsculas/acentos/espacios exactos.
 */

const PAISES = {
  elsalvador: {
    nombre: 'El Salvador',
    iva: 0.13,
    renta: 0.10,
  },
  guatemala: {
    nombre: 'Guatemala',
    iva: 0.12,
    renta: 0.05,
  },
  costarica: {
    nombre: 'Costa Rica',
    iva: 0.13,
    renta: 0.15,
  },
  honduras: {
    nombre: 'Honduras',
    iva: 0.15,
    renta: 0.25,
  },
  panama: {
    nombre: 'Panamá',
    iva: 0.07,
    renta: 0.15,
  },
  nicaragua: {
    nombre: 'Nicaragua',
    iva: 0.15,
    renta: 0.10,
  },
};

module.exports = PAISES;
