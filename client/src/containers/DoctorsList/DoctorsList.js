import React, { Component } from "react";
import NavBar from '../../Components/AppBar';
import DoctorForm from './DoctorForm';
import DoctorInfo from './DoctorInfo';
import ClinicInfo from './ClinicInfo';
import ClinicForm from './ClinicForm';
import DoctorsAPI from '../../utils/DoctorsAPI';
import ClinicsAPI from '../../utils/ClinicsAPI';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Sidebar from '../../Components/Sidebar';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    display: 'flex',
    flexWrap: 'wrap',
  }),
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
  doctorClinicList: {
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: '#33658A',
  },
  clinicSection: {
    marginTop: 45,
  },
});

class DoctorList extends Component {
  state = {
    doctorFirstName: "",
    doctorLastName: "",
    doctorClinic: "",
    doctorPhone: "",
    doctors: [],
    clinicName: "",
    clinicAddress: "",
    clinicCity: "",
    clinicState: "",
    clinicZip: "",
    clinicPhone: "",
    clinics: [],
    doctorFirstNameError: "",
    doctorLastNameError: "",
    doctorClinicError: "",
    doctorPhoneError: "",
    clinicNameError: "",
    clinicAddressError: "",
    clinicCityError: "",
    clinicStateError: "",
    clinicZipError: "",
    clinicPhoneError: "",
    doctorFormSuccessMessage: "",  
    clinicFormSuccessMessage: "",  
  };

  componentDidMount() {
    this.loadDoctors();
    this.loadClinics();
  }

  loadDoctors = () => {
    DoctorsAPI.getDoctors()
      .then(res =>
        this.setState({ doctors: res.data }))
      .catch(err => console.log('there is an issue loading doctors: ' + err));
  };

  loadClinics = () => {
    ClinicsAPI.getClinics()
      .then(res =>
        this.setState({ clinics: res.data }))
      .catch(err => console.log('there is an issue loading doctors: ' + err));
  };

  deleteDoctor = id => {
    DoctorsAPI.deleteDoctor(id)
      .then(res => this.loadDoctors())
      .catch(err => console.log(err));
  };

  deleteClinic = id => {
    ClinicsAPI.deleteClinic(id)
      .then(res => this.loadClinics())
      .catch(err => console.log(err));
  };

  handleDoctorFirstNameChange = (event) => {
    this.setState({ 
      doctorFirstName: event.target.value,
      doctorFirstNameError: "",
      doctorFormSuccessMessage: "",
    });
  }

  handleDoctorLastNameChange = (event) => {
    this.setState({ 
      doctorLastName: event.target.value,
      doctorLastNameError: "",
      doctorFormSuccessMessage: "",
    });
  }


  handleDoctorClinicChange = (event) => {
    this.setState({ 
      doctorClinic: event.target.value,
      doctorClinicError: "",
      doctorFormSuccessMessage: "",
    });
  }


  handleDoctorPhoneChange = (event) => {
    this.setState({ 
      doctorPhone: event.target.value,
      doctorPhoneError: "",
      doctorFormSuccessMessage: "",
    });
  }

  handleClinicNameChange = (event) => {
    this.setState({ 
      clinicName: event.target.value,
      clinicNameError: "",
      clinicFormSuccessMessage: "",
    });
  }

  handleClinicAddressChange = (event) => {
    this.setState({ 
      clinicAddress: event.target.value,
      clinicAddressError: "",
      clinicFormSuccessMessage: "",
    });
  }

  handleClinicCityChange = (event) => {
    this.setState({ 
      clinicCity: event.target.value,
      clinicCityError: "",
      clinicFormSuccessMessage: "",
    });
  }

  handleClinicStateChange = (event) => {
    this.setState({ 
      clinicState: event.target.value,
      clinicStateError: "",
      clinicFormSuccessMessage: "",
    });
  }

  handleClinicZipChange = (event) => {
    this.setState({ 
      clinicZip: event.target.value,
      clinicZipError: "",
      clinicFormSuccessMessage: "",
    });
  }

  handleClinicPhoneChange = (event) => {
    this.setState({ 
      clinicPhone: event.target.value,
      clinicPhoneError: "",
      clinicFormSuccessMessage: "",
    });
  }

  handleDoctorFormSubmit = event => {
    event.preventDefault();
    if (this.state.doctorFirstName === "") {
      this.setState({
        doctorFirstNameError: "First name is required."
      })
    }

    if (this.state.doctorLastName === "") {
      this.setState({
        doctorLastNameError: "Last name is required."
      })
    }

    if (this.state.doctorClinic === "") {
      this.setState({
        doctorClinicError: "From the drop-down list, select the primary clinic that the doctor is associated with."
      })
    }

    if (this.state.doctorPhone === "") {
      this.setState({
        doctorPhoneError: "Phone number is required."
      })
    }

    else {
      DoctorsAPI.saveDoctor({
        firstname: this.state.doctorFirstName,
        lastname: this.state.doctorLastName,
        clinic: this.state.doctorClinic,
        phone: this.state.doctorPhone,
      })
        .then(res => this.loadDoctors())
        .catch(err => console.log('there is a problem saving doctor: ' + err));

      this.setState({
          doctorFormSuccessMessage: `Dr. ${this.state.doctorFirstName} ${this.state.doctorLastName} added successfully!`,
      });

      document.getElementById('doctor-form').reset();
    }
  };

