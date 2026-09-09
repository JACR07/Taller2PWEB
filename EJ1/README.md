# API de Cálculo de IVA y Renta (El Salvador)

Ejercicio 1 - Desarrollo de soluciones BE con Node - Express

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
El servidor arrancará en `http://localhost:3000`.

## Endpoint

```
GET /api/calculo/:monto
```

El monto se envía como parámetro de la URL.

### Ejemplo de uso
```
GET http://localhost:3000/api/calculo/1000
```

### Respuesta exitosa (200)
```json
{
  "monto": 1000,
  "iva": 130,
  "renta": 100
}
```

### Reglas de cálculo
- **IVA** = 13% del monto
- **Renta** = 10% del monto

## Validaciones

Si el monto:
- No es numérico
- Es igual a 0
- Es negativo

La API responde con código `400` y el siguiente cuerpo:

```json
{
  "error": "El salario debe ser un número mayor a cero"
}
```

### Ejemplos de prueba
```bash
curl http://localhost:3000/api/calculo/1000    # válido
curl http://localhost:3000/api/calculo/0       # error (igual a 0)
curl http://localhost:3000/api/calculo/-50     # error (negativo)
curl http://localhost:3000/api/calculo/abc     # error (no numérico)
```
