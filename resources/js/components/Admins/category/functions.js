import axios from "axios";

const url   = "http://localhost:8000/api/admins/";
const token = { Authorization: `bearer ${localStorage.adminsToken}`};

export const addCategories = async ( formData) => {
    return await axios
        .post(url + "add/category" , formData, {
            headers: token
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
        .get(url + "get/category" , {
            headers: token
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
        .get(url + "edit/category/"+id , {
            headers: token
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
        .post(url + "update/category/"+id ,formData, {
            headers: token
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
        .post(url + "update/photo/"+id ,formData, {
            headers: token
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
        .delete(url + "delete/category/"+id , {
            headers: token
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
        .get(url + "get/category?page="+pageNumber , {
            headers: token
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};