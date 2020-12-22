import axios from "axios";
const url   = "http://localhost:8000/api/users/";

export const userGetItems = async () => {
    return await axios
        .get(url + "get/items" , {
            headers: { Authorization: `Bearer ${localStorage.user_token}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getItemDetails = async (id) => {
    return await axios
        .get(url + "get/items/"+id , {
            headers: { Authorization: `Bearer ${localStorage.user_token}`}
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
        .get(url + "get/items?page="+pageNumber , {
            headers: { Authorization: `Bearer ${localStorage.user_token}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const userAddItems = async (id,formData) => {
    return await axios
        .post(url + "add/items/"+id ,formData, {
            headers: { Authorization: `Bearer ${localStorage.user_token}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const userAddComment = async (newComment) => {
    return await axios
        .post(url + "comment/add" ,newComment, {
            headers: { Authorization: `Bearer ${localStorage.user_token}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const userGetComment = async (id) => {
    return await axios
        .get(url + "comment/get/"+id , {
            headers: { Authorization: `Bearer ${localStorage.user_token}`}
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};