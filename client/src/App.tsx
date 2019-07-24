import React from "react";
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import WorkoutFormPage from "./pages/WorkoutFormPage";
import logo from "./logo.svg";
import "./App.css";
import "./styles/pure.css";

const App: React.FC = () => {
    return (
        <Router>
            <div className="pure-g">
                <Route exact path="/" component={HomePage} />
                <Route path="/user/:id" component={UserPage} />
                <Route path="/new-workout/:id" component={WorkoutFormPage} />
            </div>
        </Router>
    );
};

export default App;
