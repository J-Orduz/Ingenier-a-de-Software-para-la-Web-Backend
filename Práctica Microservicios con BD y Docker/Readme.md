# Práctica Microservicios con BD y Docker

Esta práctica implementa una arquitectura de microservicios con Node.js, Express, Sequelize y PostgreSQL, orquestada con Docker Compose. Cada servicio expone una API REST para gestionar clientes, productos y compras, y todos comparten la misma base de datos relacional.

## Integrantes

- Juan David Mayorga Vega 20211020137
- Esteban Alexander Bautista Solano 20221020089
- Juan David Orduz Sastoque 20221020096

## Descripción general

El sistema está compuesto por tres APIs independientes:

- Cliente API: gestión de clientes
- Producto API: gestión de productos
- Compra API: gestión de compras y validación de cliente/producto

Además, incluye:

- PostgreSQL como base de datos principal
- pgAdmin para gestión visual de la base de datos
- Docker Compose para levantar todo el entorno de forma centralizada

## Arquitectura

- `cliente-api`: expone endpoints para clientes
- `producto-api`: expone endpoints para productos
- `compra-api`: expone endpoints para compras y consulta datos de clientes/productos hacia los otros servicios
- `db`: instancia de PostgreSQL 17
- `pgadmin`: interfaz web para administrar PostgreSQL

## Stack tecnológico

- Node.js 20
- Express
- Sequelize
- PostgreSQL 17
- Docker
- Docker Compose
- pgAdmin

## Estructura del proyecto

```text
Práctica Microservicios con BD y Docker/
├── docker-compose.yml
├── cliente-api/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   └── src/
├── producto-api/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   └── src/
├── compra-api/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   └── src/
└── README.md
```

## Servicios y puertos

| Servicio | Puerto externo | Descripción |
|---|---:|---|
| `cliente-api` | 3001 | API de clientes |
| `producto-api` | 3002 | API de productos |
| `compra-api` | 3003 | API de compras |
| `db` | 5432 | PostgreSQL |
| `pgadmin` | 5050 | Administración de PostgreSQL |

## Inicio rápido

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Esto construirá las imágenes de los servicios y levantará todos los contenedores.

## Verificación

Después de iniciar los servicios, puedes acceder a:

- Cliente API: http://localhost:3001
- Producto API: http://localhost:3002
- Compra API: http://localhost:3003
- pgAdmin: http://localhost:5050

Credenciales de pgAdmin:

- Email: `admin@admin.com`
- Password: `admin`

## Detener el entorno

```bash
docker compose down
```

Para limpiar también los volúmenes de datos:

```bash
docker compose down -v
```

## Observaciones

- La base de datos se almacena en un volumen Docker llamado `db_data`.
- Los servicios se inician con `depends_on` y validan la salud de PostgreSQL antes de continuar.
- Cada API usa Sequelize para sincronizar modelos con la base de datos en arranque (`sequelize.sync({ alter: true })`).

## Contribución

Este repositorio está enfocado a una práctica académica de microservicios, por lo que su propósito principal es demostrar la comunicación entre servicios, la persistencia con PostgreSQL y la orquestación con Docker.
