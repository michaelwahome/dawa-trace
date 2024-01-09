import HeroSection from '@/components/hero-section'
import Navbar from '@/components/home-navbar'
import CollapsibleNavbar from '@/components/home-collapsible-navbar'

const Home = () => {
  return (
    <>
      <CollapsibleNavbar />
      <Navbar />
      <HeroSection />
    </>
  )
}

export default Home;
