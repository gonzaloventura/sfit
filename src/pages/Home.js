import React from 'react'
import Brands from '../components/Brands'
import LuckyWheel from '../components/LuckyWheel'
import FormContact from '../components/FormContact'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
    <div className='sponsors'>
    <img className='banner__sponsors' src={require('../assets/images/brands/sponsors.png')} alt="Santa Fe Ciudad" />
    </div>
    
    <div>
      <FormContact />
      <LuckyWheel />
    </div>
    <Footer />
    </>
  )
}

export default Home