import React, { useState } from 'react';
import '../CSS/Profile.css';
import logo from '../Images/profile_logo.png';
import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { any } from 'prop-types';
import { toast, ToastContainer } from "react-toastify";


const ENDPOINT = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
const Profile = () => {
    const SID = JSON.parse(localStorage.getItem("userInfo")).SID;
    const Api = `http://localhost:3001/api/user/viewprofile?SID=${SID}`;
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        studentId: "",
        Studentname: "",
        fatherName: "",
        motherName: "",
        dob: "",
        nationality: "",
        gender: "",
        personalEmail: "",
        instituteEmail: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        program: "",
        Year: "",
        AddmissionThrough: "",
        AddmissionRank: "",
    });
    const fetchApiData = async () => {
        const SID = JSON.parse(localStorage.getItem("userInfo")).SID;
        const role = JSON.parse(localStorage.getItem("userInfo")).role;
        console.log(SID);
        console.log(role);
        try {

            const response = await axios.get(Api);
            const data = response.data;
            console.log(data);
            setFormData({
                studentId: SID,
                Studentname: data.Sname || "",
                fatherName: data.Fname || "",
                motherName: data.Mname || "",
                dob: data.Bdate || "",
                nationality: data.nationality || "",
                gender: data.gender || "",
                personalEmail: data.EmailId || "",
                instituteEmail: data.acadEmailID || "",
                phone: data.Emergency_no || "",
                address: data.Addr_street || "",
                city: data.Addr_city || "",
                state: data.Addr_state || "",
                zip: data.zipcode || "",
                program: data.program || "",
                Year: data.year || "",
                AddmissionThrough: data.admission_through || "",
                AddmissionRank: data.admission_rank || "",

            });
        } catch (e) {
            setError(e);
            console.log(error);
        }
    }


    useEffect(() => {
        fetchApiData();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh
        console.log("Form data:", formData);

        try {
            const response = await axios.post(`http://localhost:3001/api/user/editprofile`, {
                studentId: formData.studentId,
                Sname: formData.Studentname,
                Fname: formData.fatherName,
                Mname: formData.motherName,
                personalEmail: formData.personalEmail,
                Emergency_no: formData.phone,
                Addr_street: formData.address,
                Addr_city: formData.city,
                Addr_state: formData.state,
                Zipcode: formData.zip,

            }

            );

            if (response.data.success) {
                toast.success("Profile updated successfully!", response.data);
            }
            else {
            toast.error("Profile update failed!");
            }
            } catch (error) {
              console.error("Error during POST request:", error);
              toast.error("An error occurred while updating the profile.");
            }

            
    };

    return (
        <div id="container">
            <div id="header">
                <img src={logo} alt="University Logo" />
            </div>
            <form id="profile" onSubmit={handleSubmit}>
                <h2 id="h2">Student Profile</h2>

                {/* Personal Information */}
                <fieldset>
                    <legend id="personal">Personal Information</legend>
                    <div id="form-row">
                        <TextField
                            label="Student ID"
                            name="studentId"
                            value={formData.studentId}
                            fullWidth
                            disabled
                            data-testid="student-id"
                        />
                    </div>

                    <div id="form-row">
                        <TextField
                            label="Student Name"
                            name="Studentname" // matches formData key
                            value={formData.Studentname}
                            onChange={handleChange}
                            fullWidth
                            data-testid="student-name"
                        />
                    </div>

                    <div id="form-row">
                        <TextField
                            label="Father's Name"
                            variant="standard"
                            name="fatherName" // matches formData key
                            value={formData.fatherName}
                            onChange={handleChange}
                            fullWidth
                        />
                    </div>

                    <div id="form-row">
                        <TextField
                            label="Mother's Name"
                            variant="standard"
                            name="motherName" // matches formData key
                            value={formData.motherName}
                            onChange={handleChange}
                            fullWidth
                        />
                    </div>

                    <div id="form-row">
                        <div id="form-group">
                        <TextField
                            label="nationality"
                            variant="standard"
                            name="nationality"
                            value={formData.nationality}
                            fullWidth
                            disabled
                            />
                        </div>
                    </div>

                    <div id="form-group">
                    <label>gender</label>
                    <div id="radio-button-group">
                        <label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="Female" 
                                // onChange={handleChange} 
                                checked={formData.gender === 'Female'} 
                                disabled 
                            /> 
                            Female
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="Male" 
                                onChange={handleChange} 
                                checked={formData.gender === 'Male'} 
                                disabled 
                            /> 
                            Male
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="Other" 
                                onChange={handleChange} 
                                checked={formData.gender === 'Other'} 
                                disabled 
                            /> 
                            Other
                        </label>
                    </div>
                </div>

                </fieldset>

                {/* Contact Information */}
                <fieldset>
                    <legend id="contact">Contact Information</legend>
                    <div id="form-row">
                        <div id="form-group">
                        <TextField
                            label="personalEmail"
                            variant="standard"
                            name="personalEmail"
                            value={formData.personalEmail}
                            onChange={handleChange}
                            fullWidth/>
                        </div>
                        <div id="form-group">
                        <TextField
                            label="instituteEmail"
                            variant="standard"
                            name="instituteemail"
                            value={formData.instituteEmail}
                            fullWidth
                            disabled
                            />
                        </div>
                    </div>

                    <div id="form-row">
                        <div id="form-group">
                        <TextField
                            label="emergency_no"
                            variant="standard"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth/>
                        </div>
                    </div>

                    <div id="form-row">
                    <div id="form-group">
                        <TextField
                            label="addr_street"
                            variant="standard"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth/>
                    </div>
                    <div id="form-group">
                    <TextField
                        label="addr_city"
                        variant="standard"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        fullWidth/>
                    </div>
                        
                    </div>

                    <div id="form-row">
                    <div id="form-group">
                        <TextField
                            label="addr_state"
                            variant="standard"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            fullWidth/>
                        </div>
                    <div id="form-group">
                    <TextField
                        label="zipcode"
                        variant="standard"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        fullWidth/>
                    </div>
                    </div>
                </fieldset>

                {/* Enrollment Details */}
                <fieldset>
                    <legend id="enrollment">Enrollment Details</legend>
                    <div id="form-row">
                       
                    <div id="form-group">
                            <TextField
                                label="Program of Study"
                                variant="standard"
                                name="Program of Study"
                                value={formData.program}
                                onChange={handleChange}
                                disabled
                                fullWidth />

                    </div>
                    <div id="form-group">
                            <TextField
                                label="year"
                                variant="standard"
                                name="year"
                                value={formData.Year}
                                disabled
                                fullWidth
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Admission Details */}
                <fieldset>
                    <legend id="adm-info">Admission Information</legend>
                    <div id="form-row">
                        <div id="form-group">
                        <TextField
                            label="admission_through"
                            variant="standard"
                            name="admissionthrough"
                            value={formData.AddmissionThrough}
                            fullWidth
                            disabled //non editable
                            />
                        </div>
                        <div id="form-group">
                        <TextField
                            label="admission_rank"
                            variant="standard"
                            name="admissionrank"
                            value={formData.AddmissionRank}
                            onChange={handleChange}
                            fullWidth
                            disabled //non editable
                            />
                        </div>
                    </div>
                </fieldset>

                <button id="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Profile;