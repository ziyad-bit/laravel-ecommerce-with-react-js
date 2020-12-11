import axios from "axios";

const url   = "http://localhost:8000/api/admins/";
const token = { Authorization: `Bearer ${localStorage.adminsToken}`};

export const addAdmins = async ( formData) => {
    return await axios
        .post(url + "add/admins" , formData, {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err.response);
            throw err;
        });
};

export const getAdmin = async () => {
    return await axios
        .get(url + "get/admins" , {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getAdminCount = async () => {
    return await axios
        .get(url + "get/admins/count" , {
            headers:{ Authorization: `Bearer ${localStorage.adminsToken}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const handlePage = async (pageNumber) => {
    return await axios
        .get(url + "get/admins?page="+pageNumber , {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const deleteAdmins = async (id) => {
    return await axios
        .delete(url + "delete/admins/"+id , {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateAdmins = async (id, formData) => {
    return await axios
        .post(url + "update/admins/"+id , formData, {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err.response);
            throw err;
        });
};
