# Práctica de Docker con Node.js y Nginx

Integrantes:

- Esteban Alexander Bautista Solano 20221020089
- Juan David Orduz Sastoque 20221020096

## Descripción

Este proyecto es una pequeña práctica de contenedores Docker para desplegar una aplicación web desarrollada con Node.js y servirla a través de un proxy inverso con Nginx.

La aplicación consiste en:

- un servidor Node.js que sirve la página HTML principal
- un endpoint JSON en `/estado` para comprobar el estado del servicio
- un contenedor Nginx que redirige el tráfico hacia la aplicación Node.js
- la orquestación de ambos servicios con Docker Compose

## Tecnologías utilizadas

- Node.js
- JavaScript
- HTML/CSS
- Docker
- Docker Compose
- Nginx

## Estructura del proyecto

```text
mi-app-docker/
├── Dockerfile
├── docker-compose.yml
├── index.html
├── nginx.conf
├── package.json
├── server.js
└── README.md
```

## Cómo funciona la aplicación

### Servicio web (Node.js)

El archivo `server.js` crea un servidor HTTP con Node.js y responde de dos maneras:

- si la ruta es `/`, devuelve la página HTML `index.html`
- si la ruta es `/estado`, devuelve un JSON con información del servicio como:
  - estado
  - entorno
  - runtime
  - timestamp

### Proxy inverso (Nginx)

El archivo `nginx.conf` configura Nginx para escuchar en el puerto 80 y reenviar las peticiones al servicio `web` que corre en el puerto 3000.

Esto permite acceder a la app a través del puerto 8080 del host, mientras que la aplicación interna sigue escuchando en el puerto 3000.

## Ejecución local

### Opción 1: con Docker Compose

Desde la raíz del proyecto, ejecuta:

```bash
docker compose up --build
```

Esto construirá las imágenes y levantará los servicios definidos en `docker-compose.yml`.

### Opción 2: solo con Docker

Puedes construir la imagen manualmente:

```bash
docker build -t mi-app-docker .
```

Y luego ejecutarla:

```bash
docker run -p 3000:3000 --name mi-app-docker mi-app-docker
```

## Acceso a la aplicación

Una vez levantados los contenedores:

- Aplicación principal: http://localhost:3000
- Proxy Nginx: http://localhost:8080
- Endpoint de estado: http://localhost:3000/estado

## Endpoint de comprobación

La ruta `/estado` devuelve una respuesta JSON similar a esta:

```json
{
  "estado": "activo",
  "entorno": "local-compose",
  "runtime": "Node.js en Docker",
  "timestamp": "2026-10-01T12:00:00.000Z"
}
```

## Archivos principales

- `Dockerfile`: define la imagen base y el comando de arranque del contenedor
- `docker-compose.yml`: define y orquesta los servicios `web` y `proxy`
- `server.js`: servidor HTTP de la aplicación
- `nginx.conf`: configuración del proxy inverso
- `index.html`: interfaz visual de la práctica