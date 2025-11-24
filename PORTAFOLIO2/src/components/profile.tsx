import { MapPin } from 'lucide-react';
import { Mail } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Github } from 'lucide-react';
import { Linkedin } from 'lucide-react';

export default function Profile() {
    return (
        <div id='Home' className='flex flex-wrap justify-center m-0 items-center min-w-auto mb-3'>
            <span className='max-w-32  mt-6'>
                <img className='w-full rounded-full' src='https://avatars.githubusercontent.com/u/92418515?v=4' alt='GithubProfileIMG' />

            </span>
            <div className='flex flex-col gap-2 mt-7 mb-3 ml-7  '>
                <h1 className=' font-stretch-normal text-4xl w-fit'><strong>Moises A. Marcano (Hazuru)</strong> </h1>

                <h2 className=' text-3xl text-purple-500'>Full Stack Developer | Frontend Developer</h2>
                <div className='flex-row w-fit flex gap-2 items-center'>
                    <div><MapPin /></div> <div><h3 className='text-xl'>Caracas, Venezuela</h3></div>
                </div>
                <div className='flex flex-wrap w-fit mt-2 gap-2'>


                    <div className='flex-wrap flex items-center gap-3 h-max-8'>
                        <a href="mailto:HazuruCh@proton.me"><button className='hover:cursor-pointer hover:bg-purple-600   hover:outline-2 hover:outline-purple-500 hover:outline-offset-2px flex-wrap flex items-center gap-3 bg-accent rounded-4xl p-0.5 px-2 font-sans text-xl'><Mail /> HazuruCh@proton.me</button></a>


                    </div>
                    <div className='h-max-8 flex flex-wrap gap-1 w-max-auto'>

                        <a target='_blank' href="">
                            <button className='hover:cursor-pointer hover:outline-2 hover:border-accent flex-wrap flex items-center gap-3 bg-violet-950 border-2 border-purple-700 rounded-4xl p-1 px-2 font-sans text-xl'>
                                <FileText color={'oklch(62.7% 0.265 303.9)'} />
                            </button>
                        </a>

                        <a target='_blank' href="https://github.com/Hazuru00">
                            <button className='hover:cursor-pointer hover:outline-2 hover:border-accent flex-wrap flex items-center gap-3 bg-violet-950 border-2 border-purple-700 rounded-4xl p-1 px-2 font-sans text-xl'>
                                <Github color={'oklch(62.7% 0.265 303.9)'} />
                            </button>
                        </a>

                        <a target='_blank' href="https://www.linkedin.com/in/moises-marcano-b85363389">
                            <button className='hover:cursor-pointer hover:outline-2 hover:border-accent flex-wrap flex items-center gap-3 bg-violet-950 border-2 border-purple-700 rounded-4xl p-1 px-2 font-sans text-xl'>
                                <Linkedin color={'oklch(62.7% 0.265 303.9)'} />
                            </button>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}