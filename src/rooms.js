'use client'
import React, { useState, useEffect } from 'react'

const apiPath = process.env.NEXT_PUBLIC_BASEURLAPI
const basePath = process.env.NEXT_PUBLIC_BASEURL

const formatDate = dateString => {
    if (!dateString) {
        return ''
    }
    const date = new Date(dateString);
    const pad = num => String(num).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [sortedRooms, setSortedRooms] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortField, setSortField] = useState('name')
    const [sortDirection, setSortDirection] = useState('asc')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        setIsLoading(true)
        fetch(`${apiPath}/room`, { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                setRooms(data.rooms);
                setIsLoading(false)
            })
            .catch(error => {       
                console.log('Error loading data', error);
                setIsLoading(false)
            });
    }, []);

    const sortRooms = (field) => {
        const isAsc = sortField === field && sortDirection === 'asc'
        setSortDirection(isAsc ? 'desc' : 'asc')
        setSortField(field)
    }

    useEffect(() => {
        const sortRooms = () => {
            return [...rooms].sort((a,b) => {
            let valA = a[sortField]
            let valB = b[sortField]

            if (sortField === 'averageRating') {
                if (valA === 'No ratings yet' && valB === 'No ratings yet') return 0
                if (valA === 'No ratings yet') return 1
                if (valB === 'No ratings yet') return -1

                valA = parseFloat(valA)
                valB = parseFloat(valB)
            } else if(sortField === 'lastRatedAt') {
                valA = new Date(valA)
                valB = new Date(valB)
            }

            if (valA < valB) {
                return sortDirection === 'asc' ? -1 : 1
            }
            if (valA > valB) {
                return sortDirection === 'asc' ? 1: -1
            }
            return 0
        })
        }

        setSortedRooms(sortRooms)
    }, [sortField, sortDirection, rooms])

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
    if (isLoading) {
        return <div className='text-3xl text-center'>Loading...</div>
    }

    const getSortIndicator = (field) => {
        return sortField === field ? (sortDirection === 'asc' ? ' ↑':' ↓'): ''
    }
    
  return (
    <>
        <div className="relative m-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input
                type="search"
                id="search"
                className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder="ค้นหาชื่อห้อง"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            RoomId
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => sortRooms('name')}>
                            Name{getSortIndicator('name')}
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => sortRooms('averageRating')}>
                            Overall Rating{getSortIndicator('averageRating')}
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => sortRooms('lastRatedAt')}>
                            Last rated{getSortIndicator('lastRatedAt')}
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
                {sortedRooms.filter(room => searchTerm === '' || room.name.toLowerCase().includes(searchTerm.toLowerCase())).map(r => (
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
                                {r.averageRating !== 'No ratings yet' && (
                                    <a href='#' onClick={() => resetRating(r._id)}>
                                        <svg className="w-3.5 h-3.5 ms-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                    </a>
                                )}
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
