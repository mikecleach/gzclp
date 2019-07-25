import React, { Component } from "react";
import axios from "axios";

import { UserInterface } from "../interfaces/User";
import { withRouter, RouteComponentProps } from "react-router";

interface UserRoutinesProps extends RouteComponentProps {
    user: UserInterface;
    userid: string;
}

interface T1Set {
    order: number;
    weight: number;
    reps: number;
    completed: boolean;
}

interface Workout {
    id: number;
    T1set: T1Set[];
}

interface UserRoutinesState {
    lastWorkouts: Workout[];
}

class UserRoutines extends Component<UserRoutinesProps, UserRoutinesState> {
    constructor(props: UserRoutinesProps) {
        super(props);

        this.state = {
            lastWorkouts: []
        };

        this.handleCreateWorkout = this.handleCreateWorkout.bind(this);
    }

    handleCreateWorkout(event: React.FormEvent) {
        const routineId = (event.target as HTMLInputElement).name;
        this.props.history.push(`/new-workout/${routineId}/${this.props.userid}`);
    }

    async componentDidMount() {
        let lastWorkouts;

        let data = await Promise.all(
            this.props.user.routines.map(async routine => {
                try {
                    let previousWorkout = await axios.get(`/lastWorkout/${routine.id}`);

                    return previousWorkout;
                } catch (err) {
                    throw err;
                }
            })
        );

        console.log(data[0]);
        console.log(data[1]);

        let lastWorkoutsArray = data.map(data => data.data[0]);

        this.setState({ lastWorkouts: lastWorkoutsArray });
    }

    render() {
        const getShortWorkoutResult = (idx: number): JSX.Element => {
            const shortWorkout = this.state.lastWorkouts[idx].T1set.map(set => `${set.reps}@${set.weight}`).join(", ");
            return <p>Last Workout: {shortWorkout}</p>;
        };

        const routines = this.props.user.routines.map((routine, idx) => (
            <div className="user-routine-container">
                <h4>Routine: {routine.name}</h4>
                <p>{routine.description}</p>
                <ul>
                    <li>T1:{routine.T1.name}</li>
                    <li>T2:{routine.T2.name}</li>
                    <li>T3:{routine.T3.name}</li>
                </ul>
                <button name={routine.id.toString()} onClick={this.handleCreateWorkout} className="pure-button pure-button-primary">
                    Start Workout
                </button>
                {this.state.lastWorkouts.length && getShortWorkoutResult(idx)}
            </div>
        ));

        return <div className="user-routines-container pure-u-1">{routines}</div>;
    }
}

export default withRouter(UserRoutines);
