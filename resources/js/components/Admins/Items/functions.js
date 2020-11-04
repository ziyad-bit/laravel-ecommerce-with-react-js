import axios from "axios";

const url   = "http://localhost:8000/api/admins/";
const token = { Authorization: `bearer ${localStorage.adminsToken}`};

export const additems = async (admins_id, formData) => {
    return await axios
        .post(url + "add/items/" + admins_id, formData, {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getitems = async () => {
    return await axios
        .get(url + "get/items/" , {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const edititems = async (id) => {
    return await axios
        .get(url + "edit/items/"+id , {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};