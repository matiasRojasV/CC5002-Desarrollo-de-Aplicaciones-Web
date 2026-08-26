# Estructura del Proyecto

El proyecto sigue una arquitectura estática modular, separando responsabilidades entre HTML, CSS y JavaScript:

* **`index.html`**: Página principal con el feed de avistamientos.
  * Lógica: `indexFilter.js` (Permite filtrar por tipo de ave y ordenar por fecha/lugar dinámicamente manipulando el DOM).
* **`login.html`**: Formulario de registro de voluntarios.
  * Lógica: `singUpVal.js` (Validación de campos, expresiones regulares para celular y carga dinámica de regiones/comunas usando `regiones.json`).
* **`avistamiento.html`**: Formulario para registrar un ave.
  * Lógica: `avistamientoVal.js` (Validación de fechas en formato ISO, restricciones de antigüedad máxima de 1 año y verificación de archivos adjuntos).
* **`dashboard.html`**: Panel de métricas.
  * Lógica: `dashboard.js` (Implementación de gráficos interactivos usando la librería `Chart.js`).
* **Archivos Globales**:
  * `authHeader.js`: Script global que verifica la sesión y actualiza la cabecera en todas las páginas.
  * `regiones.json`: Base de datos local con la división territorial de Chile.
  * `styles.css`: Hoja de estilos única con variables CSS y diseño responsivo.  



# Decisiones Técnicas y de Diseño

Para garantizar un código limpio, semántico y eficiente, se tomaron las siguientes decisiones de diseño e implementación:

## 1. HTML5 Semántico y Validación W3C
Se aplicó un uso riguroso de etiquetas semánticas (`<header>`, `<main>`, `<nav>`, `<article>`, `<fieldset>`). 
* **Detalle de corrección:** En `index.html`, los contenedores de la barra de filtros y del *scroll* de avistamientos utilizan la etiqueta `<div>` en lugar de `<section>`. Esto se debe a que, según la especificación W3C, un `<section>` requiere un encabezado (`<h2>`-`<h6>`). Al ser componentes puramente estructurales/visuales, el uso de `<div>` evita *warnings* en el validador oficial, logrando un código 100% válido.

## 2. Flujo del Documento en CSS (Posicionamiento Absoluto)
El control de sesión (botón "Registro / Login" o "Hola, [Nombre]") se visualiza en la esquina superior derecha del encabezado, separado del menú de navegación.
* **Detalle de corrección:** En lugar de ensuciar la etiqueta `<nav>`, se extrajo el `#auth-container` y se posicionó mediante `position: absolute;` (referenciado al `<header>` con `position: relative;`). Esto permite que el título de la página y los enlaces principales mantengan una simetría y centrado matemáticamente perfecto sin verse empujados por el bloque de inicio de sesión.

## 3. Persistencia de Sesión sin Backend (Web Storage API)
Dado que el prototipo no cuenta con base de datos, se simuló el flujo completo de autenticación.
* **Detalle de corrección:** Al registrarse un voluntario (`singUpVal.js`), se guarda una bandera y el nombre en `localStorage`. El script global `authHeader.js` lee estos datos y re-renderiza dinámicamente la esquina superior derecha en todas las páginas. Adicionalmente, `avistamientoVal.js` protege la ruta de avistamientos: si un usuario no registrado intenta acceder a la URL, es interceptado y redirigido al `login.html`.

## 4. Carga Asíncrona de Datos (Fetch API & JSON)
El selector de regiones y comunas en `login.html` no está escrito en duro en el HTML.
* **Detalle de corrección:** Se utilizó `fetch('../js/regiones.json')` junto con `async/await` para leer el archivo JSON local. Al seleccionar una región, un evento dinámico busca las comunas correspondientes en la estructura de datos y repuebla el `<select>` secundario, demostrando manejo avanzado de asincronía y manipulación del DOM.

## 5. Manipulación Avanzada del DOM (Filtros y Ordenamiento)
En la página principal, los filtros no ocultan los elementos con CSS, sino que reordenan la estructura real.
* **Detalle de corrección:** En `indexFilter.js`, el script extrae la información contenida en las tarjetas (`<article>`), formatea las fechas a objetos `Date` y utiliza `Array.prototype.filter()` y `.sort()`. Finalmente, utiliza `appendChild()` para reinyectar los nodos en el DOM en el orden correcto de forma instantánea.