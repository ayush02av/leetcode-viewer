export default function Header() {
    return (
        <nav className="px-2 sm:px-4 py-2.5 bg-gray-900">
            <div className="container flex flex-wrap items-center justify-evenly mx-auto">
                <a href="/" className="text-xl font-semibold text-white">
                    LeetcodeR
                </a>
                <div className="flex">
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5">Get started</button>
                </div>
            </div>
        </nav>
    )
}