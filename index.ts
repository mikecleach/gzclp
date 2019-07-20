import express from "express";

import { createConnection } from "typeorm";
import { getOrmConfig } from "./ormconfig";

//TODO: move express start into connection's .then
const ormConfig = getOrmConfig();
const dbConn = createConnection(ormConfig).catch(err => console.log("typeorm connection error:" + err));

const app = express();
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("The sedulous hyena ate the antelope!");
});
app.listen(port);

console.log(`listening on port ${port}`);
console.log(ormConfig);
