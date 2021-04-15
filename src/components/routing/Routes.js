import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

//components
import Landing from "../Landing/Landing";
import Navbar from "../Navbar";
const Routes = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Landing} />
                </Switch>
            </Router>
        </>
    );
};

export default Routes;
