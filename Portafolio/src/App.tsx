import './App.css'
import NavBar_ from '../../PORTAFOLIO2/src/components/NavBar.tsx'
import { MapPin } from 'lucide-react';
import { Mail } from 'lucide-react';

function App() {

  return (
    <>
      <NavBar_/>
      <body className='bg-gray-950 text-white '>
        <div className='flex justify-center mx-6 gap-6 items-center'>
          <img className='min-w-32 max-w-32 min-h-32 max-h-32 rounded-full' src='https://avatars.githubusercontent.com/u/92418515?v=4' alt='GithubProfileIMG'/>
          <div className='flex flex-col gap-2 m-7'>
            <h1 className=' font-stretch-normal text-4xl'><strong>Moises A. Marcano (Hazuru)</strong> </h1>
            <h2 className=' text-3xl text-purple-500'>Full Stack Developer | Frontend Developer</h2>
            <div className='flex-row w-1/2 flex gap-2 items-center'>
               <div><MapPin /></div> <div><h3 className='text-xl'>Caracas, Venezuela</h3></div>
            </div>
            <div className='flex-row flex items-center gap-3 h-8'>
              <a href="mailto:HazuruCh@proton.me"><button  className='hover:cursor-pointer hover:bg-purple-600   hover:outline-2 hover:outline-white hover:outline-offset-2 flex-row flex items-center gap-3 bg-accent rounded-4xl p-0.5 px-2 font-sans text-xl'><Mail/> HazuruCh@proton.me</button></a>
            </div>

          </div>
        </div>

          <div className=' gap-4 mx-7 items-center'>
            <hr className='border-gray-700' />
            <h1 className='text-3xl font-bold'>Sobre mi</h1>
            <p className='text-xl text-gray-400'>I am a passionate and dedicated Full Stack Developer with a strong focus on frontend development. With a solid foundation in web technologies, I have honed my skills in creating dynamic and responsive user interfaces. My expertise lies in crafting seamless user experiences while ensuring the functionality and performance of web applications. I thrive in collaborative environments, where I can contribute my creativity and problem-solving abilities to deliver high-quality solutions.</p>
          </div>
      </body>
    </>
  );
};

export default App