  handleClinicFormSubmit = event => {
    event.preventDefault();

    if (this.state.clinicName === "") {
      this.setState({
        clinicNameError: "Name is required."
      })
    }

    if (this.state.clinicAddress === "") {
      this.setState({
        clinicAddressError: "Address is required."
      })
    }

    if (this.state.clinicCity === "") {
      this.setState({
        clinicCityError: "City is required."
      })
    }

    if (this.state.clinicState === "") {
      this.setState({
        clinicStateError: "State is required."
      })
    }

    if (this.state.clinicZip === "") {
      this.setState({
        clinicZipError: "Zip code is required."
      })
    }

    if (this.state.clinicPhone === "") {
      this.setState({
        clinicPhoneError: "Phone number is required."
      })
    }

    else {
      ClinicsAPI.saveClinic({
        clinicname: this.state.clinicName,
        address: this.state.clinicAddress,
        city: this.state.clinicCity,
        state: this.state.clinicState,
        zip: this.state.clinicZip,
        phone: this.state.clinicPhone,
      })
        .then(res => this.loadClinics())
        .catch(err => console.log('there is a problem saving doctor: ' + err));

        this.setState({
          clinicFormSuccessMessage: `${this.state.clinicName} added successfully!`,
      });

      document.getElementById('clinic-form').reset();
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
                  Doctors and clinics
                </Typography>
              </Grid>
            </Grid>

            <div className="main-content-section">
              <Grid container spacing={16}>
                <Grid item xs={12} sm={12} md={6}>
                  <DoctorForm 
                    clinics = {this.state.clinics}
                    handleDoctorFormSubmit={this.handleDoctorFormSubmit}
                    handleDoctorFirstNameChange={this.handleDoctorFirstNameChange}
                    handleDoctorLastNameChange={this.handleDoctorLastNameChange}
                    handleDoctorClinicChange={this.handleDoctorClinicChange}
                    handleDoctorPhoneChange={this.handleDoctorPhoneChange} 
                    doctorFirstNameError = {this.state.doctorFirstNameError}
                    doctorLastNameError = {this.state.doctorLastNameError}
                    doctorClinicError = {this.state.doctorClinicError}
                    doctorPhoneError = {this.state.doctorPhoneError} 
                    doctorFormSuccessMessage = {this.state.doctorFormSuccessMessage}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Paper elevation={4} className={classes.doctorClinicList}>
                    <Typography gutterBottom variant="headline" component="h2" style={{textAlign: 'center'}} >
                      Doctors list
                    </Typography>
                     {this.state.doctors.map(doctor => {
                       return (
                        <DoctorInfo 
                          id={doctor._id}
                          key={doctor._id}
                          doctorFirstName={doctor.firstname}
                          doctorLastName={doctor.lastname}
                          doctorClinic={doctor.clinic}
                          doctorPhone={doctor.phone}
                          deleteDoctor = { this.deleteDoctor } />
                      );
                    })}
                  </Paper>
                </Grid>
              </Grid>

              <Grid container spacing={16} className={classes.clinicSection}>
                <Grid item xs={12} sm={12} md={6}>
                  <ClinicForm
                    handleClinicFormSubmit={this.handleClinicFormSubmit}
                    handleClinicNameChange={this.handleClinicNameChange}
                    handleClinicAddressChange={this.handleClinicAddressChange}
                    handleClinicCityChange={this.handleClinicCityChange}
                    handleClinicStateChange={this.handleClinicStateChange}
                    handleClinicZipChange={this.handleClinicZipChange}
                    handleClinicPhoneChange={this.handleClinicPhoneChange}
                    clinicNameError = {this.state.clinicNameError}
                    clinicAddressError = {this.state.clinicAddressError}
                    clinicCityError = {this.state.clinicCityError}
                    clinicStateError = {this.state.clinicStateError}
                    clinicZipError = {this.state.clinicZipError}
                    clinicPhoneError = {this.state.clinicPhoneError}
                    clinicFormSuccessMessage = {this.state.clinicFormSuccessMessage}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <div>
                    <Paper elevation={4} className={classes.doctorClinicList}>
                      <Typography gutterBottom variant="headline" component="h2" style={{textAlign: 'center'}}>
                        Clinics
                      </Typography>
                      {this.state.clinics.map(clinic => {
                        return (
                          <ClinicInfo 
                            id={clinic._id}
                            key={clinic._id}
                            clinicName={clinic.clinicname}
                            clinicAddress={clinic.address}
                            clinicCity={clinic.city}
                            clinicState={clinic.state}
                            clinicZip={clinic.zip}
                            clinicPhone={clinic.phone}
                            deleteClinic={this.deleteClinic} />
                        );
                      })}
                    </Paper>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </main>
      </div>,
    ];
  }
}

export default withStyles(styles)(DoctorList);
