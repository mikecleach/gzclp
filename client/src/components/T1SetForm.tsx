import React, { Component } from "react";
import axios from "axios";
import "../styles/workoutform.css";

interface T1SetFormState {
    order: number;
    weight: number;
    reps: number;
    completed: boolean;
    submitted: boolean;
}

interface T1SetFormProps {
    order: number;
    weight: number;
    reps: number;
    completed: boolean;
    workoutId: number;
}

class T1SetForm extends Component<T1SetFormProps, T1SetFormState> {
    constructor(props: T1SetFormProps) {
        super(props);

        this.state = Object.assign({}, props, { submitted: false });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.FormEvent) {
        if ((event.target as HTMLInputElement).name === "weight") {
            const weight = isNaN(parseInt((event.target as HTMLInputElement).value)) ? 0 : parseInt((event.target as HTMLInputElement).value);
            this.setState({ weight });
        } else {
            const reps = isNaN(parseInt((event.target as HTMLInputElement).value)) ? 0 : parseInt((event.target as HTMLInputElement).value);
            this.setState({ reps });
        }
    }

    async handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        try {
            let result = await axios.post("/t1set/", { ...this.state });
            this.setState({ submitted: true });
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="t1set-form-container">
                <form onSubmit={this.handleSubmit} className="pure-form pure-g">
                    <fieldset>
                        <div className="pure-u-1-4 vert-align vertical-align">
                            <label htmlFor="weight">
                                Weight
                                <input
                                    type="text"
                                    pattern="[0-9]*"
                                    name="weight"
                                    onChange={this.handleChange}
                                    value={this.state.weight}
                                    className="pure-input-1"
                                />
                            </label>
                        </div>
                        <div className="pure-u-1-4 vert-align vertical-align">
                            <label htmlFor="reps">
                                Reps
                                <input type="text" pattern="[0-9]*" name="reps" onChange={this.handleChange} value={this.state.reps} className="pure-input-1" />
                            </label>
                        </div>
                        <div className="pure-u-1-3 vert-align vertical-align">
                            <input type="submit" value="Complete" disabled={this.state.submitted} className="pure-button pure-button-primary pure-input-1" />
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default T1SetForm;
