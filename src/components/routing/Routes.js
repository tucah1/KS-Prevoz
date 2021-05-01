import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

//components
import Landing from "../Landing/Landing";
import Navbar from "../Navbar";
import Favorites from "../Favorites";
import Alert from "../Alert";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ScheduleList from "../ScheduleAdmin/ScheduleList";
import Notifications from "../Notifications/Notifications";
import About from "../About";

const Routes = () => {
    return (
        <>
            <Router>
                <Alert />
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/about" component={About} />
                    <PrivateRoute
                        exact
                        path="/favorites"
                        component={Favorites}
                    />
                    <AdminRoute
                        exact
                        path="/schedule-list"
                        component={ScheduleList}
                    />
                    <AdminRoute
                        exact
                        path="/notifications"
                        component={Notifications}
                    />
                </Switch>
            </Router>
        </>
    );
};

export default Routes;
