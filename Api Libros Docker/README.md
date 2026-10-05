# Ingeniería de Software para la Web Backend

Integrantes:

- Esteban Alexander Bautista Solano 20221020089
- Juan David Orduz Sastoque 20221020096

# API de ejemplo de libros con Docker

Pequeña actividad desarrollada en clase con el objetivo de aprender a usar Docker, utilizando una estructura básica de backend para gestionar información de libros.

## ¿Qué se hizo?

Se utilizó una API para administrar un catálogo de libros con operaciones CRUD (Crear, Leer, Actualizar y Eliminar) y se Dockerizo la aplicación.

## Tecnologías utilizadas

- Node.js
- Express.js
- JavaScript
- dotenv
- nodemon (para desarrollo)
- Docker

## Estructura del proyecto

```bash
api-ejemplo-libros/
├── src/
│   ├── data/
│   │   └── libros.js
│   ├── routes/
│   │   └── libros.routes.js
│   └── server.js
├── Dockerfile
├── package.json
├── README.md
└── .env
```

### Descripción de archivos

- `src/server.js`: archivo principal que inicializa el servidor Express y configura el middleware.
- `src/routes/libros.routes.js`: define las rutas y la lógica de la API.
- `src/data/libros.js`: arreglo en memoria que simula una base de datos.
- `package.json`: configuración del proyecto y scripts de ejecución.

## Endpoints disponibles

La API está montada bajo la ruta `/libros`.

### 1. Obtener todos los libros

- Método: GET
- Ruta: `/libros`
- Ejemplo: `/libros?autor=Orwell&disponible=true`

Permite filtrar por:

- `autor`
- `genero`
- `disponible`

### 2. Obtener un libro por ID

- Método: GET
- Ruta: `/libros/:id`

Ejemplo:

```bash
GET /libros/2
```

### 3. Crear un libro

- Método: POST
- Ruta: `/libros`

Body esperado:

```json
{
  "titulo": "La vuelta al mundo en 80 días",
  "autor": "Jules Verne",
  "genero": "aventura",
  "disponible": true
}
```

### 4. Actualizar un libro

- Método: PUT
- Ruta: `/libros/:id`

Se pueden modificar uno o varios campos.

### 5. Eliminar un libro

- Método: DELETE
- Ruta: `/libros/:id`

## Validaciones realizadas

Se implementaron algunas validaciones básicas para mejorar la robustez de la API:

- El título y el autor son obligatorios al crear un libro.
- Si el libro no existe, se devuelve un error `404`.
- Si la petición es incorrecta, se responde con `400`.
- Los datos se manejan en formato JSON.

## Cómo ejecutar el proyecto

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar el servidor

```bash
npm start
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

El servidor queda activo por defecto en el puerto `3000`.