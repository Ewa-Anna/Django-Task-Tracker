import React, { useEffect } from 'react'
import {useNavigate } from 'react-router-dom'

const ErrorPage = () => {




  return (
    <div className=' px-10 w-full h-full flex flex-col items-center justify-center gap-4 flex-wrap'>
        <h1 className='text-3xl'>
        Something went wrong...
      
        </h1>
        <span className='text-slate-400 '>Try refreshing the page, or going back.If this problem persists, contact us.</span>
    </div>
  )
}

export default ErrorPage