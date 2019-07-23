import React, { Component } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "../styles/homepage.css";

interface LoginSignupState {
    showLogin: boolean;
}

export default class LoginSignup extends Component<{}, LoginSignupState> {
    constructor(props: LoginSignupState) {
        super(props);

        this.state = {
            showLogin: true
        };

        this.toggleForms = this.toggleForms.bind(this);
    }

    toggleForms(): void {
        this.setState({ showLogin: !this.state.showLogin });
    }

    render() {
        return (
            <div className="login-signup-container pure-u-22-24">
                {this.state.showLogin ? <LoginForm formToggleHandler={this.toggleForms} /> : <SignupForm formToggleHandler={this.toggleForms} />}
            </div>
        );
    }
}
