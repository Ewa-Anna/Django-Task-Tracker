import React from 'react'
import { useForm } from 'react-hook-form';

const ProjectForm: React.FC = ({ visibilityOptions, categories }) => {



    const { register, formState: { errors, isDirty }, watch, getValues } = useForm({
        defaultValues: {
            title: "",
            description: "",
            visibility: "",
            tags: [],
        }
    })

    const val = getValues()
    console.log(val)
    return (
        <form className='mx-auto w-full flex flex-col gap-y-8 ' >
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
                    placeholder="here enter post title"
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
                    placeholder="here enter post title"
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
                                        hidden='true'
                                    />
                                    {option?.name}
                                </label>
                            );
                        })}
                </div>
            </div>


            {/* Categories */}
            <div>
                <span className="text-sm block font-semibold text-gray-700">
                    Tags
                </span>
                <div className=" grid-row-5 gap-3 md:grid-cols-3 md:gap-3 lg:grid">
                    {categories &&
                        categories.map((category) => {

                            return (
                                <label
                                    htmlFor={category?.name}
                                    className="text-sm flex gap-1 text-gray-700 cursor-pointer bg-gray-200 rounded p-4 mt-3 truncate md:mt-2"
                                >
                                    <input
                                        type="checkbox"
                                        value={category?._id}
                                        id={category?.name}

                                    />
                                    {category?.name}
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
                        {categories &&
                            categories.map((category) => {

                                return (

                                    <option value="">
                                        {category?.name}
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
                        {categories &&
                            categories.map((category) => {

                                return (

                                    <option

                                        value={category.name}>
                                        {category?.name}
                                    </option>

                                );
                            })}
                    </select>
                </div>


            </div>
        </form>
    )
}

export default ProjectForm