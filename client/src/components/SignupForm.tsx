import React, { Component } from "react";
import { EventEmitter } from "events";
import axios from "axios";

interface SignupFormState {
    username: string;
    email: string;
    errorMessage: string | undefined;
}

interface SignupFormProps {
    formToggleHandler: () => void;
}

export default class Signup extends Component<SignupFormProps, SignupFormState> {
    constructor(props: SignupFormProps) {
        super(props);

        this.state = {
            username: "",
            email: "",
            errorMessage: undefined
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormToggle = this.handleFormToggle.bind(this);
    }

    handleChange(event: React.FormEvent) {
        if ((event.target as HTMLInputElement).name === "username") {
            this.setState({ username: (event.target as HTMLInputElement).value });
        } else {
            this.setState({ email: (event.target as HTMLInputElement).value });
        }
    }

    handleFormToggle(event: React.MouseEvent) {
        event.preventDefault();
        this.props.formToggleHandler();
    }

    async handleSubmit(event: React.FormEvent) {
        this.setState({ errorMessage: undefined });
        event.preventDefault();
        try {
            let result = await axios.post("/user/", { username: this.state.username, email: this.state.email });
            console.log(result.data);
        } catch (error) {
            this.setState({ errorMessage: error.response.data.reason });
        }
    }

    render() {
        return (
            <div className="login-container">
                <h3>Signup to GZCLP Tracker</h3>
                <form onSubmit={this.handleSubmit} className="pure-form">
                    <fieldset>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            onChange={this.handleChange}
                            value={this.state.username}
                            className="pure-input-1"
                        />
                        <input type="text" name="email" placeholder="email" onChange={this.handleChange} value={this.state.email} className="pure-input-1" />
                        <input type="submit" value="Submit" className="pure-button pure-button-primary pure-input-1" />
                    </fieldset>
                </form>
                <a onClick={this.handleFormToggle} className="pure-button">
                    Login
                </a>
                {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}
            </div>
        );
    }
}
