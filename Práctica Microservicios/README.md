# Integrantes

- Juan David Mayorga Vega 20211020137
- Esteba Alexander Bautista Solano 20221020089
- Juan David Orduz Sastoque 20221020096

# Práctica Microservicios

Este proyecto consiste en una pequeña arquitectura de microservicios desarrollada con Node.js y Express. Cada servicio tiene una responsabilidad específica y funciona de forma independiente, simulando un sistema básico de gestión de clientes, productos y compras.

## Objetivo

Demostrar cómo se pueden dividir responsabilidades en varios servicios que se comunican entre sí a través de HTTP, manteniendo una lógica modular y separada por dominio.

## Servicios incluidos

| Servicio | Puerto | Funcionalidad |
| --- | ---: | --- |
| cliente-api | 3001 | Gestión de clientes |
| producto-api | 3002 | Gestión de productos |
| compra-api | 3003 | Registro de compras y validación con clientes/productos |

---

## Estructura del proyecto

```text
Práctica Microservicios/
├── cliente-api/
│   ├── src/
│   │   ├── data/
│   │   ├── routes/
│   │   └── server.js
│   ├── package.json
│   └── .env
├── producto-api/
│   ├── src/
│   │   ├── data/
│   │   ├── routes/
│   │   └── server.js
│   ├── package.json
│   └── .env
├── compra-api/
│   ├── src/
│   │   ├── data/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── package.json
│   └── .env
└── README.md
```

---

## Instalación

Desde la raíz del proyecto, entra a cada carpeta y descargue las dependencias:

```bash
cd cliente-api
npm install

cd ../producto-api
npm install

cd ../compra-api
npm install
```

---

## Ejecución

Abre una terminal por servicio y ejecuta:

### cliente-api

```bash
cd cliente-api
npm run dev
```

### producto-api

```bash
cd producto-api
npm run dev
```

### compra-api

```bash
cd compra-api
npm run dev
```

---

## Endpoints

### cliente-api

Base URL: `http://localhost:3001`

- `GET /` → Verifica que el servicio está activo
- `GET /clientes` → Obtiene todos los clientes
- `GET /clientes/:id` → Obtiene un cliente por ID
- `POST /clientes` → Crea un nuevo cliente
- `PUT /clientes/:id` → Actualiza un cliente
- `DELETE /clientes/:id` → Elimina un cliente

---

### producto-api

Base URL: `http://localhost:3002`

- `GET /` → Verifica que el servicio está activo
- `GET /productos` → Obtiene todos los productos
- `GET /productos/:id` → Obtiene un producto por ID
- `POST /productos` → Crea un nuevo producto

---

### compra-api

Base URL: `http://localhost:3003`

- `GET /` → Verifica que el servicio está activo
- `GET /compras` → Obtiene todas las compras
- `GET /compras/:id` → Obtiene una compra por ID
- `POST /compras` → Registra una compra

La API de compras valida lo siguiente:

- Que el cliente exista
- Que el producto exista
- Que haya stock suficiente
- Que el servicio de cliente y producto responda correctamente

Si una validación falla, devuelve un código HTTP apropiado y un mensaje con la causa.

---