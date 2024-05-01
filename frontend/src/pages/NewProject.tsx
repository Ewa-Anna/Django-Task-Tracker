import React from "react";
import ProjectForm from "./forms/ProjectForm";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  createNewProject,
  getTags,
  getVisibilityOptions,
} from "../services/projectsApi";
import { getUsers } from "../services/userApi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NewProject: React.FC = () => {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const { data: tags } = useQuery({
    queryFn: () => getTags(),
    queryKey: ["tags"],
  });
  const { data: users } = useQuery({
    queryFn: () => getUsers({ limit: 100 }),
    queryKey: ["users"],
  });

  const { data: visibilityOptions } = useQuery({
    queryFn: () => getVisibilityOptions(),
    queryKey: ["visibilityOptions"],
  });

  const { mutate } = useMutation({
    mutationFn: ({ csrfToken, formData }) => {
      return createNewProject({
        csrfToken,
        formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      toast.success("Project Created successfully");
      navigate("/projects");
    },
    onError: (error) => {
      toast.error("Something went wrong...");
    },
  });

  const handleSave = ({ csrfToken, formData }) => {
    mutate({ csrfToken, formData });
  };

  return (
    <div className="common-container h-fit ">
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 md:max-w-3xl lg:gap-x-5 lg:max-w-5xl xl:max-w-4xl">
        <h1 className="pt-2 pb-10 h2-bold flex items-center justify-center gap-x-3 lg:justify-start lg:gap-x-2">
          <AiOutlineFundProjectionScreen className="w-12 h-auto lg:w-9 lg:h-auto" />{" "}
          New Project
        </h1>

        {visibilityOptions && tags && users && (
          <ProjectForm
            tags={tags}
            users={users?.results}
            visibilityOptions={visibilityOptions}
            handleSave={handleSave}
          />
        )}
      </section>
    </div>
  );
};

export default NewProject;
