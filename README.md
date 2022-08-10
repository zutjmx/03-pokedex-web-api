<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Aplicación en NestJs para la sección 3 del curso Nest: Desarrollo BackEnd escalable con Node.
[Repositorio GitHub](https://github.com/zutjmx/03-pokedex-web-api) 

## Installation
Se requiere previamente la instlación del CLI de NestJs [NestJs](https://docs.nestjs.com/first-steps)

```bash
$ npm i -g @nestjs/cli
```

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Ejecución del ambiente de MongoDB con Docker

```bash
$ docker-compose up -d
```

## Poblar base de datos con esta petición de tipo Get desde Postman

```bash
localhost:3000/api/v2/seed
```

## Stack usado
* MongoDB
* NestJs
