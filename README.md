# Important commands GIT
## Configuración global de Git
git config --global user.name "Cristian Fraija"
git config --global user.email "cristian33x@gmail.com"

## Crear un nuevo repositorio
git clone https://gitlab.com/cristian33x/important-commands.git
cd important-commands
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master

## Push a una carpeta existente
cd existing_folder
git init
git remote add origin https://gitlab.com/cristian33x/important-commands.git
git add .
git commit -m "Initial commit"
git push -u origin master

## Push a un repositorio de Git existente
cd existing_repo
git remote rename origin old-origin
git remote add origin https://gitlab.com/cristian33x/important-commands.git
git push -u origin --all
git push -u origin --tags

--------------------


# Important commands Angular
## Create a new project
ng new nameProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
