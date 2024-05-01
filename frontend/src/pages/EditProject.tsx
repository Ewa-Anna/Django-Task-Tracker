import React from "react";
import ProjectForm from "./forms/ProjectForm";
import {
  getProjectDetails,
  getTags,
  getVisibilityOptions,
  updateProject,
} from "../services/projectsApi";
import { FaEdit } from "react-icons/fa";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers } from "../services/userApi";
import toast from "react-hot-toast";

const EditProject: React.FC = () => {
  const { id } = useParams();
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const { data: project, isLoading: isProjectLoading } = useQuery({
    queryFn: () => getProjectDetails({ id }),
    queryKey: ["project", id],
  });

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
      return updateProject({
        csrfToken,
        formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["project", id]);
      toast.success("Project updated sucessfully");
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
          <FaEdit className="w-12 h-auto lg:w-9 lg:h-auto" /> Edit Project
          <span className="text-lg text-slate-500 font-base ml-2">
            I D: {id}
          </span>
        </h1>

        {project && tags && users && visibilityOptions && (
          <ProjectForm
            project={project}
            tags={tags}
            users={users?.results}
            visibilityOptions={visibilityOptions}
            isProjectLoading={isProjectLoading}
            handleSave={handleSave}
          />
        )}
      </section>
    </div>
  );
};

export default EditProject;
