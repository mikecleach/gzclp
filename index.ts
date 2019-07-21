import express from "express";
import path from "path";

import { createConnection, getRepository } from "typeorm";
import { getOrmConfig } from "./ormconfig";

import { User } from "./src/entity/User";

//TODO: move express start into connection's .then
const ormConfig = getOrmConfig();
const dbConn = createConnection(ormConfig).catch(err => console.log("typeorm connection error:" + err));

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
app.post("/user", (req, res) => {
    let newUser = new User();
    newUser.login = req.body.login;
    newUser.email = req.body.email;

    getRepository(User).save(newUser);

    res.send("saved user? " + newUser);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port);

console.log(`listening on port ${port}`);
console.log(ormConfig);
