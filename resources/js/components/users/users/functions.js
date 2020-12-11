import axios from "axios";

const url   = "http://localhost:8000/api/users/";
const token = { Authorization: `bearer ${localStorage.user_token}`};

export const signUp = async ( formData) => {
    return await axios
        .post(url + "signup" , formData, {
            "content-type": "application/json"
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
            throw err
        });
};

export const userLogin = async usersData => {
    return await axios
        .post(
            url + "login",
            {
                email   : usersData.email,
                password: usersData.password
            },
            {
                headers: {
                    "content-type": "application/json"
                }
            }
        )
        .then(res => {
            localStorage.setItem("user_token", res.data.user_token);
            return res.data.user_token;
        })
        .catch(err => {
            console.log(err);
        });
};