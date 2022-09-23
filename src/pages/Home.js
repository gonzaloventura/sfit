import React from 'react'
import Brands from '../components/Brands'
import LuckyWheel from '../components/LuckyWheel'
import FormContact from '../components/FormContact'

function Home() {
  return (
    <>
    <div className='title__sponsors'>
        <img className='important__brand' src={require('../assets/images/brands/santafeciudad.jpg')} alt="Santa Fe Ciudad" />
        <h2>Nos acompañan</h2>
        <Brands />
    </div>
    
    <div>
      <FormContact />
      <LuckyWheel />
    </div>
    </>
  )
}

export default Home