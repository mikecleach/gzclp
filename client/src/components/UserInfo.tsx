import React, { Component } from "react";
import { render } from "react-dom";

interface UserInfoProps {
    id: string;
}

export default class UserInfo extends Component<UserInfoProps, {}> {
    constructor(props: UserInfoProps) {
        super(props);

        this.state = {};
    }

    render() {
        return <div>{this.props.id}</div>;
    }
}
