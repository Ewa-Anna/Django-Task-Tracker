import axios from "axios"
import clientApi from "../axios";

export const getAllTickets = async ({ token }: { token: string | null }) => {

    try {
        const config = {
            withCredentials: true,
        }

        const response = await axios.get("http://127.0.0.1:8000/task-tracker/v1/task/tasks/", config)

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

export const getTicketTypeOptions = async () => {
    try {
        const config = {
            withCredentials: true,
        }

        const response = await axios.get("http://127.0.0.1:8000/task-tracker/v1/task/dropdown-list/type", config)

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

export const getTicketPriorityOptions = async () => {
    try {
        const config = {
            withCredentials: true,
        }

        const response = await axios.get("http://127.0.0.1:8000/task-tracker/v1/task/dropdown-list/priority", config)

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

export const createNewTicket = async ({ formData }) => {
    try {


        const response = await clientApi.post("http://127.0.0.1:8000/task-tracker/v1/task/tasks/", formData)

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


export const getTicketDetails = async ({ id }) => {

    try {
        const config = {
            withCredentials: true,
        }

        const response = await axios.get(`http://127.0.0.1:8000/task-tracker/v1/task/tasks/${id}`, config)

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

export const getCommentsByTicketId = async ({ id }) => {

    try {
        const config = {
            withCredentials: true,
        }

        const response = await axios.get(`http://127.0.0.1:8000/task-tracker/v1/task/comment-for-tasks/${id}`, config)

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

export const addComment = async ({ formData }) => {

    const { projectId, ticketId, text } = formData;
    try {


        const response = await clientApi.post("http://127.0.0.1:8000/task-tracker/v1/task/comments/", formData)

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

export const updateComment = async ({ commentId, formData }) => {

    try {


        const response = await clientApi.put(`http://127.0.0.1:8000/task-tracker/v1/task/comments/${commentId}/`, formData)

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
export const deleteComment = async ({ commentId }: { commentId: string }) => {

    try {

        const response = await clientApi.delete(`http://127.0.0.1:8000/task-tracker/v1/task/comments/${commentId}/`)

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