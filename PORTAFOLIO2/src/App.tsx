//Components
import NavBar_ from './components/NavBar.tsx';
import Profile from './components/profile.tsx';
import Tecnologias from './components/Tecnologias.tsx'
import "./App.css"

import { motion } from "motion/react"
import { SpeedInsights } from '@vercel/speed-insights/react';


//import { MapPin } from 'lucide-react';
//import { Mail } from 'lucide-react';
//import { FileText } from 'lucide-react';
//import { Github } from 'lucide-react';
//import { Linkedin } from 'lucide-react';

import './App.css';
function App() {

  return (
    <>
      <motion.header className=' w-full bg-gray-800 '
        initial={{ y: -250, paddingTop: 'auto', height: 0 }}
        animate={{ y: 0, height: 'auto', paddingTop: '0px' }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 40, width: { duration: 0.5 }, paddingTop: { duration: 2 } }}
      >
        <NavBar_ />
      </motion.header>
      <Profile />


      <motion.hr className='border-gray-700  justify-center m-auto'
        initial={{ width: 0, maxWidth: 700 }}
        animate={{ width: '100%', maxWidth: 450 }}
        transition={{ duration: 1, delay: 1.5, type: 'spring', stiffness: 50 }} />

      <motion.div className='papu flex flex-col justify-center m-auto gap-6 items-center max-w-lg mb-3'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2, type: 'spring', stiffness: 50 }}
      >
        <Tecnologias />
      </motion.div>
      
      <motion.hr className='border-gray-700  justify-center m-auto'
        initial={{ width: 0, maxWidth: 700 }}
        animate={{ width: '100%', maxWidth: 450 }}
        transition={{ duration: 1, delay: 2.5, type: 'spring', stiffness: 50 }} 
      />
      <motion.div className='flex flex-col justify-center m-auto gap-6 items-center max-w-lg mb-3 p-2.5'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2, type: 'spring', stiffness: 50 }}
      >
        <section>
          <div>
            <h2 className='justicenter items-center m-auto text-center'>Sobre mi</h2>
          </div>
        
          <div>
            
            <p className='text-justify'>Soy un desarrollador web apasionado me encanta crear experiencias atractivas y interactivas para los usuarios. Me especializo en el desarrollo frontend, utilizando tecnologías como React, TypeScript y CSS para construir interfaces de usuario modernas y receptivas. Tambien tengo conocimientos en backend con Node.js y bases de datos como MongoDB. Disfruto trabajando en proyectos desafiantes que me permitan aprender y crecer como desarrollador. Siempre estoy buscando nuevas oportunidades para colaborar y contribuir a proyectos emocionantes.</p>
          </div>
        </section>
      </motion.div>
      <SpeedInsights />

    </>

  );
};

export default App