import axios from "axios";

const url   = "http://localhost:8000/api/admins/";
const token = { Authorization: `bearer ${localStorage.adminsToken}`};

export const addCategories = async ( formData) => {
    return await axios
        .post(url + "add/category/" , formData, {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};