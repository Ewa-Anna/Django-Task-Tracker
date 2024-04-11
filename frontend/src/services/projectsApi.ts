import axios from "axios"

export const getAllProjects = async ({ token }: { token: string | null }) => {

    try {
        const config = {
            withCredentials: true,
        }

        const response = await axios.get("http://127.0.0.1:8000/task-tracker/v1/task/projects/", config)

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

export const getProjectDetails = async ({ id }) => {

    try {
        const config = {
            withCredentials: true,
        }

        const response = await axios.get(`http://127.0.0.1:8000/task-tracker/v1/task/projects/${id}`, config)

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