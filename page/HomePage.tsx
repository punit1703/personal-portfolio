import Navbar from '@/components/Navbar'
import ProjectCard from '@/components/ProjectCard'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import React from 'react'

function HomePage() {
  return (
   <>
   <Navbar/>
   <Hero/>
   <ProjectCard/>
   {/* <Footer/> */}
   </> 
  )
}

export default HomePage