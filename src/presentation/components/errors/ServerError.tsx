import { useLocation } from "react-router"

export default function ServerError() { 

    const { state } = useLocation();

    document.title = `${state.status} - Page not found.`;

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-red-600">{state.status} - {state.error?.status}</h1>
            <p className="mt-4 text-lg text-gray-700">{state.error?.response}</p>
        </div>
    )
}