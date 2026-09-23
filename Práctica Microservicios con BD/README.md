# Práctica Microservicios con BD

## Integrantes

- Juan David Mayorga Vega 20211020137
- Esteban Alexander Bautista Solano 20221020089
- Juan David Orduz Sastoque 20221020096

## Descripción

Este proyecto implementa una arquitectura básica de microservicios con Node.js y Express, donde cada servicio administra un dominio específico y se conecta a su propia base de datos PostgreSQL.

Los servicios desarrollados son:

- cliente-api: gestión de clientes
- producto-api: gestión de productos
- compra-api: registro de compras y validación con cliente y producto

---

## Stack tecnológico

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- nodemon

---

## Estructura del proyecto

```text
Práctica Microservicios con BD/
├── cliente-api/
│   ├── database/
│   │   └── connection.js
│   ├── src/
│   │   ├── routes/
│   │   │   └── clientes.routes.js
│   │   └── server.js
│   ├── .env
│   └── package.json
├── producto-api/
│   ├── database/
│   │   └── connection.js
│   ├── src/
│   │   ├── routes/
│   │   │   └── productos.routes.js
│   │   └── server.js
│   ├── .env
│   └── package.json
├── compra-api/
│   ├── database/
│   │   └── connection.js
│   ├── src/
│   │   ├── routes/
│   │   │   └── compras.routes.js
│   │   ├── services/
│   │   │   ├── clienteService.js
│   │   │   └── productoService.js
│   │   └── server.js
│   ├── .env
│   └── package.json
├── package.json
├── package-lock.json
├── node_modules/
└── README.md
```

---

## Instalación

Desde la raíz del proyecto, instala las dependencias del proyecto principal:

```bash
npm install
```

Luego, instala las dependencias de cada microservicio:

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

Abre una terminal por cada servicio y ejecuta:

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

Los servicios quedan disponibles en:

- cliente-api: http://localhost:3001
- producto-api: http://localhost:3002
- compra-api: http://localhost:3003

---