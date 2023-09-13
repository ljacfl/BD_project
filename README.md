# BD_project
Parcial_1
Documentación del Proyecto: Rick and Morty API Service
Descripción

Este proyecto se centra en el desarrollo de un servicio REST que consume la API de Rick and Morty, procesa los datos relevantes y los almacena en una base de datos MongoDB. Además, se implementa un sistema de caché utilizando Redis para optimizar las respuestas del servicio, mejorando así los tiempos de respuesta para consultas posteriores.
Configuración del Entorno
Requisitos Previos

    Node.js
    MongoDB
    Redis
    Librerías como Axios, Mongoose (para Node.js)

Configuración del Entorno de Desarrollo

    Instalar las dependencias del proyecto: Ejecute npm install en la carpeta raíz del proyecto para instalar todas las dependencias necesarias.

Estructura del Proyecto

El proyecto consta de las siguientes carpetas y archivos:
Backend (Nest.js)

    src/backend/: Contiene el código fuente del backend.
    src/backend/controllers/: Contiene los controladores de Nest.js que manejan las solicitudes HTTP.
    src/backend/models/: Define los modelos de datos de MongoDB para el backend.
    src/backend/cache/: Contiene la configuración y funciones relacionadas con Redis.
    src/backend/services/: Contiene lógica de negocio y servicios relacionados.

Frontend (React)

    src/frontend/: Contiene el código fuente del frontend React.
    src/frontend/components/: Contiene los componentes React utilizados en la interfaz de usuario.
    src/frontend/AppRoutes.js: Define las rutas y los componentes asociados para el frontend.
    src/frontend/App.js: Componente principal de React para el frontend.

Configuración Común

    config/: Almacena la configuración del proyecto, como las URL de la API de Rick and Morty, la cadena de conexión de MongoDB y la configuración de Redis.
    tests/: Contiene pruebas unitarias tanto para el frontend como para el backend del servicio.

Uso
Ejecución del Proyecto

    Clonar el repositorio desde Git.
    Instalar las dependencias con npm install.
    Iniciar el servicio con npm start.

Interacción con la Aplicación

    Acceda a través de un navegador web o utilice herramientas como Postman para realizar solicitudes HTTP a los endpoints REST del backend.
    Interactúe con la interfaz de usuario React en el frontend para consultar y visualizar los datos.

Tecnologías Utilizadas

    Backend (Nest.js)
        Node.js
        Nest.js
        MongoDB
        Redis
        Axios
        Mongoose

    Frontend (React)
        React.js
        CSS (o librerías como Bootstrap)

Backend (Nest.js)

    Enrutamiento: Se definen rutas y endpoints REST para consultar personajes y detalles de personajes.
    Obtención de Datos desde el Backend: Se utilizan solicitudes HTTP utilizando Axios para consumir la API de Rick and Morty y obtener datos relevantes.
    Mostrar Datos en Componentes: Los datos obtenidos se procesan en controladores de Nest.js y se envían como respuesta.
    Actualizar Datos: Se implementa una acción para actualizar los datos desde la API de Rick and Morty mediante una solicitud POST al endpoint /rick-and-morty/update-data.
    Caché: Los datos consultados se almacenan en caché utilizando Redis para mejorar la eficiencia del servicio.

Frontend (React)

    Enrutamiento: Se utilizan rutas definidas en React Router DOM para navegar entre la lista de personajes y los detalles de un personaje.
    Obtención de Datos desde el Backend: Los componentes React realizan solicitudes al backend de Nest.js para obtener datos de la API de Rick and Morty.
    Mostrar Datos en Componentes: Los datos obtenidos se procesan y muestran en los componentes React de la interfaz de usuario.
    Actualizar Datos: Se implementa un botón o acción en la interfaz de usuario para actualizar los datos desde la API de Rick and Morty.
    Estilo y Diseño: Se utiliza CSS para dar estilo a la interfaz de usuario y hacerla atractiva.
    Pruebas: Se incluyen pruebas unitarias para verificar el funcionamiento del frontend utilizando Jest y React Testing Library.

Problemas Conocidos

    Dependencias y actualizaciones en librerias y compatiblidad entre todas.
