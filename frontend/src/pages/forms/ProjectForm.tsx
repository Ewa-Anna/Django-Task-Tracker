import React from 'react'
import { useForm } from 'react-hook-form';
import { images } from '../../constants';

const ProjectForm: React.FC = ({ visibilityOptions, tags, users }) => {



    const { register, formState: { errors, isDirty }, watch, getValues } = useForm({
        defaultValues: {
            title: "",
            description: "",
            visibility: "",
            tags: [],
            owner: "",
            deadline: "",
            assignees: []
        }
    })

    const val = getValues()
    console.log(val)
    return (
        <form className='mx-auto w-full  flex gap-9 flex-col lg:gap-y-12 mb-32' >
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
                {errors.title && <span>{errors.title.message}</span>}
            </div>

            <div className="">
                <label
                    htmlFor="description"
                    className="text-sm font-semibold text-gray-700 block mb-1.5"
                >
                    Description
                </label>
                <textarea


                    className="border rounded w-full py-3  lg:py-1.5 px-2 xl:py-1 font-normal custom-scrollbar"
                    id="description"
                    placeholder="here enter project description"
                    rows={8}
                />
                {errors.description && <span>{errors.description.message}</span>}
            </div>

            {/* VISIBILITY */}

            <div>
                <span className="text-sm block font-semibold text-gray-700">
                    visibility
                </span>
                <div className=" grid-row-5 gap-3 md:grid-cols-2 md:gap-3 lg:grid">
                    {visibilityOptions &&
                        visibilityOptions.map((option, index) => {
                            return (
                                <label
                                    key={index}
                                    htmlFor={option?.name}
                                    className={`${watch("visibility") === option.value && " bg-blue-300 text-white font-bold"
                                        }  text-sm flex gap-1 text-gray-700 cursor-pointer bg-gray-200 rounded p-4 mt-3 truncate md:mt-2`}
                                >
                                    <input
                                        {...register("visibility")}
                                        name='visibility'
                                        type="radio"
                                        value={option?.value}
                                        id={option?.name}
                                        hidden={true}
                                    />
                                    {option?.name}
                                </label>
                            );
                        })}
                </div>
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
                                        type="checkbox"
                                        value={tag?.id}
                                        id={tag?.name}

                                    />
                                    {tag?.name}
                                </label>
                            );
                        })}
                </div>

            </div>

            {/* Leader */}
            <div className="flex justify-between gap-10">
                <div className='flex-1'>
                    <span

                        className="text-sm block font-semibold text-gray-700">
                        Project leader
                    </span>
                    <select name="" id='owner' className='w-full bg-gray-200 py-3 rounded' >
                        {users &&
                            users.map((user) => {

                                return (

                                    <option
                                        key={user.id}
                                        value={user.id}>
                                        {user?.first_name}{user?.last_name}
                                    </option>

                                );
                            })}
                    </select>
                </div>
                <div className='flex-1'>
                    <span

                        className="text-sm block font-semibold text-gray-700">
                        Deadline date
                    </span>
                    <select name="" id='owner' className='w-full bg-gray-200 py-3 rounded ' >
                        {users &&
                            users.map((user) => {

                                return (

                                    <option
                                        key={user.id}
                                        value={user.id}>

                                        {user?.first_name}
                                    </option>

                                );
                            })}
                    </select>
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
                                        type="checkbox"
                                        value={user?.id}
                                        id={user?.id}

                                    />
                                    {user?.first_name}
                                </label>
                            );
                        })}
                </div>

            </div>
            <div className='flex justify-end'>
                <button
                    className='bg-violet-400 px-10 py-2 text-white 
                font-semibold rounded outline-none border-none hover:opacity-80'>
                    Create project
                </button>
            </div>
        </form>
    )
}

export default ProjectForm