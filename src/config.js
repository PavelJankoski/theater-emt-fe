import axios from 'axios';

export const API_DRIVER = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: "json",
    headers: {
        "Content-Type": "application/json"
    }
});

export const setAuthToken = () => {
        if(localStorage.getItem('token')){
            API_DRIVER.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
            return true;
        }
        else if(sessionStorage.getItem('token')){
            API_DRIVER.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem("token")
            return true;
        }
        else {
            return false;
        }

}
