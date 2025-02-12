import React from 'react'

import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'

const Layout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout