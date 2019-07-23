import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from "react-router-dom";
import UserInfo from "../components/UserInfo";

type TParams = { id: string };

interface UserPageProps {
    match: RouteComponentProps<TParams>;
}

export default class UserPage extends Component<RouteComponentProps<TParams>, {}> {
    constructor(props: RouteComponentProps<TParams>) {
        super(props);
    }

    render() {
        return (
            <div className="userpage-container pure-u-22-24">
                <UserInfo id={this.props.match.params.id} />
            </div>
        );
    }
}
