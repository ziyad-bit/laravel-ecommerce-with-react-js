import axios from "axios";

const url = "http://localhost:8000/api/admins/";

export const login = async adminsData => {
    return await axios
        .post(
            url + "login",
            {
                email: adminsData.email,
                password: adminsData.password
            },
            {
                headers: {
                    "content-type": "application/json"
                }
            }
        )
        .then(res => {
            localStorage.setItem("adminsToken", res.data.token);
            return res.data.token;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getauthadmin = async () => {
    return await axios
        .get(
            url + "authadmin",
            
            {
                headers: {
                    Authorization:`Bearer ${localStorage.adminsToken}` 
                }
            }
        )
        .then(res => {
            
            return res
        })
        .catch(err => {
            console.log(err);
        });
};


