'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const apiPath = process.env.NEXT_PUBLIC_BASEURLAPI

export default function Card({ roomname , roomId}) {
    const route = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (roomId, rating) => {
        setIsLoading(true)
        try {
            const res = await fetch(`${apiPath}/rate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify({roomId, rating})
                })
            if (res.ok) {
                route.push('/')
            } else {
                throw new Error('Failed to rate')
            }
        } catch (error){
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className="w-full h-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">ให้คะแนนความพึงพอใจ</h5>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">ประเมิน { roomname }</p>
        <ul className="my-4 space-y-3">
            <li>
                <a href="#" onClick={() => handleSubmit(roomId, 4)} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 11C15 13.038 12.761 15.5 10 15.5C7.239 15.5 5 13.038 5 11C5 12.444 15 12.444 15 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.06117 6.89466C7.05247 6.91839 7.04467 6.94243 7.03778 6.96675C7.0126 6.9658 6.9874 6.9658 6.96222 6.96675C6.95534 6.94243 6.94753 6.91839 6.93883 6.89466C6.95977 6.88062 6.98018 6.86579 7 6.85021C7.01982 6.86579 7.04023 6.88062 7.06117 6.89466ZM12.9622 6.96675C12.9553 6.94243 12.9475 6.91839 12.9388 6.89466C12.9598 6.88062 12.9802 6.86579 13 6.85021C13.0198 6.86579 13.0402 6.88062 13.0612 6.89466C13.0525 6.91839 13.0447 6.94243 13.0378 6.96675C13.0126 6.9658 12.9874 6.9658 12.9622 6.96675Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">ดีเยี่ยม</span>
                </a>
            </li>
            <li>
                <a href="#" onClick={() => handleSubmit(roomId, 3)} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">ดี</span>
                </a>
            </li>
            <li>
                <a href="#" onClick={() => handleSubmit(roomId, 2)} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 11C15 13.038 12.761 15.5 10 15.5C7.239 15.5 5 13.038 5 11C5 12.444 15 12.444 15 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" fill="currentColor"/>
                    <path d="M13.5 8C14.3284 8 15 7.32843 15 6.5C15 5.67157 14.3284 5 13.5 5C12.6716 5 12 5.67157 12 6.5C12 7.32843 12.6716 8 13.5 8Z" fill="currentColor"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">พอใช้</span>
                </a>
            </li>
            <li>
                <a href="#" onClick={() => handleSubmit(roomId, 1)} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 15C10.5304 15 11.0391 15.2107 11.4142 15.5858C11.7893 15.9609 12 16.4696 12 17H8C8 16.4696 8.21071 15.9609 8.58579 15.5858C8.96086 15.2107 9.46957 15 10 15Z" fill="currentColor"/>
                    <path d="M11.815 7H14.5C14.8094 7.00187 15.1149 6.93196 15.3927 6.79576C15.6704 6.65956 15.9128 6.46078 16.1007 6.21505C16.2887 5.96933 16.4171 5.68335 16.4758 5.37962C16.5345 5.07589 16.5219 4.76267 16.4391 4.46461C16.3563 4.16655 16.2055 3.89176 15.9985 3.66185C15.7915 3.43194 15.534 3.25319 15.2462 3.13963C14.9585 3.02608 14.6483 2.98083 14.3401 3.00745C14.0319 3.03406 13.734 3.1318 13.47 3.293C13.4877 3.19627 13.4977 3.0983 13.5 3C13.5017 2.59284 13.3787 2.19493 13.1474 1.85985C12.916 1.52478 12.5876 1.26863 12.2063 1.12591C11.825 0.983182 11.4091 0.960736 11.0146 1.06159C10.6201 1.16245 10.266 1.38176 10 1.69C9.73397 1.38176 9.37988 1.16245 8.98541 1.06159C8.59094 0.960736 8.17504 0.983182 7.79371 1.12591C7.41239 1.26863 7.08396 1.52478 6.85265 1.85985C6.62134 2.19493 6.49827 2.59284 6.5 3C6.50231 3.0983 6.51234 3.19627 6.53 3.293C6.26596 3.1318 5.96812 3.03406 5.65991 3.00745C5.35171 2.98083 5.04152 3.02608 4.75376 3.13963C4.466 3.25319 4.2085 3.43194 4.00151 3.66185C3.79453 3.89176 3.64369 4.16655 3.56088 4.46461C3.47806 4.76267 3.46551 5.07589 3.52423 5.37962C3.58294 5.68335 3.71131 5.96933 3.89925 6.21505C4.08719 6.46078 4.32956 6.65956 4.60732 6.79576C4.88508 6.93196 5.19065 7.00187 5.5 7H8.888M11.815 6.01499V9.24299M8.228 6.99999V9.27999M18.972 9.574C18.8671 9.95502 18.6401 10.2911 18.3258 10.5306C18.0114 10.7702 17.6272 10.8999 17.232 10.9C16.8281 10.9012 16.4345 10.7731 16.1086 10.5346C15.7828 10.296 15.5418 9.95937 15.421 9.574C15.2987 9.95819 15.0574 10.2935 14.7319 10.5315C14.4064 10.7695 14.0137 10.8977 13.6105 10.8977C13.2073 10.8977 12.8146 10.7695 12.4891 10.5315C12.1636 10.2935 11.9223 9.95819 11.8 9.574C11.6955 9.95694 11.4673 10.2946 11.151 10.5344C10.8347 10.7742 10.4479 10.9028 10.051 10.9C9.64027 10.9002 9.23963 10.7727 8.90458 10.5351C8.56954 10.2976 8.31667 9.96167 8.181 9.574C8.08341 9.95546 7.86093 10.2933 7.54902 10.5336C7.23712 10.7739 6.85374 10.9029 6.46 10.9C6.04517 10.8995 5.64039 10.7722 5.29992 10.5352C4.95944 10.2982 4.69953 9.96284 4.555 9.574C4.43288 9.95935 4.19103 10.2957 3.86462 10.5342C3.53821 10.7727 3.14424 10.9008 2.74 10.9C2.3448 10.8999 1.96055 10.7702 1.64623 10.5306C1.3319 10.2911 1.10487 9.95502 1 9.574V10C1 12.3869 1.94821 14.6761 3.63604 16.364C5.32387 18.0518 7.61305 19 10 19C12.3869 19 14.6761 18.0518 16.364 16.364C18.0518 14.6761 19 12.3869 19 10L18.972 9.574Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.5 14.5C8.05228 14.5 8.5 14.0523 8.5 13.5C8.5 12.9477 8.05228 12.5 7.5 12.5C6.94772 12.5 6.5 12.9477 6.5 13.5C6.5 14.0523 6.94772 14.5 7.5 14.5Z" fill="currentColor"/>
                    <path d="M12.5 14.5C13.0523 14.5 13.5 14.0523 13.5 13.5C13.5 12.9477 13.0523 12.5 12.5 12.5C11.9477 12.5 11.5 12.9477 11.5 13.5C11.5 14.0523 11.9477 14.5 12.5 14.5Z" fill="currentColor"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">ควรปรับปรุง</span>
                </a>
            </li>
        </ul>
        {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
                <p className='text-3xl text-center'>Loading...</p>
            </div>
        </div>
        )}
        <div>
            <a href="#" className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                ติดต่อ-แจ้งปัญหา : สำนักงานศูนย์แพทย์ศาสตร์ศึกษาชั้นคลินิกโรงพยาบาลหาดใหญ่
            </a>
        </div>
    </div>
  )
}
