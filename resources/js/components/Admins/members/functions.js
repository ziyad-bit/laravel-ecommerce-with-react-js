import axios from "axios";

const url   = "http://localhost:8000/api/admins/";
const token = { Authorization: `bearer ${localStorage.adminsToken}`};

export const addusers = async ( formData) => {
    return await axios
        .post(url + "add/users" , formData, {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
            throw err
        });
};

export const getUser = async () => {
    return await axios
        .get(url + "get/users" , {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getUserCount = async () => {
    return await axios
        .get(url + "get/users/count" , {
            headers: token
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
        .get(url + "get/users?page="+pageNumber , {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const deleteUsers = async (id) => {
    return await axios
        .delete(url + "delete/users/"+id , {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const editUser = async (id) => {
    return await axios
        .get(url + "edit/users/"+id , {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateUser = async (id,formData) => {
    return await axios
        .post(url + "update/users/"+id ,formData, {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
            throw err
        });
};