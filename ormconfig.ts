export { getOrmConfig };

import { ConnectionOptions } from "typeorm";
import * as PostgresConnectionStringParser from "pg-connection-string";

function getOrmConfig(): ConnectionOptions {
    const nodeEnv = process.env.NODE_ENV || "dev";

    let connectionOptions: ConnectionOptions;

    if (nodeEnv === "dev") {
        connectionOptions = {
            type: "postgres",
            host: "localhost",
            username: "jeanetteklimczak",
            password: "",
            port: 5432,
            database: "gzclp",
            synchronize: true,
            logging: false,
            entities: ["dist/src/entity/**/*.js"],
            migrations: ["src/migration/**/*.ts"],
            subscribers: ["src/subscriber/**/*.ts"]
        };
    } else {
        const parsedPgOptions = PostgresConnectionStringParser.parse(process.env.DATABASE_URL);

        connectionOptions = {
            type: "postgres",
            host: parsedPgOptions.host,
            port: parseInt(parsedPgOptions.port),
            username: parsedPgOptions.user,
            password: parsedPgOptions.password,
            database: parsedPgOptions.database,
            synchronize: true,
            logging: false,
            entities: ["dist/src/entity/**/*.ts"],
            migrations: ["dist/src/migration/**/*.ts"],
            subscribers: ["dist/src/subscriber/**/*.ts"]
        };
    }

    return connectionOptions;
}
