import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import "./App.css";
import Footer from "./Components/Footer";
import Home from "./containers/Home";
import SymptomJournal from "./containers/SymptomJournal";
import DoctorList from "./containers/DoctorsList";
import Appointments from "./containers/Appointments";
import MedLog from "./containers/MedLog";
import Prescriptions from "./containers/Prescriptions";
import Charts from "./containers/Charts";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NoMatch from "./containers/NoMatch";

const theme = createMuiTheme({
    palette: {
        type: "light"
    },
    typography: {
        fontSize: 18
    }
});

class App extends Component {
    state = {
        currentlyLoggedInUser: null
    };
    setUser = userId => {
        this.setState({ currentlyLoggedInUser: userId });
    };

    render() {
        return [
            <MuiThemeProvider theme={theme}>
                <Router>
                    <div>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={props => (
                                    <Login
                                        {...props}
                                        setUser={this.setUser}
                                    ></Login>
                                )}
                            />
                            <Route
                                exact
                                path="/signup"
                                component={Signup}
                                loggedInUser={this.state.currentlyLoggedInUser}
                            />
                            <Route exact path="/home" component={Home} />
                            <Route
                                exact
                                path="/symptoms"
                                render={props => (
                                    <SymptomJournal {...props}></SymptomJournal>
                                )}
                                loggedInUser={this.state.currentlyLoggedInUser}
                            />
                            <Route
                                exact
                                path="/doctors"
                                component={DoctorList}
                            />
                            <Route
                                exact
                                path="/appointments"
                                component={Appointments}
                            />
                            <Route exact path="/log" component={MedLog} />
                            <Route
                                exact
                                path="/prescriptions"
                                component={Prescriptions}
                            />
                            <Route exact path="/charts" component={Charts} />
                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                </Router>
                <Footer />
            </MuiThemeProvider>
        ];
    }
}

export default App;
