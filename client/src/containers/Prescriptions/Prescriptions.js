import React, { Component } from "react";
import NavBar from '../../Components/AppBar';
import PrescriptionsForm from  './PrescriptionsForm';
import PrescriptionsList from './PrescriptionsList';
import PrescriptionsAPI from '../../utils/PrescriptionsAPI';
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

class Prescriptions extends Component {
  state = {
    prescriptionName: "",
    prescriptionDoctor: "",
    prescriptionDate: "",
    prescriptionAmount: "",
    prescriptionDirections: "",
    prescriptions: [],
    prescriptionNameError: "",
    prescriptionDoctorError: "",
    prescriptionAmountError: "",
    prescriptionDirectionsError: "",
    formSuccessMessage: "",
    doctors: [],
  };

    componentDidMount() {
        this.loadPrescriptions();
        this.loadDoctors();
    }

    loadPrescriptions = () => {
        PrescriptionsAPI.getPrescriptions()
            .then(res =>
              this.setState({ 
                prescriptions: res.data
              }))
            .catch(err => console.log('loading prescriptions is not working: ' + err));
    };

    loadDoctors = () => {
      DoctorsAPI.getDoctors()
        .then(res =>
          this.setState({ doctors: res.data })
        )
        .catch(err => console.log('getting doctors did not work: ', err));
    };

    deletePrescription = id => {
        PrescriptionsAPI.deletePrescription(id)
            .then(res => this.loadPrescriptions())
            .catch(err => console.log(err));
    };

    handlePrescriptionNameChange = (event) => {
        this.setState({ 
          prescriptionName: event.target.value,
          prescriptionNameError: "",
          formSuccessMessage: "",
        });
    }

    handlePrescriptionDoctorChange = (event) => {
        this.setState({ 
          prescriptionDoctor: event.target.value,
          prescriptionDoctorError: "",
          formSuccessMessage: "",
        });
    }

    handlePrescriptionDateChange = (event) => {
        this.setState({ 
          prescriptionDate: event.target.value,
          prescriptionDateError: "",
          formSuccessMessage: "",
        });
    }

    handlePrescriptionAmountChange = (event) => {
        this.setState({ 
          prescriptionAmount: event.target.value,
          prescriptionAmountError: "",
          formSuccessMessage: "",
        });
    }

    handlePrescriptionDirectionsChange = (event) => {
        this.setState({ 
          prescriptionDirections: event.target.value,
          prescriptionDirectionsError: "",
          formSuccessMessage: "",
        });
    }

    handleFormSubmit = event => {
        event.preventDefault();

        if (this.state.prescriptionName === "") {
          this.setState({
            prescriptionNameError: "Enter the name of the prescription."
          })
        }

        if (this.state.prescriptionDoctor === "") {
          this.setState({
            prescriptionDoctorError: "Select the prescribing doctor from the drop-down list."
          })
        }

        if (this.state.prescriptionDate === "" || this.state.prescriptionDate === "mm/dd/yyyy") {
          this.setState({
            prescriptionDateError: "Use the date picker to select the date when the prescription was prescribed."
          })
        }

        if (this.state.prescriptionAmount === "") {
          this.setState({
            prescriptionAmountError: "Enter the amount prescribed."
          })
        }

        if (this.state.prescriptionDirections === "") {
          this.setState({
            prescriptionDirectionsError: "Enter any verbal and/or written directions received regarding this prescription. If not applicable, enter N/A."
          })
        }

        else {
          PrescriptionsAPI.savePrescription({
              prescriptionName: this.state.prescriptionName,
              doctorprescribed: this.state.prescriptionDoctor,
              dateprescribed: this.state.prescriptionDate,
              amount: this.state.prescriptionAmount,
              generalinstructions: this.state.prescriptionDirections,
          })
              .then(res => this.loadPrescriptions())
              .catch(err => console.log('there is an error in saving the prescription', err));
          
          this.setState({
            formSuccessMessage: `${this.state.prescriptionName} added successfully!`,
          });
    
        document.getElementById('prescription-form').reset();
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
                    Prescriptions
                  </Typography>
                </Grid>
              </Grid>

              <div className="main-content-section">
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={12} md={6}>
                    <PrescriptionsForm
                      doctors={this.state.doctors}
                      handleFormSubmit={this.handleFormSubmit}
                      handlePrescriptionNameChange={this.handlePrescriptionNameChange}
                      handlePrescriptionDoctorChange={this.handlePrescriptionDoctorChange}
                      handlePrescriptionDateChange={this.handlePrescriptionDateChange}
                      handlePrescriptionAmountChange={this.handlePrescriptionAmountChange}
                      handlePrescriptionDirectionsChange={this.handlePrescriptionDirectionsChange}
                      prescriptionNameError = {this.state.prescriptionNameError}
                      prescriptionDoctorError = {this.state.prescriptionDoctorError}
                      prescriptionDateError = {this.state.prescriptionDateError}
                      prescriptionAmountError = {this.state.prescriptionAmountError}
                      prescriptionDirectionsError = {this.state.prescriptionDirectionsError} 
                      formSuccessMessage = {this.state.formSuccessMessage}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    {this.state.prescriptions.map(prescription => {
                      return (
                        <PrescriptionsList
                          id={prescription._id}
                          key={prescription._id}
                          prescriptionName={prescription.prescriptionName}
                          prescriptionDoctor={prescription.doctorprescribed}
                          prescriptionDate={prescription.dateprescribed}
                          prescriptionAmount={prescription.amount}
                          prescriptionDirections={prescription.generalinstructions}
                          deletePrescription={this.deletePrescription}
                        />
                      );
                    })}
                  </Grid>
                </Grid>
              </div>
            </div>
          </main>
       </div >
      ];
    }
  }

export default withStyles(styles)(Prescriptions);
