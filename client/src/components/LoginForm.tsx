import React, { Component } from "react";
import { EventEmitter } from "events";

interface LoginFormState {
    username: string;
}

interface LoginFormProps {
    formToggleHandler: () => void;
}

export default class LoginForm extends Component<LoginFormProps, LoginFormState> {
    constructor(props: LoginFormProps) {
        super(props);

        this.state = {
            username: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormToggle = this.handleFormToggle.bind(this);
    }

    handleChange(event: React.FormEvent) {
        this.setState({ username: (event.target as HTMLInputElement).value });
    }

    handleFormToggle(event: React.MouseEvent) {
        event.preventDefault();
        this.props.formToggleHandler();
    }

    handleSubmit(event: React.FormEvent) {
        //nothing for now, eventually call api, find user, redirect to user page
        event.preventDefault();
        alert(this.state.username);
    }

    render() {
        return (
            <div className="login-container">
                <h3>Login to GZCLP Tracker</h3>
                <form onSubmit={this.handleSubmit} className="pure-form">
                    <fieldset>
                        <input type="text" placeholder="username" onChange={this.handleChange} value={this.state.username} className="pure-input-1" />
                        <input type="submit" value="Submit" className="pure-button pure-button-primary pure-input-1" />
                    </fieldset>
                </form>
                <a onClick={this.handleFormToggle} className="pure-button">
                    Signup
                </a>
            </div>
        );
    }
}
