import React, { Component } from "react";
import NavBar from '../../Components/AppBar';
import LogForm from './LogForm';
import LogList from './LogList';
import MedLogAPI from '../../utils/MedLogAPI';
import DoctorsAPI from '../../utils/DoctorsAPI';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Sidebar from '../../Components/Sidebar';

const styles = theme => ({
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#86BBD8',
    padding: theme.spacing.unit * 3,
  },
});


class MedLog extends Component {
  state = {
    logDoctor: "",
    logDate: "",
    logVisitReason: "",
    logHeight: "",
    logWeight: "",
    logNotes: "",
    logs: [],
    doctors: [],
    logDoctorError: "",
    logDateError: "",
    logVisitReasonError: "",
    logHeightError: "",
    logWeightError: "",
    logNotesError: "",
    formSuccessMessage: "",
  };

  componentDidMount() {
    this.loadLogs();
    this.loadDoctors();
  }

  loadLogs = () => {
    MedLogAPI.getLogs()
      .then(res =>
        this.setState({ logs: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteLog = id => {
    MedLogAPI.deleteLog(id)
      .then(res => this.loadLogs())
      .catch(err => console.log(err));
  };

  loadDoctors = () => {
    DoctorsAPI.getDoctors()
      .then(res =>
        this.setState({ doctors: res.data })
      )
      .catch(err => console.log('getting doctors did not work: ', err));
  };

  handleLogDoctorChange = (event) => {
    this.setState({ 
      logDoctor: event.target.value,
      logDoctorError: "",
      formSuccessMessage: "",
    });
  }

  handleLogDateChange = (event) => {
    this.setState({ 
      logDate: event.target.value,
      logDateError: "",
      formSuccessMessage: "",
    });
  }

  handleLogVisitReasonChange = (event) => {
    this.setState({ 
      logVisitReason: event.target.value,
      logVisitReasonError: "",
      formSuccessMessage: "", 
    });
  }

  handleLogHeightChange = (event) => {
    this.setState({ 
      logHeight: event.target.value,
      logHeightError: "",
      formSuccessMessage: "", 
    });
  }

  handleLogWeightChange = (event) => {
    this.setState({ 
      logWeight: event.target.value,
      logWeightError: "",
      formSuccessMessage: "",
    });
  }

  handleLogNotesChange = (event) => {
    this.setState({ 
      logNotes: event.target.value,
      logNotesError: "",
      formSuccessMessage: "",
     });
  }

  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.logDoctor === "") {
      this.setState({
        logDoctorError: "Select a doctor from the drop-down list."
      })
    }

    if (this.state.logDate === "" || this.state.logDate === "mm/dd/yyy") {
      this.setState({
        logDateError: "Use the date picker to select the date of the doctor visit."
      })
    }

    if (this.state.logVisitReason === "") {
      this.setState({
        logVisitReasonError: "Specify the reason for visiting."
      })
    }

    if (this.state.logHeight === "") {
      this.setState({
        logHeightError: "Enter a value for height (in inches)."
      })
    }

    if (this.state.logWeight === "") {
      this.setState({
        logWeightError: "Enter a value for weight (in pounds)."
      })
    }

    if (this.state.logNotes === "") {
      this.setState({
        logNotesError: "Enter any additional notes to associate with this doctor visit. If you don't have any additional notes to record, type N/A."
      })
    }

    else {
      MedLogAPI.saveLog({
        date: this.state.logDate,
        doctor: this.state.logDoctor,
        visitPurpose: this.state.logVisitReason,
        heightIn: this.state.logHeight,
        weightLb: this.state.logWeight,
        notes: this.state.logNotes,
      })
        .then(res => this.loadLogs())
        .catch(err => console.log(err));

      this.setState({
          formSuccessMessage: `Doctor notes from ${this.state.logDate} added successfully!`,
      });

      document.getElementById('log-form').reset();
    }
  };

  render() {
    const { classes } = this.props;
    return [
      <NavBar />, 
      <div className={classes.appFrame}>
        <Sidebar />
          <main className={classes.content}>
            <div style={{ padding: 70 }}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography variant="display1" align="left">
                    My health log
                  </Typography>
                </Grid>
              </Grid>
             
              <div className="main-content-section">
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={12} md={6}>
                    <LogForm
                      doctors={this.state.doctors}
                      handleFormSubmit={this.handleFormSubmit}
                      handleLogDateChange={this.handleLogDateChange}
                      handleLogDoctorChange={this.handleLogDoctorChange}
                      handleLogVisitReasonChange={this.handleLogVisitReasonChange}
                      handleLogHeightChange={this.handleLogHeightChange}
                      handleLogWeightChange={this.handleLogWeightChange}
                      handleLogNotesChange={this.handleLogNotesChange}
                      logDoctorError={this.state.logDoctorError}
                      logDateError = {this.state.logDateError}
                      logVisitReasonError = {this.state.logVisitReasonError}
                      logHeightError = {this.state.logHeightError}
                      logWeightError = {this.state.logWeightError}
                      logNotesError = {this.state.logNotesError}
                      formSuccessMessage = {this.state.formSuccessMessage} />
                  </Grid>
                      
                  <Grid item xs={12} sm={12} md={6}>
                    {this.state.logs.map(log => {
                      return (
                        <LogList
                          id={log._id}
                          key={log._id}
                          date={log.date}
                          doctor={log.doctor}
                          visitPurpose={log.visitPurpose}
                          heightIn={log.heightIn}
                          weightLb={log.weightLb}
                          visitNotes={log.notes}
                          deleteLog={this.deleteLog}
                        />
                      );
                    })}  
                  </Grid>
                </Grid>
              </div>
          </div>
        </main>
      </div>,
    ];
  }
}

export default withStyles(styles)(MedLog);
