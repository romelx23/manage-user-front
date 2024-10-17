# Frontend Application Documentation - React & TypeScript

Este proyecto es una aplicación frontend desarrollada en **React** con **TypeScript**, que incluye autenticación de usuarios y módulos para gestionar productos del catálogo y el ambiente (agregar, eliminar y actualizar).

## Contenido

1. [Instalación](#instalación)
2. [Scripts disponibles](#scripts-disponibles)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Autenticación](#autenticación)
5. [Gestión de productos](#gestión-de-productos)
   - [Catálogo](#catálogo)
   - [Ambiente](#ambiente)
6. [Uso de API](#uso-de-api)
7. [Dependencias principales](#dependencias-principales)
8. [Licencia](#licencia)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-repositorio/frontend-app.git
   ```

2. Ve al directorio del proyecto:

   ```bash
   cd frontend-app
   ```

3. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

4. Crea un archivo `.env` en la raíz del proyecto y añade tus variables de entorno:

   ```
   REACT_APP_API_URL=https://api.tu-backend.com
   REACT_APP_AUTH_TOKEN=token_de_autenticacion
   ```

5. Inicia la aplicación en modo de desarrollo:

   ```bash
   npm run start
   ```

6. Accede a la aplicación en tu navegador en `http://localhost:5173`.

## Scripts disponibles

- **`npm run start`**: Inicia la aplicación en modo de desarrollo.
- **`npm run build`**: Crea una versión optimizada de la aplicación para producción.
- **`npm run lint`**: Linter para revisar el código en busca de errores y advertencias.

## Estructura del proyecto

El proyecto tiene la siguiente estructura de carpetas:
