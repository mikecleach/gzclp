import React, { Component } from "react";
import { UserInterface } from "../interfaces/User";

interface UserInfoProps {
    user: UserInterface;
}

export default class UserInfo extends Component<UserInfoProps, {}> {
    constructor(props: UserInfoProps) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="user-info-container pure-u-1">
                <h3>{this.props.user.login}'s Dashboard</h3>
                <p>Email: {this.props.user.email}</p>
            </div>
        );
    }
}
