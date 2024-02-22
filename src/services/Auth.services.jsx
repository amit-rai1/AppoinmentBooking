
import axios from "axios";
import { getInfo } from "./Auth.header";

const TOKEN = getInfo();
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN,
    }
}
const API_URL = "http://localhost:7800/";





//multiLogin

export const multiLogin = async ({ email, password }) => {
    try {
        const response = await axios.post(API_URL + "user/userLogin", {
            email,
            password
        }, axiosConfig)
        if (response.data.status === true) {
            localStorage.setItem('users', JSON.stringify(response.data));

            return response
        } else {
            return response;
        }
    } catch (e) {
        return null;
    }
}


export const patientList = async () => {
    try {
        const response = await axios.get(API_URL + "user/getPatientlist", axiosConfig)
        return response;
    }
    catch (e) {
        console.log(e)
    }
}


export const doctorList = async () => {
    try {
        const response = await axios.get(API_URL + "user/getDoctorlist", axiosConfig)
        return response;
    }
    catch (e) {
        console.log(e)
    }
}
export const patientById = async (_id,) => {
    return axios.get(
      API_URL +  `appoinment/appoinmentById/${_id}`,{_id},
 
      axiosConfig
    );
  
    console.log(_id);
  
  };
export const appoinmentList = async (limit,page) => {
    try {
        const response = await axios.post(API_URL + "appoinment/getAppoinmentlist", {limit,page},axiosConfig)
        return response;
    }
    catch (e) {
        console.log(e)
    }
}
export const addAppoinment = async (PatientName, contact, email, Date, symptoms) => {
    try {
        const response = await axios.post(API_URL + "appoinment/bookAppoinment",
            { PatientName, contact, email, Date, symptoms },
            axiosConfig)
        return response;
    }
    catch (e) {
        console.log(e)
    }
}
// export const searchData = async(PatientName,contact,email,Date,symptoms,Key)=>{
//     return await axios.get(API_URL +`appoinment/patientSearch/${Key}`,{PatientName,contact,email,Date,symptoms,Key},
//     axiosConfig)
// }

export const searchData = async (Key) => {
    return await axios.get(API_URL + `appoinment/patientSearch/${Key}`, {Key },
        axiosConfig)
}


// export const removePatient = async(_id)=>{
//     return await axios.delete(API_URL + `appoinment/deletePatient/${_id}`,{_id},
//     axiosConfig)


// }

export const removePatient = async (_id,) => {
    return axios.delete(
      API_URL +  `appoinment/deletePatient/${_id}`,{_id},
 
      axiosConfig
    );
  
    console.log(_id);
  
  };

  export const payment = async (PatientName,fees) => {
      console.log(PatientName,fees)
    try {
        const response = await axios.post(API_URL + "pay/checkout",
            { PatientName,fees },
            axiosConfig)
        return response;
    }
    catch (e) {
        console.log(e)
    }
}

export const updatePatient = async (data, _id) => {
    console.log(data);
    console.log(_id)
    return await axios.put(API_URL + "appoinment/Updateappoinment", {
        _id,
        PatientName: data.PatientName,
        contact: data.contact,
        email:data.email,
        Date:data.Date,
        symptoms:data.symptoms
    }, axiosConfig)
}

  export const bulkDelete = async (ids) => {
      console.log(ids)
    return axios.post(
      API_URL +  `appoinment/bulkDelete`,{ids},
 
      axiosConfig
    );
  

  
  };