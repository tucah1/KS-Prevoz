import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

//components
import Landing from "../Landing/Landing";
import Navbar from "../Layout/Navbar";
import Favorites from "../Favorites";
import Alert from "../Layout/Alert";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ScheduleList from "../ScheduleAdmin/ScheduleList";
import Notifications from "../Notifications/Notifications";
import About from "../About";
import FindRoutes from "../FindRoutes/FindRoutes";
import Footer from "../Layout/Footer";
import ScrollToTop from "../Layout/ScrollToTop";

const Routes = () => {
    return (
        <>
            <Router>
                <Alert />
                <Navbar scrollActive={true} />
                <ScrollToTop>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/about" component={About} />
                        <Route
                            exact
                            path="/find-routes"
                            component={FindRoutes}
                        />
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
                </ScrollToTop>
                <Footer />
            </Router>
        </>
    );
};

export default Routes;
