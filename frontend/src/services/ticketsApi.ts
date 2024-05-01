import axios from "axios";
import clientApi from "../axios";

export const getAllTickets = async ({ limit = 10, title = "", offset = 0 }) => {
  try {
    const config = {
      withCredentials: true,
    };

    const response = await axios.get(
      `http://127.0.0.1:8000/task-tracker/v1/task/tasks/?title=${title}&offset=${offset - 1 * limit}&limit=${limit}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};

export const getTicketTypeOptions = async () => {
  try {
    const config = {
      withCredentials: true,
    };

    const response = await axios.get(
      "http://127.0.0.1:8000/task-tracker/v1/task/dropdown-list/type",
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};

export const getTicketPriorityOptions = async () => {
  try {
    const config = {
      withCredentials: true,
    };

    const response = await axios.get(
      "http://127.0.0.1:8000/task-tracker/v1/task/dropdown-list/priority",
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};

export const createNewTicket = async ({ csrfToken, formData }) => {
  try {
    const response = await clientApi({ csrfToken }).post(
      "http://127.0.0.1:8000/task-tracker/v1/task/tasks/",
      formData
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};

export const getTicketDetails = async ({ id }) => {
  try {
    const config = {
      withCredentials: true,
    };

    const response = await axios.get(
      `http://127.0.0.1:8000/task-tracker/v1/task/tasks/${id}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};

export const getCommentsByTicketId = async ({ id }) => {
  try {
    const config = {
      withCredentials: true,
    };

    const response = await axios.get(
      `http://127.0.0.1:8000/task-tracker/v1/task/comment-for-tasks/${id}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};

export const addComment = async ({ csrfToken, formData }) => {
  const { projectId, ticketId, text } = formData;
  try {
    const response = await clientApi({ csrfToken }).post(
      "http://127.0.0.1:8000/task-tracker/v1/task/comments/",
      formData
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};

export const updateComment = async ({ csrfToken, commentId, formData }) => {
  try {
    const response = await clientApi({ csrfToken }).put(
      `http://127.0.0.1:8000/task-tracker/v1/task/comments/${commentId}/`,
      formData
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};
export const deleteComment = async ({
  csrfToken,
  commentId,
}: {
  commentId: string;
  csrfToken: string;
}) => {
  try {
    const response = await clientApi({ csrfToken }).delete(
      `http://127.0.0.1:8000/task-tracker/v1/task/comments/${commentId}/`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};

export const updateTicket = async ({ formData }) => {
  try {
    const ticketId = formData.get("ticketId");

    console.log("ticketId");
    console.log(ticketId);

    const response = await clientApi.patch(
      `http://127.0.0.1:8000/task-tracker/v1/task/tasks/${ticketId}/`,
      formData
    );

    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("undexpected error", error);
      throw new Error("An unexpected error ocured");
    }
  }
};
