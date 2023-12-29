'use client'
import React, { useState, useEffect } from 'react'

const apiPath = process.env.NEXT_PUBLIC_BASEURLAPI
const basePath = process.env.NEXT_PUBLIC_BASEURL

const formatDate = dateString => {
    const date = new Date(dateString);
    const pad = num => String(num).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export default function Rooms() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch(`${apiPath}/room`, { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                setRooms(data.rooms);
            })
            .catch(error => {
                console.log('Error loading data', error);
            });
    }, []);

    const resetRating = async (roomId) => {
        const confirmReset = window.confirm('ยืนยันลบคะแนนทั้งหมด!')
        if (!confirmReset) return
        try {
            const res = await fetch(`${apiPath}/resetRating`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify({roomId})
                })
            if (res.ok) {
                window.location.reload()
            } else {
                throw new Error('Failed to reset')
            }
        } catch (error){
            console.log(error)
        }
    }

    const deleteRoom = async (roomId) => {
        const confirmDelete = window.confirm('ยืนยันลบห้องและคะแนนทั้งหมด')
        if (!confirmDelete) return
        
        try {
            const res = await fetch(`${apiPath}/deleteRoom?id=${roomId}`, {
                method: "DELETE"
            })

            if (res.ok) {
                setRooms(rooms.filter(room => room._id !== roomId))
            } else {
                throw new Error('Failed to delete room')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            RoomId
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Overall Rating
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Last rated
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Link to rate
                        </th>
                        <th scope="col" className="px-6 py-3">
                            QR Code
                        </th>
                    </tr>
                </thead>
                <tbody>
                {rooms.map(r => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={r._id}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {r._id}
                        </th>
                        <td className="px-6 py-4">
                            <div className='flex'>
                            {r.name}
                            <a href='#' onClick={() => deleteRoom(r._id)}>
                                    <svg className="w-3.5 h-3.5 ms-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                </a>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className='flex items-start'>
                                {r.averageRating}
                                <a href='#' onClick={() => resetRating(r._id)}>
                                    <svg className="w-3.5 h-3.5 ms-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                </a>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            {formatDate(r.lastRatedAt)}
                        </td>
                        <td className="px-6 py-4 text-left">
                            <a href={`${basePath}/restroom/${r._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{`${basePath}/restroom/${r._id}`}</a>
                        </td>
                        <td className='px-6 py-4 text-left'>
                            <a href={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${basePath}/restroom/${r._id}`}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                                </svg>
                            </a>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}
