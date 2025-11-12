import NavBar_ from './components/NavBar.tsx';
import { MapPin } from 'lucide-react';
import { Mail } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Github } from 'lucide-react';
import { Linkedin } from 'lucide-react';

import './App.css';
function App() {

  return (
    <>
       <div className='min-w-xl'>
          <NavBar_/>
          <div id='Home' className='papu flex justify-center m-auto mx-6 gap-6 items-center min-w-lg mb-3'>
            <span className='w-32 h-32 min-w-28 min-h-28'>
              <img className='w-full rounded-full ' src='https://avatars.githubusercontent.com/u/92418515?v=4' alt='GithubProfileIMG'/>

            </span>
            <div className='flex flex-col gap-2 m-7 mb-3'>
              <h1 className=' font-stretch-normal text-4xl'><strong>Moises A. Marcano (Hazuru)</strong> </h1>
              <h2 className=' text-3xl text-purple-500'>Full Stack Developer | Frontend Developer</h2>
              <div className='flex-row w-1/2 flex gap-2 items-center'>
                <div><MapPin /></div> <div><h3 className='text-xl'>Caracas, Venezuela</h3></div>
              </div>
              <div className='flex-row flex items-center gap-3 h-8'>
                <a href="mailto:HazuruCh@proton.me"><button  className='hover:cursor-pointer hover:bg-purple-600   hover:outline-2 hover:outline-purple-500 hover:outline-offset-2px flex-row flex items-center gap-3 bg-accent rounded-4xl p-0.5 px-2 font-sans text-xl'><Mail/> HazuruCh@proton.me</button></a>

                <a target='_blank' href="">
                  <button className='hover:cursor-pointer hover:outline-2 hover:border-accent flex-row flex items-center gap-3 bg-violet-950 border-2 border-purple-700 rounded-4xl p-1 px-2 font-sans text-xl'>
                    <FileText color={'oklch(62.7% 0.265 303.9)'}/>
                  </button>
                </a>

                <a target='_blank' href="https://github.com/Hazuru00">
                  <button className='hover:cursor-pointer hover:outline-2 hover:border-accent flex-row flex items-center gap-3 bg-violet-950 border-2 border-purple-700 rounded-4xl p-1 px-2 font-sans text-xl'>
                    <Github color={'oklch(62.7% 0.265 303.9)'}/>
                  </button>
                </a>

                <a target='_blank' href="https://www.linkedin.com/in/moises-marcano-b85363389">
                  <button className='hover:cursor-pointer hover:outline-2 hover:border-accent flex-row flex items-center gap-3 bg-violet-950 border-2 border-purple-700 rounded-4xl p-1 px-2 font-sans text-xl'>
                    <Linkedin color={'oklch(62.7% 0.265 303.9)'}/>
                  </button>
                </a>
              </div>

            </div>

          </div>

            <div className='gap-4 mx-60 mb-3'>

              <section className='section text-left'>
                <div>
                  <h2 className='text-3xl font-bold mb-3 '>Sobre mí</h2>
                  <p className=''>
                    Soy un desarrollador Full Stack con experiencia en la creación de aplicaciones web dinámicas y receptivas. Me especializo en tecnologías como React, Node.js y bases de datos SQL y NoSQL. Apasionado por aprender nuevas tecnologías y mejorar mis habilidades constantemente.
                  </p>
                </div>
              </section>


            </div>
            <div className='papu justify-center m-auto mx-60 gap-6 items-center min-w-xl'>
                <hr className='border-gray-700 ' />
            </div>

      
       </div>
    </>
  );
};

export default App