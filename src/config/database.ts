import { typedEnv } from "src/utils/type-env";
import * as path from 'path'

export default {   
    type: "postgres",
    host: typedEnv.DB_HOST,
    port: typedEnv.DB_PORT,
    username: typedEnv.DB_USERNAME,
    password: typedEnv.DB_PASSWORD,
    database: typedEnv.DB_NAME,
    entities: [path.join('dist', '**', '*.entity.{ts,js}')],
    synchronize: false,
    migrations: ['dist/migrations/**/*.js'],
    cli: { migrationsDir: "src/migrations" }
}

