import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

//components
import Landing from "../Landing/Landing";
import Navbar from "../Navbar";
import Favorites from "../Favorites";
import Alert from "../Alert";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
    return (
        <>
            <Router>
                <Alert />
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <PrivateRoute
                        exact
                        path="/favorites"
                        component={Favorites}
                    />
                </Switch>
            </Router>
        </>
    );
};

export default Routes;
