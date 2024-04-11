import axios from "axios"

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
            console.log('error message:', error.message)
            throw new Error(error.message);
        } else {
            console.log("undexpected error", error)
            throw new Error("An unexpected error ocured")
        }
    }
}