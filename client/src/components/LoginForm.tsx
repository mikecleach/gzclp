import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";

interface LoginFormState {
    username: string;
    errorMessage: string | undefined;
    userId: string | undefined;
}

interface LoginFormProps extends RouteComponentProps {
    formToggleHandler: () => void;
}

class LoginForm extends Component<LoginFormProps, LoginFormState> {
    constructor(props: LoginFormProps) {
        super(props);

        this.state = {
            username: "",
            errorMessage: undefined,
            userId: undefined
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

    async handleSubmit(event: React.FormEvent) {
        //nothing for now, eventually call api, find user, redirect to user page
        this.setState({ errorMessage: undefined });
        event.preventDefault();
        try {
            let result = await axios.get(`/user/${this.state.username}`);
            console.log(result.data);
            this.setState({ userId: result.data.id });
            this.props.history.push(`/user/${result.data.id}`);
        } catch (error) {
            this.setState({ errorMessage: error.response.data.reason });
        }
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
                {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}
            </div>
        );
    }
}

export default withRouter(LoginForm);
