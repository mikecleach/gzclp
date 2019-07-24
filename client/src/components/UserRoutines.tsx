import React, { Component } from "react";

import { UserInterface } from "../interfaces/User";
import { withRouter, RouteComponentProps } from "react-router";

interface UserRoutinesProps extends RouteComponentProps {
    user: UserInterface;
    userid: string;
}

class UserRoutines extends Component<UserRoutinesProps, {}> {
    constructor(props: UserRoutinesProps) {
        super(props);

        this.state = {};

        this.handleCreateWorkout = this.handleCreateWorkout.bind(this);
    }

    handleCreateWorkout(event: React.FormEvent) {
        const routineId = (event.target as HTMLInputElement).name;
        this.props.history.push(`/new-workout/${routineId}/${this.props.userid}`);
    }

    render() {
        const routines = this.props.user.routines.map(routine => (
            <div className="user-routine-container">
                <h4>{routine.name}</h4>
                <p>{routine.description}</p>
                <ul>
                    <li>T1:{routine.T1.name}</li>
                    <li>T2:{routine.T2.name}</li>
                    <li>T3:{routine.T3.name}</li>
                </ul>
                <button name={routine.id.toString()} onClick={this.handleCreateWorkout} className="pure-button pure-button-primary">
                    Start Workout
                </button>
            </div>
        ));

        return <div className="user-routines-container pure-u-1">{routines}</div>;
    }
}

export default withRouter(UserRoutines);
