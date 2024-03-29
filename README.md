# Marketplace

## Description

Internal skillUp project. The main purpose is assimilation of Nest.js/TypeOrm/Docker/PostgreSQL.


## Installation

```bash
$ npm install
```

Create and feel `.env` file according to docker-compose.yml file
```bash
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
JWT_ACCESS_KEY=
JWT_REFRESH_KEY=
REDIS_HOST=
REDIS_PORT=
```

## Running the app
#### Run the Docker

```bash
$ docker-compose up -d mydb redis
```
Additionaly you might run redis gui
```bash
$ docker-compose up -d redis-commander
```

#### Run localy
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### Run migration
```bash
# run migration
$ npm run typeorm:run-migration

#create migration
$ npm run typeorm:create-migration + NAME_OF_MIGRATION

#revert migration
$ npm run typeorm:revert-migration
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
After this, the server should be available at http://localhost:3000 from the host 

## License

Nest is [MIT licensed](LICENSE).
