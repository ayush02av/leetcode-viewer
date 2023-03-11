import { useState } from "react"
import { Link } from "react-router-dom"

export default function Home() {
    const [username, setUsername] = useState('')

    return (
        <div className="bg-blue-200 h-screen grid place-items-center">
            <div className="text-center">
                <h2 className="text-xl font-bolder">Welcome to</h2>
                <h1 className="text-4xl font-bold mb-5" style={{ textShadow: `0 10px 7px #fff` }}>Leetcode ViewR</h1>
                <h3 className="text-lg mb-10">Analysis, Suggestions &amp; Community</h3>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                    placeholder="Enter username to start"
                    className="px-3 py-2 m-3 rounded"
                />
                <Link
                    to={`/dashboard/${username}`}
                    className="bg-blue-500 text-white hover:bg-blue-700 px-3 py-2 rounded"
                >
                    Start
                </Link>
            </div>
        </div >
    )
}