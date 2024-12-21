import Hero from './sub-components/Hero'
import Timeline from './sub-components/Timeline'
import About from './sub-components/About'
import Skills from './sub-components/Skills'
import Apps from './sub-components/Apps'
import Contact from './sub-components/Contact'
import Portfolio from './sub-components/Portfolio'

const Home = () => {
  return (
    <div>
      <div className='bg-gray-900'>
        <Hero />
        <Timeline />
        <About />
        <Skills />
        <Apps />
        <Portfolio />
        <Contact />



      </div>
    </div>
  )
}

export default Home