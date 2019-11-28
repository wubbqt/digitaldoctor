import React, { Component } from "react";
import AppointmentsForm from './AppointmentsForm';
import AppointmentsList from './AppointmentsList';
import AppointmentAPI from '../../utils/AppointmentAPI';
import DoctorsAPI from '../../utils/DoctorsAPI';
import ClinicsAPI from '../../utils/ClinicsAPI';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Sidebar from '../../Components/Sidebar';
import NavBar from '../../Components/AppBar';


const styles = theme => ({
  root: theme.mixins.gutters({
    marginTop: theme.spacing.unit * 3,
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: '#33658A',
    display: 'block',
    overflowX: 'auto',
    maxWidth: '80%',
  }),
  table: {
    minWidth: 700,
    tableLayout: 'auto',
    display: 'block',
    width: '100%',
    overflowX: 'auto',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'theme.palette.background.default',
    },
  },
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
  heading: {
    marginTop: 40,
  },
});

class Appointments extends Component {
  state = {
    appointmentName: "",
    appointmentDoctor: "",
    appointmentDate: "",
    appointmentTime: "",
    appointments: [],
    doctors: [],
    clinics: [],
    appointmentNameError: "",
    appointmentDoctorError: "",
    appointmentDateError: "",
    appointmentTimeError: "",
    formSuccessMessage: "",

  };

  componentDidMount() {
    this.loadAppointments();
    this.loadDoctors();
    this.loadClinics();
  }

  loadAppointments = () => {
    AppointmentAPI.getAppointments()
      .then(res =>
        this.setState({ appointments: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteAppointment = id => {
    AppointmentAPI.deleteAppointment(id)
      .then(res => this.loadAppointments())
      .catch(err => console.log(err));
  };

  loadDoctors = () => {
    DoctorsAPI.getDoctors()
      .then(res =>
        this.setState({ doctors: res.data })
      )
      .catch(err => console.log('getting doctors did not work: ', err));
  };

  loadClinics = () => {
    ClinicsAPI.getClinics()
      .then(res =>
        this.setState({ clinics: res.data })
      )
      .catch(err => console.log('getting clinics did not work: ', err));
  };

  handleAppointmentNameChange = (event) => {
    this.setState({ 
      appointmentName: event.target.value,
      appointmentNameError: "",
      formSuccessMessage: "",
    });
  }

  
  handleAppointmentDoctorChange = (event) => {
    this.setState({ 
      appointmentDoctor: event.target.value,
      appointmentDoctorError: "",
      formSuccessMessage: "",
    });
  }

  
  handleAppointmentDateChange = (event) => {
    this.setState({ 
      appointmentDate: event.target.value,
      appointmentDateError: "",
      formSuccessMessage: "",
    });
  }

  
  handleAppointmentTimeChange = (event) => {
    this.setState({ 
      appointmentTime: event.target.value,
      appointmentTimeError: "",
      formSuccessMessage: "",
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.appointmentName === "") {
      this.setState({
        appointmentNameError: "Enter a name for the appointment."
      })
    }

    if (this.state.appointmentDoctor === "") {
      this.setState({
        appointmentDoctorError: "Select the doctor associated with the appointment from the drop-down list."
      })
    }

    if (this.state.appointmentDate === "" || this.state.appointmentDate === "mm/dd/yyyy") {
      this.setState({
        appointmentDateError: "Use the date picker to select the date of the appointment."
      })
    }

    if (this.state.appointmentTime === "") {
      this.setState({
        appointmentTimeError: "Use the time picker to select the time of the appointment in HH:MM AM/PM format."
      })
    }

    else {
      AppointmentAPI.saveAppointment({
        appointmentName: this.state.appointmentName,
        doctor: this.state.appointmentDoctor,
        date: this.state.appointmentDate,
        time: this.state.appointmentTime,
      })
        .then(res => this.loadAppointments())
        .catch(err => console.log(err));

      this.setState({
          formSuccessMessage: `${this.state.appointmentName} with Dr. ${this.state.appointmentDoctor} on ${this.state.appointmentDate} added successfully!`,
      });

      
      document.getElementById('appointment-form').reset();
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
                  Appointments
                </Typography>
              </Grid>
            </Grid>

            <div className="main-content-section">
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>Doctor</b></TableCell>
                            <TableCell numeric><b>Date</b></TableCell>
                            <TableCell numeric><b>Time (HH:MM)</b></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className={classes.tabledata}>
                          {this.state.appointments.map(appointment => {
                            return (
                              <AppointmentsList
                                id={appointment._id}
                                key={appointment._id}
                                name={appointment.appointmentName}
                                date={appointment.date}
                                time={appointment.time}
                                doctor={appointment.doctor}
                                clinic={appointment.clinic}
                                deleteAppointment={this.deleteAppointment}
                              />
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </Paper>
                </Grid>
              </Grid>

              <Grid container spacing={24} className={classes.heading}>
                <Grid item xs={12}>
                  <AppointmentsForm
                    doctors={this.state.doctors}
                    clinics={this.state.clinics}
                    handleFormSubmit={this.handleFormSubmit}
                    handleAppointmentNameChange={this.handleAppointmentNameChange}
                    handleAppointmentDoctorChange={this.handleAppointmentDoctorChange}
                    handleAppointmentDateChange={this.handleAppointmentDateChange}
                    handleAppointmentTimeChange={this.handleAppointmentTimeChange}
                    handleAppointmentClinicChange={this.handleAppointmentClinicChange}
                    appointmentNameError = {this.state.appointmentNameError}
                    appointmentDoctorError = {this.state.appointmentDoctorError}
                    appointmentDateError  = {this.state.appointmentDateError}
                    appointmentTimeError = {this.state.appointmentTimeError}
                    formSuccessMessage = {this.state.formSuccessMessage} 
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </main>
      </div>
    ];
  }
}

export default withStyles(styles)(Appointments);
