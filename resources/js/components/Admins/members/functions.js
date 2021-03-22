import axios from "axios";

const url   = "http://localhost:8000/api/admins/users/";

export const addusers = async ( formData) => {
    return await axios
        .post(url + "add" , formData, {
            headers: { Authorization: `bearer ${localStorage.adminsToken}`}
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
        .get(url + "get" , {
            headers: { Authorization: `bearer ${localStorage.adminsToken}`}
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
        .get(url + "get/count" , {
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
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
            headers: { Authorization: `bearer ${localStorage.adminsToken}`}
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
        .delete(url + "delete/"+id , {
            headers: { Authorization: `bearer ${localStorage.adminsToken}`}
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
        .get(url + "edit/"+id , {
            headers: { Authorization: `bearer ${localStorage.adminsToken}`}
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
        .post(url + "update/"+id ,formData, {
            headers: { Authorization: `bearer ${localStorage.adminsToken}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
            throw err
        });
};