import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import "./App.css";
import Footer from "./Components/Footer";
import Home from "./containers/Home";
import DoctorList from "./containers/DoctorsList";
import Appointments from "./containers/Appointments";
import MedLog from "./containers/MedLog";
import Prescriptions from "./containers/Prescriptions";
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

            </MuiThemeProvider>
        ];
    }
}

export default App;
