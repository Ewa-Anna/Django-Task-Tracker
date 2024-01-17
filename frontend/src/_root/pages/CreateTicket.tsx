import TicketForm from '@/components/forms/TicketForm'
import { ImTicket } from "react-icons/im";
import React from 'react'

const CreateTicket = () => {
  return (
    <div className='flex flex-1'>

<div className='common-container'>

<div className='max-w-5xl flex-start gap-3 justify-center'>
<ImTicket className="w-10 h-10" />
  <h2 className='h3-bold md:h2-bold text-left w-full'>Create Ticket</h2>
</div>
<TicketForm />
</div>

    </div>
  )
}

export default CreateTicket