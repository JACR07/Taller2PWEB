Para Ejercicio 1:
npm install
npm start
servidor arranca en `http://localhost:3000`.
respuesta exitosa:
{
  "monto": 1000,
  "iva": 130,
  "renta": 100
}

### Reglas de cálculo
- **IVA** = 13% del monto
- **Renta** = 10% del monto

## Validaciones

Si el monto:
- No es numérico
- Es igual a 0
- Es negativo
La API responde:
{
  "error": "El salario debe ser un número mayor a cero"

}

Para Ejercicio 2:
npm install
npm start
El servidor arrancará en 'http://localhost:3001'
Prueba: http://localhost:3001/api/impuestos?pais=elsalvador&salario=1000
Respuesta exitosa:
{
  "pais": "elsalvador",
  "salarioBruto": 1000,
  "porcentajeIVA": "13%",
  "porcentajeRenta": "10%",
  "iva": 130,
  "renta": 100,
  "salarioNeto": 770
}
El país se recibe de forma flexible: "El Salvador", "el salvador", "ElSalvador", 
con o sin tildes, todo funciona igual gracias a la normalización de texto.
