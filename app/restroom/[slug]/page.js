'use client'
import Card from "@/src/card"
import { useState, useEffect } from "react"

export default function Restroom({ params }) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (params.slug === 'm1') {
            setName('ห้องน้ำชายชั้น 1')
        } else if (params.slug === 'w1') {
            setName('ห้องน้ำหญิงชั้น 1')
        }
    }, [params.slug]);

    return (
        <div className="flex justify-center items-center min-h-screen p-2">
            <Card room={name} />
        </div>
    );
}