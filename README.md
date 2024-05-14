# ATOM FE CHALLENGE TEMPLATE - ANGULAR

Este proyecto es una plantilla con lo necesario para comenzar a desarrollar el front-end de la aplicación de la prueba técnica de Atom. Se base en Angular con la versión 15.2.1.
Se ha realizado la instalación y configuración de varias dependencias necesarias para el desarrollo de la aplicación, como por ejemplo: Angular Material.

## Instrucciones
Siéntete libre de clonar este repositorio y utilizarlo como base para el desarrollo de la aplicación. Sigue las indicates de la prueba técnica para completar la aplicación y desarrolla como más te sientas cómodo.

De igual manera puedes documentar dentro de este archivo todo lo que deseas contar sobre tu desarrollo, como por ejemplo, decisiones de diseño, problemas encontrados, etc.

## Comentarios sobre el desarrollo
Para el desarrollo de la aplicación se ha utilizado Angular con Angular Material.
Este consta de dos pantallas, una de login y otra de visualización de datos.
Se ha creado un servicio para la gestión de los datos de la aplicación, autenticación de usuarios y se ha creado un componente para la visualización de los datos asi como un formulario para agregar/editar tareas.

## Descripcion
El proyecto es un administrador de tareas, donde el usuario puede agregar, editar y eliminar tareas. Ademas de poder marcar las tareas como completadas.

## Decisiones de diseño

Se ha utilizado Angular Material y un poco de SCSS para el diseño de la aplicación, se ha utilizado un diseño sencillo y minimalista para la aplicación para que sea visualmente atractiva y simple de usar.

La aplicacion se encuentra desplegada en Firebase Hosting, se ha utilizado Github Actions para la integración continua del proyecto.

## Live Demo
Puedes ver el demo de la aplicación en el siguiente enlace:
* [Angular ](https://atom-challenge-dalfonzo.web.app/)

## Backend
Para el desarrollo de la aplicación se ha utilizado un backend en Node.js con Express y MongoDB. Puedes encontrar el repositorio del backend en el siguiente enlace:
* [Backend](https://github.com/29dalfonzo/atom-challenge-back)

## Primeros Pasos

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Prerequisitos

* Node.js
* npm


clona el repositorio
```bash
git clone https://github.com/29dalfonzo/atom-fe-challenge-template-ng-15.git
```

### Dependencias

* Angular CLI

### Installing

* Descarga o clona este repositorio.
```
cd atom-fe-challenge-template-ng-15
npm install
```

### Executing program

* Ejecuta el servidor de desarrollo con el siguiente comando:
```
ng serve
```

## Development server

Ejecuta `ng serve` para un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se volverá a cargar automáticamente si cambias algn archivo de origen.

## Build

Ejecuta `ng build` para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`. Usa la bandera `--prod` para una construcción de producción.

## Firebase Hosting

Se ha utilizado Firebase Hosting para el despliegue de la aplicación, puedes encontrar más información sobre como configurar Firebase Hosting en el siguiente enlace:
* [Firebase Hosting](https://firebase.google.com/docs/hosting)

## Github actions

Se ha utilizado Github actions para la integración continua del proyecto, puedes encontrar más información sobre como configurar Github actions en el siguiente enlace:
* [Github Actions](https://docs.github.com/en/actions)

## Code scaffolding

Ejecuta `ng generate component component-name` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.


## Authors

Daniel Alfonzo 
[29dalfonzo](https://29dalfonzo.netlify.app/)

## Version History

* 0.1
    * Initial Release
