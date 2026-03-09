function Navbar() {
    return (
        <nav className="flex justify-between items-center px-10 py-5 bg-gray-900 text-white">
            <h1 className="text-2xl flow-root">Dinithi Imalsha Weerasinghe</h1>

            <ul className="flex gap-8">
                <li className="hover:text-blue-400 cursor-pointer">Home</li>
                <li className="hover:text-blue-400 cursor-pointer">About</li>
                <li className="hover:text-blue-400 cursor-pointer">Skills</li>
                <li className="hover:text-blue-400 cursor-pointer">Projects</li>
                <li className="hover:text-blue-400 cursor-pointer">Contact</li>
            </ul>
        </nav>
    );
}

export default Navbar;