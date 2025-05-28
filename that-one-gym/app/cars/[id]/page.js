export default async function CarPage({ params }) {
    const { id } = await params;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
            <h1 className="text-2xl font-bold">Car Details</h1>
            <p className="text-lg">Details for car with name: {id}</p>
            <p className="text-sm text-gray-500">More features coming soon!</p>
        </div>
    );
}