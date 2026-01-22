import GooeyNav from "./GooeyNav";
const items = [
  { label: "Home", href: "#home" },
  { label: "Sobre Mi", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Proyectos", href: "#projects" },
];
export default function Navbar_() {
  return (
    <nav className="bg-gray-800 p-3 pb-2 w-full h-auto">
      <div className="justify-center m-auto">
        <div>
          <div className="text-purple-500 font-bold text-xl mb-2 flex justify-center ">
            <span>🔰 HazuruDEV 🔰</span>
          </div>

          <div className="mx-auto flex justify-center items-center w-full flex-wrap m-auto">
            <div className="flex-wrap flex justify-center">
              <div className="">
                <GooeyNav
                  items={items}
                  particleCount={15}
                  particleDistances={[90, 10]}
                  particleR={100}
                  initialActiveIndex={0}
                  animationTime={600}
                  timeVariance={300}
                  colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                />

                {/* <a
                    href="#home"
                    className="text-purple-500 hover:text-white pr-3"
                  >
                    Home
                  </a>
                  <a
                    href="#about"
                    className="text-purple-500 hover:text-white px-3"
                  >
                    Sobre mi
                  </a> */}
              </div>
              {/* <div className="">
                <a
                  href="#projects"
                  className="text-purple-500 hover:text-white pr-3"
                >
                  Proyectos
                </a>
                <a
                  href="#contact"
                  className="text-purple-500 hover:text-white px-3 "
                >
                  Contacto
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
