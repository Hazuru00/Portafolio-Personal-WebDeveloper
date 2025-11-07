export default function Navbar_() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-purple-500 font-bold text-xl">My Portfolio</div>
                <div>
                    <a href="#home" className="text-purple-500 hover:text-white px-3">Home</a>
                    <a href="#about" className="text-purple-500 hover:text-white px-3">About</a>
                    <a href="#projects" className="text-purple-500 hover:text-white px-3">Projects</a>
                    <a href="#contact" className="text-purple-500 hover:text-white px-3">Contact</a>
                </div>
            </div>
        </nav>
    );
};

