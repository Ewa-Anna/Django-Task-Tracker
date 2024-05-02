import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { images } from "../../constants";
import "react-datepicker/dist/react-datepicker.css";
import { GrAttachment } from "react-icons/gr";
import { ImGift } from "react-icons/im";
import { DiVim } from "react-icons/di";
import { IoTrashBinSharp } from "react-icons/io5";
import { useAccountStore } from "../../store";

const TicketForm: React.FC = ({
  ticket,
  projects,
  typeOptions,
  priorityOptions,
  users,
  handleSave,
  statusOptions,
  type,
}) => {
  const [deadlineDateError, setDeadlineDateError] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false);
  const csrfToken = useAccountStore((state) => state.csrfToken);

  console.log(ticket?.id);

  const {
    register,
    formState: { errors, isDirty },
    watch,
    getValues,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      project: ticket ? ticket?.project : "",
      title: ticket ? ticket?.title : "",
      description: ticket ? ticket?.description : "",
      priority: ticket ? ticket?.priority : "",
      status: ticket ? ticket?.status : "",
      type: ticket ? ticket?.type : "",
      attachments: ticket ? ticket?.attachments : "",
    },
  });

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const fileInputValue = watch("attachments")[0];

  const onSubmit = handleSubmit((data) => {
    const { project, title, description, type, priority, attachments } = data;

    const file = attachments[0];
    const formData = new FormData();

    if (ticket) {
      formData.append("ticketId", ticket?.id);
    }

    formData.append("title", title);
    formData.append("project", project);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("priority", priority);
    formData.append("attachments", file);

    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    handleSave({ csrfToken, formData });
  });

  const handleDateChange = (date) => {
    setValue("deadline", date);
    setIsDateSelected(true);
  };

  const handleFileChange = (): void => {
    setValue("attachments", "");
  };
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full  flex gap-9 flex-col lg:gap-y-12 mb-32"
    >
      <div className="">
        <label
          htmlFor="title"
          className="text-sm font-semibold text-gray-700 block mb-1.5"
        >
          Title
        </label>
        <input
          {...register("title", { required: "title is required" })}
          type="text"
          className="border rounded w-full py-3  lg:py-1.5 px-2 xl:py-1 font-normal"
          id="title"
          placeholder="here enter project title"
        />
        {errors.title && (
          <span className="text-rose-500 text-sm">{errors.title.message}</span>
        )}
      </div>

      {/* Project */}
      <div className="flex justify-between gap-10">
        <div className="flex-1">
          <span className="text-sm block font-semibold text-gray-700">
            Project
          </span>
          <select
            {...register("project", { required: "Please select project" })}
            name="project"
            id="project"
            className="w-full bg-gray-200 py-3 rounded custom-scrollbar"
          >
            {projects &&
              projects.map((project) => (
                <option key={project.id} value={project.id}>
                  (ID:{project?.id}) {project?.title}
                </option>
              ))}
          </select>
          {errors.project && (
            <span className="text-red-500 text-sm text-rose-500">
              {errors.project.message}
            </span>
          )}
        </div>
      </div>
      {/* Status && Person asign - Visible only on EDIT MODE  */}
      {type === "edit" && (
        <div className="flex  gap-10">
          <div className="flex-1">
            <span className="text-sm block font-semibold text-gray-700">
              Project
            </span>
            <select
              {...register("project", { required: "Please select project" })}
              name="owner"
              id="owner"
              className="w-full bg-gray-200 py-3 rounded"
            >
              {users &&
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user?.first_name} {user?.last_name}
                  </option>
                ))}
            </select>
            {errors.project && (
              <span className="text-red-500 text-sm text-rose-500">
                {errors.project.message}
              </span>
            )}
          </div>
          <div className="flex-1">
            <span className="text-sm block font-semibold text-gray-700">
              Project
            </span>
            <select
              {...register("project", { required: "Please select project" })}
              name="owner"
              id="owner"
              className="w-full bg-gray-200 py-3 rounded"
            >
              {users &&
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user?.first_name} {user?.last_name}
                  </option>
                ))}
            </select>
            {errors.project && (
              <span className="text-red-500 text-sm text-rose-500">
                {errors.project.message}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="">
        <label
          htmlFor="description"
          className="text-sm font-semibold text-gray-700 block mb-1.5"
        >
          Description
        </label>
        <textarea
          {...register("description", { required: "description is required" })}
          className="border rounded w-full py-3  lg:py-1.5 px-2 xl:py-1 font-normal custom-scrollbar"
          id="description"
          placeholder="here enter ticket description"
          rows={8}
        />
        {errors.description && (
          <span className="text-rose-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>

      {/* VISIBILITY */}

      <div>
        <span className="text-sm block font-semibold text-gray-700">
          Priority
        </span>
        <div className=" grid-row-5 gap-3 md:grid-cols-2 md:gap-3 lg:grid">
          {priorityOptions &&
            Object.entries(priorityOptions)
              .map(([key, value], index) => {
                return { id: index + 1, label: value, value: key };
              })
              .map(({ id, label, value }) => {
                return (
                  <label
                    key={id}
                    htmlFor={label}
                    className={`${
                      watch("priority") === value
                        ? " bg-blue-300 text-white font-bold"
                        : "bg-gray-200"
                    }  text-sm flex gap-1 text-gray-700 cursor-pointer  rounded p-4 mt-3 truncate md:mt-2`}
                  >
                    <input
                      {...register("priority", {
                        required: "Please select ticket priority",
                      })}
                      name="priority"
                      type="radio"
                      value={value}
                      id={label}
                      hidden={true}
                    />
                    {label}
                  </label>
                );
              })}
        </div>
        {errors.priority && (
          <span className="text-red-500 text-sm text-rose-500">
            {errors.priority.message}
          </span>
        )}
      </div>
      {/* TYPE */}
      <div>
        <span className="text-sm block font-semibold text-gray-700">Type</span>
        <div className=" grid-row-5 gap-3 md:grid-cols-2 md:gap-3 lg:grid">
          {typeOptions &&
            Object.entries(typeOptions)
              .map(([key, value], index) => {
                return { id: index + 1, label: value, value: key };
              })
              .map(({ id, label, value }) => {
                return (
                  <label
                    key={id}
                    htmlFor={label}
                    className={`${
                      watch("type") === value
                        ? " bg-blue-300 text-white font-bold"
                        : "bg-gray-200 "
                    }  text-sm flex gap-1 text-gray-700 cursor-pointer rounded p-4 mt-3 truncate md:mt-2`}
                  >
                    <input
                      {...register("type", {
                        required: "Please chose project type",
                      })}
                      name="type"
                      type="radio"
                      value={value}
                      id={label}
                      hidden={true}
                    />
                    {label}
                  </label>
                );
              })}
        </div>
        {errors.type && (
          <span className="text-red-500 text-sm text-rose-500">
            {errors.type.message}
          </span>
        )}
      </div>

      {/* Attachments */}
      <div className=" relative ">
        {fileInputValue && (
          <label htmlFor="postPicture" className="text-sm cursor-pointer">
            <div className="max-w-[150px] h-auto relative">
              {fileInputValue?.url ? (
                <img src={fileInputValue.url} alt="file" />
              ) : fileInputValue ? (
                <img src={URL.createObjectURL(fileInputValue)} alt="" />
              ) : (
                <span>No images</span>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white font-bold text-lg">
                  Click to change
                </span>
              </div>
            </div>
          </label>
        )}
        {!fileInputValue && (
          <>
            <label htmlFor="postPicture" className="text-sm cursor-pointer">
              <div className="bg-gray-200 border-slate-400 flex flex-col items-center py-5 rounded ">
                <span className="text-lg font-semibold text-slate-500">
                  Add file here
                </span>
                <GrAttachment className="w-9 h-auto text-slate-400" />
              </div>
            </label>

            <input
              {...register("attachments")}
              type="file"
              className=" mt-2  "
              id="postPicture"
              hidden={true}
            />
          </>
        )}
        {watch("attachments") && (
          <button
            type="button"
            onClick={handleFileChange}
            className="w-fit bg-red-500 text-rose-400 font-semibold rounded-lg px-2 py-1 mt-5
                      
                        "
          >
            Remove file
          </button>
        )}
      </div>

      <div className="flex justify-end">
        <button
          className="bg-violet-400 px-10 py-2 text-white 
                font-semibold rounded outline-none border-none hover:opacity-80"
        >
          Create project
        </button>
      </div>
    </form>
  );
};

export default TicketForm;
