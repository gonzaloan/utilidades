# Utilidades

Generado con [Angular CLI](https://github.com/angular/angular-cli) version 1.7.2.

## Servidor de desarrollo   

Corre `ng serve` para un servidor dev. Navegar a `http://localhost:4200/`. 

## Build

Correr `ng build` para construir el proyecto. Los artefactos serán guardados en  `dist/`. Agregar `-prod` al comando build para producción.

## Objetivo Utilidades

El objetivo de esta aplicación es proporcionar un repositorio de utilidades para el día a día.
-   **Validación de dígito verificador de RUT:** Sólo se debe escribir el rut, y a medida de que sea válido, aparecerá su digito verificador.
-   **Búsqueda de RUN:** Se conecta a la API de datos de personas. Aquí se muestran 1000 datos (que se actualizan o son distintos si se refresca la página). Se puede filtrar por nacionalidad Chilena/Extranjera, y si son Casado/Soltero.
-   **Generador de tags:** Cuando se realiza un requerimiento, se debe marcar el código con el número de requerimiento y datos sobre lo que se está haciendo. Este generador toma esos datos y los muestra en forma de TAGS, que luego pueden copiarse al código fuente. 
