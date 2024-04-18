import React from 'react'

const ErrorMessage: React.FC = ({ message }) => {
    return (
        <div className='flex items-center  justify-center w-full min-h-[calc(100vh-70px)] rounded-lg text-gray-900  mx-auto px-60 py-2 '>

            <p className='text-5xl font-semi-bold'>{message}</p>

        </div>
    )
}

export default ErrorMessage