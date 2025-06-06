import React from 'react'

interface ISectionHead{
  sectionHead:string;
}

export default function SectionHead({sectionHead}:ISectionHead) {
  return (
    <p className=' text-lg font-semibold'>{sectionHead}</p>
  )
}
