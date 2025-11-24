export default function Navbar_() {
    return (
        <nav className="bg-gray-800 p-4 pb-2 w-full h-auto">
            <div className="mx-auto flex justify-between items-center w-full flex-wrap">
                <div className="text-purple-500 font-bold text-xl mb-2 w-66 flex justify-center"><span>My Portfolio</span></div>
                <div className="flex-wrap flex justify-center">
                    <div className="">
                        <a href="#home" className="text-purple-500 hover:text-white pr-3">Home</a>
                        <a href="#about" className="text-purple-500 hover:text-white px-3">About</a>

                    </div>
                    <div className="">
                        <a href="#projects" className="text-purple-500 hover:text-white pr-3">Projects</a>
                        <a href="#contact" className="text-purple-500 hover:text-white px-3 ">Contact</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

