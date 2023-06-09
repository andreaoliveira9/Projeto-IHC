import Navbar from '../Components/Navbar'
import HomeSearch from '../Components/HomeSearch'
import HomeCarousel from '../Components/HomeCarousel'
import useFetch from '../Hooks/useFetch';

function Home() {
  const { error, isPending, data: courses } = useFetch('http://localhost:3000/courses/');

  return (
    <div className='lili min-h-screen'>
        <header>
          <Navbar></Navbar>
        </header> 
        <main className='flex justify-center items-center mb-20 p-20 h-128 bg-cover bg-no-repeat shadow-xl dark-overlay'>
          {!isPending && <HomeSearch isPending={isPending} courses={courses}></HomeSearch>}
        </main>
        <div className='flex-auto text-center shadow-lg'>
                <p className='text-6xl font-bold'>Cursos Populares</p>
                <HomeCarousel isPending={isPending} courses={courses}></HomeCarousel>
        </div>
    </div>
  )
}

export default Home