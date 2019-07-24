import express from "express";
import path from "path";

import { createConnection, getRepository } from "typeorm";
import { getOrmConfig } from "./ormconfig";

import { User } from "./src/entity/User";
import { Routine } from "./src/entity/Routine";

import { Workout } from "./src/entity/Workout";
import { T1set } from "./src/entity/T1set";

//TODO: move express start into connection's .then
const ormConfig = getOrmConfig();
const dbConn = createConnection(ormConfig)
    // .then(async connection => {
    //     let workout = await connection.getRepository(Workout).findOne({ where: { id: 3 }, relations: ["T1set"] });

    //     let set = new T1set();
    //     set.order = 1;
    //     set.weight = 145;
    //     set.reps = 3;
    //     set.completed = true;

    //     await connection.getRepository(T1set).save(set);

    //     workout.T1set.push(set);

    //     await connection.getRepository(Workout).save(workout);

    //     let a = 1;
    // })
    .catch(err => console.log("typeorm connection error:" + err));

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "/../client/build")));

const port = process.env.PORT || 5000;
app.post("/user", (req, res) => {
    let newUser = new User();
    newUser.login = req.body.username;
    newUser.email = req.body.email;

    getRepository(User).save(newUser);

    res.send("saved user? " + newUser);
});

app.get("/user/:login", (req, res) => {
    let user;

    let login = req.params && req.params.login;
    if (login) {
        let whereObj;

        if (isNaN(parseInt(login))) {
            whereObj = { login };
        } else {
            whereObj = { id: login };
        }

        getRepository(User)
            .findOne({ where: whereObj, relations: ["routines", "routines.T1", "routines.T2", "routines.T3"] })
            .then(result => {
                if (typeof result === "undefined") {
                    res.status(404).json({ reason: "User was not found." });
                } else {
                    res.json(result);
                }
            })
            .catch(err => {
                res.status(404).json({ reason: "getting user failed", err: err });
            });
    } else {
        res.status(404).json({ reason: "no username was passed" });
    }
});

app.post("/workout/", (req, res) => {
    let user;

    let routine = req.body && req.body.routine;
    if (routine) {
        let newWorkout = new Workout();

        newWorkout.routine = routine;
        getRepository(Workout)
            .save(newWorkout)
            .then(newWorkout => {
                res.json({ workoutId: newWorkout.id });
            });
    } else {
        res.status(404).json({ reason: "no routine id was passed" });
    }
});

app.post("/t1set/", (req, res) => {
    let user;

    let set = req.body;
    if (set) {
        let t1Set = new T1set();

        t1Set.order = set.order;
        t1Set.weight = set.weight;
        t1Set.reps = set.reps;
        t1Set.completed = true;

        getRepository(Workout)
            .findOne({ id: set.workoutId })
            .then(result => {
                t1Set.workout = result;

                getRepository(T1set)
                    .save(t1Set)
                    .then(savedSet => {
                        res.json({ id: savedSet.id });
                    });
            });
    } else {
        res.status(404).json({ reason: "no set data was passed" });
    }
});

app.get("/lastWorkout/:routine", (req, res) => {
    let routineId = req.params && req.params.routine;
    getRepository(Workout)
        .find({
            where: {
                routine: routineId
            },
            relations: ["T1set"],
            order: {
                id: "DESC"
            },
            take: 1
        })
        .then(result => {
            if (typeof result === "undefined") {
                res.status(404).json({ reason: "No previous workout found." });
            } else {
                res.json(result);
            }
        })
        .catch(err => {
            res.status(404).json({ reason: "getting previous workout failed", err: err });
        });
});

app.get("/", (req, res) => {
    console.log("sending react index file");

    res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

app.listen(port);

console.log(`listening on port ${port}`);
console.log(ormConfig);
