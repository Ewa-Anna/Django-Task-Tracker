import ProjectForm from "@/components/forms/projectForm/ProjectForm";
import PostForm from "@/components/forms/projectForm/ProjectForm";
import {
  getTags,
  getVisibilityOptions,
} from "@/features/project-api/project-api";
import { getUsers } from "@/features/user-api/user-api";
import React from "react";
import { useQuery } from "react-query";

const CreateProject = () => {
  const config = { refetchOnWindowFocus: false };

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery(["users"], () => getUsers(), config);
  const { data: visibilityOptions } = useQuery(
    ["visibilityOptions"],
    () => getVisibilityOptions(),
    config
  );
  const { data: tags } = useQuery(["tags"], () => getTags(), config);

  return (
    <div className="flex flex-1">
      <div className="common-container ">
        <div className="max-w-5xl w-full flex gap-3">
          <img
            src="/assets/icons/add-post.svg"
            alt="add"
            width={36}
            height={36}
          />
          <h2 className="h3-bold  md:h2-bold  w-full">Create Project</h2>
        </div>

        <ProjectForm
          users={users}
          visibilityOptions={visibilityOptions}
          tags={tags}
        />
      </div>
    </div>
  );
};

export default CreateProject;
