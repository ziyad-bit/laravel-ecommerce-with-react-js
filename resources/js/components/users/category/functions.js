import axios from 'axios';

const url="http://localhost:8000/api/users/";


export const userGetCategories =async () => {
    return await axios
        .get(url+"get/category", {
            headers: { Authorization: `Bearer ${localStorage.user_token }` }
        })
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getCategoriesItems =async (id) => {
    return await axios
        .get(url+"get/category/items/"+id, {
            headers: { Authorization: `Bearer ${localStorage.user_token }` }
        })
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(err => {
            console.log(err);
        });
};