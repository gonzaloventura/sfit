import React from 'react'
import Brands from '../components/Brands'
import LuckyWheel from '../components/LuckyWheel'
import FormContact from '../components/FormContact'

function Home() {
  return (
    <>
    <div className='title__sponsors'>
      <div>
        <img className='important__brand' src={require('../assets/images/brands/santafeciudad.jpg')} alt="Santa Fe Ciudad" />
      </div>
      <div>
        <h4>Nos acompañan</h4>
        <Brands />
      </div>
    </div>
    
    <div>
      <FormContact />
      <LuckyWheel />
    </div>
    </>
  )
}

export default Home