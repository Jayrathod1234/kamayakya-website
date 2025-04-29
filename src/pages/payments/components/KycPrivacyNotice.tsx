import React from 'react'

export default function KycPrivacyNotice() {
  return (
    <div className="p-3 bg-[#EFF7FF] border border-[#A6D3FF] rounded-lg flex items-center gap-x-[10px] mb-7">
          <img height={24} width={24} alt="info-icon" src="/info-fill.svg" />
          <p className=" m-0 text-xs">
            Your Aadhaar and PAN are collected securely for SEBI KYC compliance. They’re encrypted, masked, and never
            shared. Your data's privacy and security are our top priorities.
          </p>
        </div>
  )
}
