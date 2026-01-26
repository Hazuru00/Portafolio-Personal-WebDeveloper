import GooeyNav from "./GooeyNav";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
const items = [
  { label: "Home", href: "#home" },
  { label: "Sobre Mi", href: "#about" },
];
const items2 = [
  { label: "Contact", href: "#contact" },
  { label: "Proyectos", href: "#projects" },
];



export default function Navbar_() {
  const [isOpen, setIsOpen] = useState(false);
  function ToggleNavbar() {
    return setIsOpen(!isOpen);
  }

  return (
    <motion.nav
      className="bg-gray-800 p-3 pb-2 w-full h-auto fixed top-0 z-50"
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        transform: { type: "spring", stiffness: 100 },
      }}
    >
      <div className="justify-center m-auto">
        <div>
          <div className="text-purple-500 font-bold text-xl mb-2 flex justify-center ">
            <span>🔰 HazuruDEV 🔰</span>
          </div>
          <motion.span
            className="shadow-none cursor-pointer justify-center self-center m-auto flex justify-self-center"
            onClick={ToggleNavbar}
          >
            <AnimatePresence>
              {isOpen ? (
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                      fill="#ffffff"
                    ></path>{" "}
                  </g>
                </motion.svg>
              ) : (
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.7071 9.29289C12.3166 8.90237 11.6834 8.90237 11.2929 9.29289L6.29289 14.2929C5.90237 14.6834 5.90237 15.3166 6.29289 15.7071C6.68342 16.0976 7.31658 16.0976 7.70711 15.7071L12 11.4142L16.2929 15.7071C16.6834 16.0976 17.3166 16.0976 17.7071 15.7071C18.0976 15.3166 18.0976 14.6834 17.7071 14.2929L12.7071 9.29289Z"
                      fill="#ffffff"
                    ></path>{" "}
                  </g>
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.span>
          <div className="mx-auto flex justify-center items-center w-full flex-wrap m-auto">
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  className="flex-wrap flex justify-center"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="px-3 w-auto">
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
                  </div>
                  <div className="px-3 w-auto">
                    <GooeyNav
                      items={items2}
                      particleCount={15}
                      particleDistances={[90, 10]}
                      particleR={100}
                      initialActiveIndex={1}
                      animationTime={600}
                      timeVariance={300}
                      colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                    />
                  </div>

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
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
