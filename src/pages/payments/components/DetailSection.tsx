import { ArrowLeft } from 'lucide-react'
import React from 'react'

export default function DetailSection() {
  return (
    <div className=' mt-9'>
      <div className='flex items-center'>
        <ArrowLeft size={18}/>
        <p className=' ml-[5px] text-xs text-gray-600'>Go Back to Previous Page</p>
      </div>
    </div>
  )
}
