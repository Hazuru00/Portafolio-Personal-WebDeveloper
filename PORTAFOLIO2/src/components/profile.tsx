import { MapPin } from 'lucide-react';
import { Mail } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Github } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { motion } from "motion/react"


export default function Profile() {
    return (
      <div
        id="Home"
        className="flex flex-wrap justify-center m-0 items-center min-w-auto mb-3"
      >
        <span className="max-w-32  mt-6">
          <motion.img
            drag={true}
            className="w-full rounded-full z-20"
            src="https://avatars.githubusercontent.com/u/92418515?v=4"
            alt="GithubProfileIMG"
            initial={{ scale: 0, rotate: 50 }}
            animate={{
              scale: 1,
              rotate: 0,
              boxShadow: "0px 0px 8px 2px oklch(62.7% 0.265 303.9)",
              x: 0,
            }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              x: { ease: "easeInOut", delay: 0.5, duration: 0.2 },
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px 4px oklch(62.7% 0.265 303.9)",
            }}
            whileDrag={{
              boxShadow: "0px 0px 20px 4px oklch(62.7% 0.265 303.9)",
            }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
            whileInView={{
              scale: 1.1,
              rotate: 0,
              boxShadow: "0px 0px 8px 2px oklch(62.7% 0.265 303.9)",
            }}
            dragConstraints={{ top: -0, left: -0, right: -0, bottom: 0 }}
            viewport={{
              once: false, // <--- Esto hace que se repita siempre
              amount: 0.5, // <--- Se activa cuando el 50% del elemento es visible
            }}
          />{" "}
          <br />
          <div
            className="text-center mx-auto w-full text-gray-600
          "
          >
            <motion.div
              initial={{ scale: 1, opacity: 0, }}
              animate={{
                translateY: [0, -15, -30], // Sube de forma fluida
                opacity: [0, 1, 0], // Aparece en el medio y desaparece al final
                rotate: [-10, 5, 12, -5], // Va tambaleándose mientras sube
              }}
              transition={{
                delay: 2.5,
                duration: 3, // Un poco más de tiempo para que se aprecie el "vuelo"
                repeat: Infinity,
                ease: "easeOut",
                repeatDelay: 1,
              }}
            >
              <p className="select-none pointer-events-none">Arrastrame</p>
            </motion.div>
          </div>
        </span>
        <motion.div
          className="flex flex-col gap-2 mt-7 mb-3 ml-7 mr-7"
          animate={{ opacity: 1, y: 0, x: 0 }}
          initial={{ opacity: 0, y: -50, x: 700 }}
          transition={{
            duration: 0.2,
            delay: 0.5,
            type: "spring",
            stiffness: 50,
            x: { ease: "easeOut", delay: 1, duration: 0.5 },
            opacity: { delay: 1, duration: 1.5 },
          }}
        >
          <h1 className=" font-stretch-normal text-4xl w-fit">
            <strong>Moises A. Marcano (Hazuru)</strong>{" "}
          </h1>

          <h2 className=" text-3xl text-purple-500">
            Full Stack Developer | Frontend Developer
          </h2>
          <div className="flex-row w-fit flex gap-2 items-center">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ translateY: [0, -10, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.8,
              }}
            >
              <MapPin />
            </motion.div>{" "}
            <div>
              <h3 className="text-xl">Caracas, Venezuela</h3>
            </div>
          </div>
          <div className="flex flex-wrap w-fit mt-2 gap-2">
            <div className="flex-wrap flex items-center gap-3 h-max-8">
              <motion.a
                href="mailto:dev.moisesmarcano@gmail.com"
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="hover:cursor-pointer hover:bg-purple-600   hover:outline-2 hover:outline-purple-500 hover:outline-offset-2px flex-wrap flex items-center gap-3 bg-accent rounded-4xl p-0.5 px-2 font-sans text-xl pr-1">
                  <Mail />
                  Mi correo de contacto
                </button>
              </motion.a>
            </div>
            <div className="h-max-8 flex flex-wrap gap-1 w-max-auto">
              <motion.a
                target="_blank"
                href=""
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="hover:cursor-pointer hover:outline-2 hover:border-accent flex-wrap flex items-center gap-3 bg-violet-950 border-2 border-purple-700 rounded-4xl p-1 px-2 font-sans text-xl">
                  <FileText color={"oklch(62.7% 0.265 303.9)"} />
                </button>
              </motion.a>

              <motion.a
                target="_blank"
                href="https://github.com/Hazuru00"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="hover:cursor-pointer hover:outline-2 hover:border-accent flex-wrap flex items-center gap-3 bg-violet-950 border-2 border-purple-700 rounded-4xl p-1 px-2 font-sans text-xl">
                  <Github color={"oklch(62.7% 0.265 303.9)"} />
                </button>
              </motion.a>

              <motion.a
                target="_blank"
                href="https://www.linkedin.com/in/moises-marcano-b85363389"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="hover:cursor-pointer hover:outline-2 hover:border-accent flex-wrap flex items-center gap-3 bg-violet-950 border-2 border-purple-700 rounded-4xl p-1 px-2 font-sans text-xl">
                  <Linkedin color={"oklch(62.7% 0.265 303.9)"} />
                </button>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    );
}