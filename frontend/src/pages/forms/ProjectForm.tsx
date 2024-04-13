import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { images } from '../../constants';
import "react-datepicker/dist/react-datepicker.css"
import { GrAttachment } from "react-icons/gr";
import { ImGift } from 'react-icons/im';
import { DiVim } from 'react-icons/di';
import { IoTrashBinSharp } from "react-icons/io5";

const ProjectForm: React.FC = ({ visibilityOptions, tags, users, handleSave, }) => {

    const [deadlineDateError, setDeadlineDateError] = useState('')
    const [isDateSelected, setIsDateSelected] = useState(false);

    const { register, formState: { errors, isDirty }, watch, getValues, handleSubmit, setValue } = useForm({
        defaultValues: {
            title: "",
            description: "",
            visibility: "",
            tags: [],
            owner: "",
            deadline: "",
            attachments: "",
            assignees: [],

        }
    })



    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1)


    const fileInputValue = watch("attachments")[0]


    const onSubmit = handleSubmit((data) => {

        console.log(data)

        const {
            title,
            description,
            deadline,
            owner,
            tags,
            visibility,
            assignees,
            attachments } = data

        const isoDeadline = new Date(deadline).toISOString();
        const file = attachments[0]
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("deadline", isoDeadline);
        formData.append("owner", owner);
        formData.append("visibility", visibility);
        formData.append("attachments", file);

        tags.forEach((tag) => {
            formData.append('tags', tag)
        })

        assignees.forEach((assigne) => {
            formData.append('assignees', assigne)
        })

        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        handleSave({ formData })

    })

    const handleDateChange = (date) => {

        setValue('deadline', date);
        setIsDateSelected(true)
    };

    const handleFileChange = (): void => {
        setValue("attachments", "")
    }
    return (
        <form
            onSubmit={onSubmit}
            className='mx-auto w-full  flex gap-9 flex-col lg:gap-y-12 mb-32' >
            <div className="">
                <label
                    htmlFor="title"
                    className="text-sm font-semibold text-gray-700 block mb-1.5">
                    Title
                </label>
                <input
                    {...register("title", { required: "title is required" })}
                    type="text"
                    className="border rounded w-full py-3  lg:py-1.5 px-2 xl:py-1 font-normal"
                    id="title"
                    placeholder="here enter project title"
                />
                {errors.title && <span className='text-rose-500 text-sm'>{errors.title.message}</span>}
            </div>

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
                    placeholder="here enter project description"
                    rows={8}
                />
                {errors.description && <span className='text-rose-500 text-sm'>{errors.description.message}</span>}
            </div>

            {/* VISIBILITY */}

            <div>
                <span className="text-sm block font-semibold text-gray-700">
                    visibility
                </span>
                <div className=" grid-row-5 gap-3 md:grid-cols-2 md:gap-3 lg:grid">
                    {visibilityOptions && Object.entries(visibilityOptions).map(([key, value], index) => {
                        return { id: index + 1, label: value, value: key }
                    }).map(({ id, label, value }) => {
                        return (
                            <label
                                key={id}
                                htmlFor={label}
                                className={`${watch("visibility") === value && " bg-[#a5b4fc] text-white font-bold"
                                    }  text-sm flex gap-1 text-gray-700 cursor-pointer bg-gray-200 rounded p-4 mt-3 truncate md:mt-2`}
                            >
                                <input
                                    {...register("visibility", { required: "Please chose project type" })}
                                    name='visibility'
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
                {errors.visibility && <span className='text-red-500 text-sm text-rose-500'>{errors.visibility.message}</span>}
            </div>

            {/* Tags */}
            <div>
                <span className="text-sm block font-semibold text-gray-700">
                    Tags
                </span>
                <div className=" grid-row-5 gap-3 md:grid-cols-3 md:gap-3 lg:grid">
                    {tags &&
                        tags.map((tag) => {

                            return (
                                <label
                                    key={tag.id}
                                    htmlFor={tag?.name}
                                    className="text-sm flex gap-1 text-gray-700 cursor-pointer bg-gray-200 rounded p-4 mt-3 truncate md:mt-2"
                                >
                                    <input
                                        {...register("tags", {
                                            validate: (tags) => {
                                                if (tags && tags.length > 0)
                                                    return true;
                                                else return "Atleast one tag is required";
                                            },
                                        })}
                                        type="checkbox"
                                        value={tag?.id}
                                        id={tag?.name}
                                    />
                                    {tag?.name}
                                </label>
                            );
                        })}
                </div>
                {errors.tags && <span className='text-red-500 text-sm text-rose-500'>{errors.tags.message}</span>}
            </div>

            {/* Leader */}
            <div className="flex justify-between gap-10">
                <div className='flex-1'>
                    <span

                        className="text-sm block font-semibold text-gray-700">
                        Project leader
                    </span>
                    <select
                        {...register("owner", { required: "Please select project leader" })}
                        name="owner"
                        id="owner"
                        className='w-full bg-gray-200 py-3 rounded'
                    >
                        {users && users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user?.first_name} {user?.last_name}
                            </option>
                        ))}
                    </select>
                    {errors.owner && <span className='text-red-500 text-sm text-rose-500'>{errors.owner.message}</span>}
                </div>
                <div className='flex-1'>
                    <span

                        className="text-sm block font-semibold text-gray-700">
                        Deadline date
                    </span>
                    <DatePicker

                        minDate={minDate}
                        maxDate={maxDate}
                        onChange={(date) => handleDateChange(date as Date)}
                        selectsStart

                        placeholderText="Check-in Date"
                        className="min-w-full bg-white p-2 focus:outline-none"
                        wrapperClassName="min-w-full"
                    />
                    {deadlineDateError && <span className='text-orange-600'>{deadlineDateError}</span>}
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

                            return (
                                <label
                                    key={user.id}
                                    htmlFor={user?.id}
                                    className="text-sm flex gap-1 text-gray-700 cursor-pointer bg-gray-200 rounded p-4 mt-3 truncate md:mt-2"
                                >
                                    <input
                                        {...register("assignees", {
                                            validate: (tags) => {
                                                if (tags && tags.length > 0)
                                                    return true;
                                                else return "Atleast one project member is required";
                                            },
                                        })}
                                        type="checkbox"
                                        value={user?.id}
                                        id={user?.id}

                                    />
                                    {user?.first_name}
                                </label>
                            );
                        })}
                </div>
                {errors.assignees && <span className='text-red-500 text-sm text-rose-500'>{errors.assignees.message}</span>}
            </div>

            {/* Attachments */}
            <div className=' relative '>
                <label htmlFor="postPicture" className="text-sm cursor-pointer">
                    {watch("attachments") ? (
                        <div className="max-w-[150px] h-auto relative">
                            <img src={URL.createObjectURL(fileInputValue)} className='w-full h-full object-contain ' />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <span className="text-white font-bold text-lg">Click to change</span>
                            </div>
                        </div>
                    ) : (<div className='bg-gray-200  border-slate-400 flex flex-col items-center py-5 rounded '>
                        <span className='text-lg font-semibold text-slate-500'>Add file here</span>
                        <GrAttachment className='w-9 h-auto text-slate-400' />
                    </div>)}
                </label>
                <input
                    {...register("attachments")}
                    type="file"
                    className=" mt-2  "
                    id="postPicture"
                    hidden={true}
                />
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

            <div className='flex justify-end'>
                <button
                    className='bg-violet-400 px-10 py-2 text-white 
                font-semibold rounded outline-none border-none hover:opacity-80'>
                    Create project
                </button>
            </div>
        </form >
    )
}

export default ProjectForm