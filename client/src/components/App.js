import React from 'react'

import NavBar from './NavBar'
import Footer from './Footer'
// import { Outlet } from 'react-router-dom'
import BlogTwo from '../pages/Blogs/BlogTwo'

const App = () => {
  return (
    <>
    <NavBar />
        {/* <Outlet /> */}
        <BlogTwo/>
    <Footer />
    </>
  )
}

export default App