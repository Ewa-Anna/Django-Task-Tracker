import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { images } from "../../constants";
import "react-datepicker/dist/react-datepicker.css";
import { GrAttachment } from "react-icons/gr";
import { ImGift } from "react-icons/im";
import { DiVim } from "react-icons/di";
import { IoTrashBinSharp } from "react-icons/io5";
import { useAccountStore } from "../../store";

const ProjectForm: React.FC = ({
  project,
  isProjectLoading,
  visibilityOptions,
  tags,
  users,
  handleSave,
}) => {
  const [deadlineDateError, setDeadlineDateError] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false);
  const csrfToken = useAccountStore((state) => state.csrfToken);

  const {
    register,
    formState: { errors, isDirty },
    getFieldState,
    watch,
    getValues,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      title: project ? project?.title : "",
      description: project ? project?.description : "",
      visibility: project ? project?.visibility : "",
      deadline: project ? project?.deadline : null,
      tags: project ? project?.tags : [],
      owner: project ? project?.owner.id : "",
      attachments: project ? project?.attachments : "",
      assignees: project ? project?.assignees : "",
    },
  });

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const fileInputValue = watch("attachments")[0];

  console.log(fileInputValue);

  const onSubmit = handleSubmit((data) => {
    const {
      title,
      description,
      deadline,
      owner,
      tags,
      visibility,
      assignees,
      attachments,
    } = data;

    const assigneesArray = [...assignees];
    const isoDeadline = new Date(deadline).toISOString();
    const file = attachments[0];
    const formData = new FormData();

    if (project) {
      const titleFieldState = getFieldState("title");
      const descriptionFieldState = getFieldState("description");
      const ownerFieldState = getFieldState("owner");
      const visibilityFieldState = getFieldState("visibility");
      const deadlineFieldState = getFieldState("deadline");
      const tagsFieldState = getFieldState("tags");
      const assigneesFieldState = getFieldState("assignees");
      const attachmentsFieldState = getFieldState("attachments");

      formData.append("id", project?.id);

      if (titleFieldState.isDirty) {
        formData.append("title", title);
      }

      if (descriptionFieldState.isDirty) {
        formData.append("description", description);
      }

      if (ownerFieldState.isDirty) {
        formData.append("owner", owner);
      }

      if (visibilityFieldState.isDirty) {
        formData.append("visibility", visibility);
      }
      if (deadlineFieldState.isDirty) {
        formData.append("deadline", deadline);
      }

      if (attachmentsFieldState.isDirty) {
        formData.append("attachments", attachments);
      }

      if (tagsFieldState.isDirty) {
        tags.forEach((tag) => {
          formData.append("tags", tag);
        });
      }

      if (assigneesFieldState.isDirty) {
        assignees.forEach((assigne) => {
          formData.append("assignees", assigne);
        });
      }
    } else {
      formData.append("title", title);
      formData.append("description", description);
      formData.append("deadline", isoDeadline);
      formData.append("owner", owner);
      formData.append("visibility", visibility);

      if (file) {
        formData.append("attachments", file);
      }

      tags.forEach((tag) => {
        formData.append("tags", tag);
      });

      assigneesArray.forEach((assigne) => {
        formData.append("assignees", assigne);
      });
    }

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

      <div className="">
        <label
          htmlFor="description"
          className="text-sm font-semibold text-gray-700 block mb-1.5"
        >
          Description
        </label>
        <textarea
          {...register("description", {
            required: "description is required",
          })}
          className="border rounded w-full py-3  lg:py-1.5 px-2 xl:py-1 font-normal custom-scrollbar"
          id="description"
          placeholder="here enter project description"
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
          Visibility
        </span>
        <div className=" grid-row-5 gap-3 md:grid-cols-2 md:gap-3 lg:grid">
          {visibilityOptions &&
            Object.entries(visibilityOptions)
              .map(([key, value], index) => {
                return { id: index + 1, label: value, value: key };
              })
              .map(({ id, label, value }) => {
                return (
                  <label
                    key={id}
                    htmlFor={label}
                    className={`${
                      watch("visibility") === value
                        ? " bg-[#a5b4fc] text-white font-bold"
                        : "bg-gray-200 "
                    }  text-sm flex gap-1 text-gray-700 cursor-pointer rounded p-4 mt-3 truncate md:mt-2`}
                  >
                    <input
                      {...register("visibility", {
                        required: "Please chose project type",
                      })}
                      name="visibility"
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
        {errors.visibility && (
          <span className="text-red-500 text-sm text-rose-500">
            {errors.visibility.message}
          </span>
        )}
      </div>

      {/* Tags */}
      <div>
        <span className="text-sm block font-semibold text-gray-700">Tags</span>
        <div className=" grid-row-5 gap-3 md:grid-cols-3 md:gap-3 lg:grid">
          {tags &&
            tags.map((tag) => {
              const id = tag?.id;
              const formTagsState = watch("tags");

              const isChecked =
                project && formTagsState.some((t) => t.id === id);

              return (
                <label
                  key={tag.id}
                  htmlFor={tag?.name}
                  className="text-sm flex gap-1 text-gray-700 cursor-pointer bg-gray-200 rounded p-4 mt-3 truncate md:mt-2"
                >
                  <input
                    {...register("tags", {
                      validate: (tags) => {
                        if (tags && tags.length > 0) return true;
                        else return "Atleast one tag is required";
                      },
                    })}
                    type="checkbox"
                    value={tag?.id}
                    id={tag?.name}
                    defaultChecked={isChecked}
                  />
                  {tag?.name}
                </label>
              );
            })}
        </div>
        {errors.tags && (
          <span className="text-red-500 text-sm text-rose-500">
            {errors.tags.message}
          </span>
        )}
      </div>

      {/* Leader */}
      <div className="flex justify-between gap-10">
        <div className="flex-1">
          <span className="text-sm block font-semibold text-gray-700">
            Project leader
          </span>
          <select
            {...register("owner", {
              required: "Please select project leader",
            })}
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
          {errors.owner && (
            <span className="text-red-500 text-sm text-rose-500">
              {errors.owner.message}
            </span>
          )}
        </div>
        <div className="flex-1">
          <span className="text-sm block font-semibold text-gray-700">
            Deadline date
          </span>
          <DatePicker
            startDate={watch("deadline")}
            selected={watch("deadline") ? watch("deadline") : null}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(date) => handleDateChange(date as Date)}
            selectsStart
            placeholderText="Check-in Date"
            className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />
          {deadlineDateError && (
            <span className="text-orange-600">{deadlineDateError}</span>
          )}
        </div>
      </div>

      {/* Contributors */}
      <div>
        <span className="text-sm block font-semibold text-gray-700">
          Members
        </span>
        <div className=" grid-row-5 gap-3 md:grid-cols-3 md:gap-3 lg:grid">
          {users &&
            users.map((user) => {
              const id = user?.id;
              const formAssigneesState = watch("assignees");
              const isChecked =
                project && formAssigneesState.some((t) => t.id === id);
              return (
                <label
                  key={user.id}
                  htmlFor={user?.id}
                  className="text-sm flex gap-1 text-gray-700 cursor-pointer bg-gray-200 rounded p-4 mt-3 truncate md:mt-2"
                >
                  <input
                    {...register("assignees", {
                      validate: (tags) => {
                        if (tags && tags.length > 0) return true;
                        else return "Atleast one project member is required";
                      },
                    })}
                    type="checkbox"
                    value={user?.id}
                    id={user?.id}
                    defaultChecked={isChecked}
                  />
                  {user?.first_name}
                </label>
              );
            })}
        </div>
        {errors.assignees && (
          <span className="text-red-500 text-sm text-rose-500">
            {errors.assignees.message}
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
        {fileInputValue && (
          <button
            type="button"
            onClick={handleFileChange}
            className="w-fit bg-red-500 text-rose-400 font-semibold rounded-lg px-2 py-1 mt-5"
          >
            Remove file
          </button>
        )}
      </div>

      <div className="flex justify-end">
        <button
          disabled={!isDirty}
          className="bg-violet-400 px-10 py-2 text-white 
                font-semibold rounded outline-none border-none hover:opacity-80"
        >
          {project ? "Save changes" : "Create Project"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
