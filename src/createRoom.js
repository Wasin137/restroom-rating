'use client'
import React ,{useState} from 'react'

const apiPath = process.env.NEXT_PUBLIC_BASEURLAPI

export default function CreateRoom() {
    const [name, setName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!name){
            alert('กรุณาระบุชื่อห้อง')
        }

        try {
            const res = await fetch(`${apiPath}/room`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify({name})
                })
            if (res.ok) {
                window.location.reload()
            } else {
                throw new Error('Failed to create newroom')
            }
        } catch (error){
            console.log(error)
        }
    }
  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto border border-gray-300 rounded-lg p-4 mb-3">
        <div className="mb-2">
            <label for="restroom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เพิ่มห้องน้ำ</label>
            <input type="text" id="restroom" onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ชื่อห้องน้ำ" required />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">เพิ่มห้องน้ำ</button>
    </form>
  )
}
