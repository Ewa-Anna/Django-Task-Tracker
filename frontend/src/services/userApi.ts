import axios from "axios";
import clientApi from "../axios";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const config = {
      withCredentials: true,
    };

    const response = await axios.post(
      "http://127.0.0.1:8000/task-tracker/v1/user/login/",
      {
        email,
        password,
      },
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

export const registerAccount = async ({
  first_name,
  last_name,
  name,
  email,
  password,
  confirm_password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const config = {
      withCredentials: true,
    };

    const response = await axios.post(
      "http://127.0.0.1:8000/task-tracker/v1/user/register/",
      {
        first_name,
        last_name,
        name,
        email,
        password,
        confirm_password,
      },
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

export const logout = async ({ csrfToken }: { csrfToken: string }) => {
  console.log(csrfToken);
  try {
    const config = {
      withCredentials: true,
      headers: {
        "X-CSRFToken": csrfToken,
      },
    };

    const response = await clientApi({ csrfToken }).post(
      "http://127.0.0.1:8000/task-tracker/v1/user/logout/",
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

export const validateSession = async () => {
  try {
    const config = {
      withCredentials: true,
    };

    const response = await axios.get(
      "http://127.0.0.1:8000/task-tracker/v1/user/validate-session/",
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

export const getUsers = async ({ limit = 10, name = "", offset = 0 }) => {
  try {
    const config = {
      withCredentials: true,
    };

    const response = await axios.get(
      `http://127.0.0.1:8000/task-tracker/v1/user/users/?name=${name}&offset=${(offset - 1) * limit}&limit=${limit}`,
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

export const getUserById = async ({ id }) => {
  try {
    const config = {
      withCredentials: true,
    };

    const response = await axios.get(
      `http://127.0.0.1:8000/task-tracker/v1/user/users/${id}`,
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

export const confirmOnboardingProcess = async ({ csrfToken, formData }) => {
  try {
    const config = {
      withCredentials: true,
    };

    const response = await clientApi({ csrfToken }).put(
      "http://127.0.0.1:8000/task-tracker/v1/user/onboarding/",
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
