import { AiOutlineLoading3Quarters } from "react-icons/ai"


const Loader = () => {
  return (
    <div className='flex-center w-full'>
  <div className="flex flex-col items-center gap-6">
        <AiOutlineLoading3Quarters color='white ' size={60} className='animate-spin'/>
     <h1 className="text-2xl text-slate-200 font-semibold ">
     Loading data...
 
      </h1>
  </div>
    </div>
  )
}

export default Loader