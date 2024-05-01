import React from "react";
import ProjectForm from "./forms/ProjectForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewProject,
  getAllProjects,
  getTags,
  getVisibilityOptions,
} from "../services/projectsApi";
import { getUsers } from "../services/userApi";
import TicketForm from "./forms/TicketForm";
import {
  createNewTicket,
  getTicketPriorityOptions,
  getTicketTypeOptions,
} from "../services/ticketsApi";
import { PiTicketFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NewTicket: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: priorityOptions } = useQuery({
    queryFn: () => getTicketPriorityOptions(),
    queryKey: ["priorityOptions"],
  });
  const { data: users } = useQuery({
    queryFn: () => getUsers(),
    queryKey: ["users"],
  });

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => {
      return getAllProjects({ limit: 100 });
    },
    queryKey: ["projects"],
    refetchOnWindowFocus: false,
  });

  const { data: typeOptions } = useQuery({
    queryFn: () => getTicketTypeOptions(),
    queryKey: ["typeOptions"],
  });

  const { mutate } = useMutation({
    mutationFn: ({ csrfToken, formData }) => {
      return createNewTicket({
        csrfToken,
        formData,
      });
    },
    onSuccess: () => {
      toast.success("Ticket created sucessfully");
      queryClient.invalidateQueries(["tickets"]);
      navigate("/tickets");
    },
  });

  const handleSave = ({ csrfToken, formData }) => {
    mutate({ csrfToken, formData });
  };

  return (
    <div className="common-container h-fit ">
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 md:max-w-3xl lg:gap-x-5 lg:max-w-5xl xl:max-w-4xl">
        <h1 className="pt-2 pb-10 h2-bold flex items-center justify-center gap-x-3 lg:justify-start lg:gap-x-2">
          <PiTicketFill className="w-12 h-auto lg:w-9 lg:h-auto" />
          New Ticket
        </h1>
        {projects && typeOptions && priorityOptions && (
          <TicketForm
            projects={projects?.results}
            priorityOptions={priorityOptions}
            users={users?.results}
            typeOptions={typeOptions}
            handleSave={handleSave}
          />
        )}
      </section>
    </div>
  );
};

export default NewTicket;
