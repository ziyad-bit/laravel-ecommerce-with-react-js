import axios from "axios";

const url   = "http://localhost:8000/api/admins/category/";

export const addCategories = async ( formData) => {
    return await axios
        .post(url + "add" , formData, {
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err.response);
            throw err
        });
};

export const getCategories = async ( ) => {
    return await axios
        .get(url + "get" , {
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err.response);
            throw err
        });
};

export const editCategories = async (id ) => {
    return await axios
        .get(url + "edit/"+id , {
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err.response);
            throw err
        });
};

export const updateCategories = async ( id,formData) => {
    return await axios
        .post(url + "update/"+id ,formData, {
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err.response);
            throw err
        });
};

export const updatePhoto = async ( id,formData) => {
    return await axios
        .post(url + "update/"+id ,formData, {
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err.response);
            throw err
        });
};

export const deleteCategories = async ( id) => {
    return await axios
        .delete(url + "delete/"+id , {
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err.response);
            throw err
        });
};

export const handlePage = async (pageNumber) => {
    return await axios
        .get(url + "get?page="+pageNumber , {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};