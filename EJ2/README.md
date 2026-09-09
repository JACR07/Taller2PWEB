# API de Cálculo de IVA y Renta según País (Centroamérica)

Ejercicio 2 - Desarrollo de soluciones BE con Node - Express

## Requisitos
- Node.js instalado (v16 o superior recomendado)

## Instalación
```bash
npm install
```

## Ejecución
```bash
npm start
```
El servidor arrancará en `http://localhost:3001`.

## Estructura del proyecto
- `paises.js` – Objeto de configuración con los países permitidos y sus porcentajes de IVA/Renta.
- `validaciones.js` – Funciones que validan el país y el salario (lanzan errores descriptivos).
- `calculos.js` – Función que calcula IVA, Renta y salario neto, y arma la respuesta.
- `index.js` – Servidor Express: define las rutas y usa try/catch para capturar cualquier error de validación.

## Endpoint

Puedes enviar el país y el salario de dos formas:

**POST** (recomendado)
```
POST /api/impuestos
Content-Type: application/json

{
  "pais": "El Salvador",
  "salario": 1000
}
```

**GET** (para pruebas rápidas desde el navegador)
```
GET /api/impuestos?pais=elsalvador&salario=1000
```

### Respuesta exitosa (200)
```json
{
  "pais": "elsalvador",
  "salarioBruto": 1000,
  "porcentajeIVA": "13%",
  "porcentajeRenta": "10%",
  "iva": 130,
  "renta": 100,
  "salarioNeto": 770
}
```

El país se recibe de forma flexible: "El Salvador", "el salvador", "ElSalvador", con o sin tildes, todo funciona igual gracias a la normalización de texto.

## Países permitidos y porcentajes usados

| País        | IVA | Renta |
|-------------|-----|-------|
| El Salvador | 13% | 10%   |
| Guatemala   | 12% | 5%    |
| Costa Rica  | 13% | 15%   |
| Honduras    | 15% | 25%   |
| Panamá      | 7%  | 15%   |
| Nicaragua   | 15% | 10%   |

> Nota: en la vida real la Renta suele ser progresiva por tramos de ingreso.
> Aquí se usa un porcentaje fijo representativo por país, siguiendo el mismo
> criterio del ejemplo del ejercicio (El Salvador: 13% IVA / 10% Renta).

## Validaciones y manejo de errores

Toda la lógica de validación está envuelta en `try/catch`. Si algún parámetro falla, la API responde con código `400` y un mensaje claro:

| Caso                                   | Mensaje de error                                                |
|-----------------------------------------|-------------------------------------------------------------------|
| Falta el país                          | `El campo "pais" es requerido`                                    |
| País no permitido                      | `El país "X" no es válido. Países permitidos: ...`                |
| Falta el salario                       | `El campo "salario" es requerido`                                  |
| Salario no numérico                    | `El salario debe ser un valor numérico`                            |
| Salario igual a 0                      | `El salario debe ser un número mayor a cero`                       |
| Salario negativo                       | `El salario no puede ser negativo`                                 |

### Ejemplos de prueba
```bash
# Válido
curl -X POST http://localhost:3001/api/impuestos -H "Content-Type: application/json" -d '{"pais":"El Salvador","salario":1000}'

# País no permitido
curl "http://localhost:3001/api/impuestos?pais=mexico&salario=1000"

# Salario negativo
curl "http://localhost:3001/api/impuestos?pais=honduras&salario=-100"

# Salario no numérico
curl "http://localhost:3001/api/impuestos?pais=honduras&salario=abc"
```
