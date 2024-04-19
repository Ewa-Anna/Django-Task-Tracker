import axios from "axios"
import clientApi from "../axios";

export const login = async ({ email, password }: { email: string, password: string }) => {

    try {

        const config = {
            withCredentials: true,

        }


        const response = await axios.post("http://127.0.0.1:8000/task-tracker/v1/user/login/", {
            email, password
        }, config)

        return response.data;
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) {
            console.log("error message:", error.message)
            throw new Error(error.message);
        } else {
            console.log("undexpected error", error)
            throw new Error("An unexpected error ocured")
        }
    }
}


export const logout = async ({ token }: { token: string }) => {
    console.log(token);
    try {



        const config = {
            credentials: "include",
            withCredentials: true,
            withXSRFToken: true,
            xsrfHeaderName: "X-CSRFToken",
            headers: {
                "X-CSRFToken": token,
            },

        };

        const response = await clientApi.post("http://127.0.0.1:8000/task-tracker/v1/user/logout/", config)

        return response.data;
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) {
            console.log("error message:", error.message)
            throw new Error(error.message);
        } else {
            console.log("undexpected error", error)
            throw new Error("An unexpected error ocured")
        }
    }
}

export const validateSession = async () => {

    try {

        const config = {
            withCredentials: true,
        }

        const response = await axios.get("http://127.0.0.1:8000/task-tracker/v1/user/validate-session/", config)

        return response.data;
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) {
            console.log("error message:", error.message)
            throw new Error(error.message);
        } else {
            console.log("undexpected error", error)
            throw new Error("An unexpected error ocured")
        }
    }
}

export const getUsers = async ({ limit = 10, name = "", offset = 0, }) => {

    try {

        const config = {
            withCredentials: true,
        }

        const response = await axios.get(`http://127.0.0.1:8000/task-tracker/v1/user/users/?name=${name}&offset=${(offset - 1) * limit}&limit=${limit}`, config)

        return response.data;
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) {
            console.log("error message:", error.message)
            throw new Error(error.message);
        } else {
            console.log("undexpected error", error)
            throw new Error("An unexpected error ocured")
        }
    }
}
