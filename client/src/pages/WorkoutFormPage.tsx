import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from "react-router-dom";
import axios from "axios";
// import UserInfo from "../components/UserInfo";
// import UserRoutines from "../components/UserRoutines";
import T1SetForm from "../components/T1SetForm";
import { UserInterface } from "../interfaces/User";

type TParams = { id: string };

interface WorkoutFormProps {
    match: RouteComponentProps<TParams>;
}

interface WorkoutFormState {
    isLoading: boolean;
    T1Template: {
        sets: number;
        reps: number;
    };
    weight: number;
}
interface T1set {
    id: number;
    order: number;
    weight: number;
    reps: number;
    completed: boolean;
}

interface Workout {
    id: number;
    T1set: T1set[];
}

export default class WorkoutFormPage extends Component<RouteComponentProps<TParams>, WorkoutFormState> {
    constructor(props: RouteComponentProps<TParams>) {
        super(props);

        this.state = {
            isLoading: true,
            T1Template: {
                sets: 5,
                reps: 3
            },
            weight: 0
        };
    }
    componentDidMount() {
        axios.get(`/lastWorkout/${this.props.match.params.id}`).then(result => {
            if (result.data.reason == "No previous workout found.") {
                const emptyWorkout = {
                    id: 0,
                    T1set: []
                };
                this.determineNewSetReps(emptyWorkout, true);
            } else {
                this.determineNewSetReps(result.data[0]);
            }
        });
    }

    determineNewSetReps(data: Workout, override = false) {
        if (override) {
            this.setState({
                T1Template: {
                    sets: 5,
                    reps: 3
                }
            });
        }

        const sets = data.T1set.length;
        if (sets === 5) {
            const completedAllSets = data.T1set.every(currSet => {
                return currSet.reps >= 3;
            });

            if (completedAllSets) {
                this.setState({
                    T1Template: {
                        sets: 5,
                        reps: 3
                    }
                });
            } else {
                this.setState({
                    T1Template: {
                        sets: 6,
                        reps: 2
                    }
                });
            }
        } else if (sets === 6) {
            const completedAllSets = data.T1set.every(currSet => {
                return currSet.reps >= 2;
            });

            if (completedAllSets) {
                this.setState({
                    T1Template: {
                        sets: 6,
                        reps: 2
                    }
                });
            } else {
                this.setState({
                    T1Template: {
                        sets: 10,
                        reps: 1
                    }
                });
            }
        } else if (sets === 5) {
            const completedAllSets = data.T1set.every(currSet => {
                return currSet.reps >= 3;
            });

            if (completedAllSets) {
                this.setState({
                    T1Template: {
                        sets: 5,
                        reps: 3
                    }
                });
            } else {
                this.setState({
                    T1Template: {
                        sets: 6,
                        reps: 2
                    }
                });
            }
        } else if (sets === 6) {
            const completedAllSets = data.T1set.every(currSet => {
                return currSet.reps >= 2;
            });

            if (completedAllSets) {
                this.setState({
                    T1Template: {
                        sets: 6,
                        reps: 2
                    }
                });
            } else {
                this.setState({
                    T1Template: {
                        sets: 10,
                        reps: 1
                    }
                });
            }
        } else if (sets === 10) {
            const completedAllSets = data.T1set.every(currSet => {
                return currSet.completed === true;
            });

            if (completedAllSets) {
                this.setState({
                    T1Template: {
                        sets: 10,
                        reps: 1
                    }
                });
            } else {
                this.setState({
                    T1Template: {
                        sets: 5,
                        reps: 3
                    }
                });
            }
        } else {
            this.setState({
                T1Template: {
                    sets: 5,
                    reps: 3
                }
            });
        }

        this.setState({
            isLoading: false,
            weight: data.T1set[0].weight
        });
    }

    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        } else {
            const setForms = [...Array(this.state.T1Template.sets)].map((e, i) => {
                return <T1SetForm order={i} weight={this.state.weight} reps={this.state.T1Template.reps} completed={false} />;
            });

            return <div className="workout-form-page-container pure-u-22-24">{setForms}</div>;
        }
    }
}
