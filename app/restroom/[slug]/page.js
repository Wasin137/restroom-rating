import Card from "@/src/card"

const apiPath = process.env.NEXT_PUBLIC_BASEURLAPI

const getRoomName = async (id) => {
    try {
        const res = await fetch(`${apiPath}/roomname?id=${id}`, {
            cache: 'no-store',
        })
        if(!res.ok) {
            throw new Error('Failed to fetch rooms')
        }

        return res.json()
    } catch(error){
        console.log('Error loading data', error)
    }
}

export default async function Restroom({ params }) {
    const room = await getRoomName(params.slug)

    return (
        <div className="flex justify-center items-center min-h-screen p-2">
            <Card roomname={room.name} roomId={room._id}/>
        </div>
    );
}