import './App.css'
import NavBar_ from './components/NavBar.tsx'
function App() {

  return (
    <>
      <NavBar_/>
      <body className='bg-gray-950 text-white '>
        <div className='flex justify-center m-16'>
          <img className='w-32 rounded-full' src='https://avatars.githubusercontent.com/u/92418515?v=4' alt='GithubProfileIMG'/>
          <div className='flex flex-col gap-2'>
            <h1 className='font-black'>XD</h1>
          </div>
        </div>
      </body>
    </>
  );
};

export default App
