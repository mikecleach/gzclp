import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import UserInfo from "../components/UserInfo";
import UserRoutines from "../components/UserRoutines";
import { UserInterface } from "../interfaces/User";
import "../styles/userpage.css";

type TParams = { id: string };

interface UserPageProps {
    match: RouteComponentProps<TParams>;
}

interface UserPageState {
    isLoading: boolean;
    user: UserInterface;
}

export default class UserPage extends Component<RouteComponentProps<TParams>, UserPageState> {
    constructor(props: RouteComponentProps<TParams>) {
        super(props);

        this.state = {
            isLoading: true,
            user: {
                id: 0,
                login: "",
                email: "",
                routines: []
            }
        };
    }
    componentDidMount() {
        axios.get(`/user/${this.props.match.params.id}`).then(result => {
            this.setState({ user: result.data, isLoading: false });
        });
    }

    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        } else {
            return (
                <div className="user-page-container pure-u-22-24">
                    <UserInfo user={this.state.user} />
                    <UserRoutines user={this.state.user} userid={this.props.match.params.id} />
                </div>
            );
        }
    }
}
