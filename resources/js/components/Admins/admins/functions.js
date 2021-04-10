import axios from "axios";

const url   = "http://localhost:8000/api/admins/";

export const addAdmins = async ( formData) => {
    return await axios
        .post(url + "add" , formData, {
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
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
        .get(url + "get" , {
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
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
        .get(url + "get/count" , {
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
        .get(url + "get?page="+pageNumber , {
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
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
        .delete(url + "delete/"+id , {
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
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
        .post(url + "update/"+id , formData, {
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err.response);
            throw err;
        });
};
