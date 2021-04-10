import axios from "axios";

const url   = "http://localhost:8000/api/admins/items/";

export const additems = async (admins_id, formData) => {
    return await axios
        .post(url + "add/" + admins_id, formData, {
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
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

export const getitemsCount = async () => {
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
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
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
        .get(url + "edit/"+id , {
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateitems = async (id,formData) => {
    return await axios
        .post(url + "update/"+id ,formData, {
            headers: { Authorization: `Bearer ${localStorage.adminsToken}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err.response)
            throw err
            
        });
};

export const deleteitems = async (id) => {
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

