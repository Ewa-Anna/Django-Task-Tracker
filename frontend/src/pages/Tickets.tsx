import React, { useState } from 'react';
import MainLayout from '../components/MainLayout'
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '../services/projectsApi';
import ProjectCard from '../components/ProjectCard';
import ProjectsWrapper from '../components/ProjectsWrapper';
import { getAllTickets } from '../services/ticketsApi';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { BiErrorAlt } from "react-icons/bi";
import { MdOutlineWidgets } from "react-icons/md";

const Tickets: React.FC = () => {

    const token = localStorage.getItem("token")
    const [currentPage, setCurrentPage] = useState(1);

    const userString = localStorage.getItem("user")
    const { role } = JSON.parse(userString as string);


    const { data: tickets, isLoading, isError, isFetching } = useQuery({
        queryFn: () => {
            return getAllTickets({ token: token });
        },
        queryKey: ["tickets"],
        refetchOnWindowFocus: false
    });


    return (


        <div className='  common-container'>

            <div className="w-full mx-auto  px-10 py-8  ">

                <div className="flex flex-col gap-4 sm:flex-row justify-between py-2 px-16">
                    <h2 className="h1-bold text-center sm:text-left sm:h2-bold">Tickets</h2>
                    <div className="flex flex-col gap-8 py-2">
                        <form

                            className="flex mx-auto flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0 "
                        >
                            <div className=" relative ">
                                <input
                                    type="text"
                                    id='"form-subscribe-Filter'
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Category name..."

                                />
                            </div>
                            <button
                                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                                type="submit"
                            >
                                Filter
                            </button>
                        </form>

                        <Link
                            to={"/ticket/new"}
                            className='border-2 py-2 text-center bg-purple-500 text-white text-bold rounded-lg hover:opacity-85'

                        >
                            New ticket
                        </Link>
                    </div>
                </div>
                <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        Type
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        Created
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading || isFetching ? (
                                    <tr>
                                        <td className="text-center py-10 w-full" colSpan={5}>
                                            Loading...
                                        </td>
                                    </tr>
                                ) : tickets?.results?.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-10 w-full">
                                            No posts found
                                        </td>
                                    </tr>
                                ) : (
                                    tickets?.results?.map((ticket) => {
                                        return (
                                            <tr>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <div className="flex items-center">

                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {ticket?.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <div className="flex flex-col gap-x-1.5 gap-y-1.5 flex-wrap">

                                                        <p className="text-gray-900 whitespace-no-wrap text-xs">
                                                            {ticket?.status}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    {ticket?.type === "question" &&
                                                        <div className='flex items-center gap-x-1 border-2 w-fit px-1.5 py-0.5 rounded-lg bg-blue-100'>
                                                            <BsFillQuestionCircleFill className='w-5 h-auto' color='teal' />
                                                            <p className="text-gray-900 whitespace-no-wrap text-xs font-semibold ">

                                                                {ticket?.type}
                                                            </p>
                                                        </div>}
                                                    {ticket?.type === "bug" &&
                                                        <div className='flex items-center gap-x-1 border-2 w-fit px-2 py-0.5 rounded-lg bg-rose-300'>
                                                            <BiErrorAlt className='w-5 h-auto' color='red' />
                                                            <p className="text-rose-800 whitespace-no-wrap text-xs font-semibold ">

                                                                {ticket?.type}
                                                            </p>
                                                        </div>}
                                                    {ticket?.type === "feature" &&
                                                        <div className='flex items-center gap-x-1 border-2 w-fit px-1.5 py-0.5 rounded-lg bg-violet-300'>
                                                            <MdOutlineWidgets className='w-5 h-auto' color='purple' />
                                                            <p className="text-purple-800 whitespace-no-wrap text-xs font-semibold ">

                                                                feature
                                                            </p>
                                                        </div>}

                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <div className="flex gap-x-1.5 gap-y-1.5 flex-wrap">

                                                        {new Date(ticket?.created).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )}

                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">

                                                    <Link
                                                        to={`/ticket/${ticket.id}`}
                                                        className="text-green-600 hover:text-green-900"
                                                    >
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>

                        <div className='border-2  flex justify-center'>

                        </div>
                    </div>
                </div>

            </div>

        </div>


    )
}

export default Tickets