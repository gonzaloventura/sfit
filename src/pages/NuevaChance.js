import React from 'react'
import Follow from '../components/Follow'
import Brands from '../components/Brands'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
    <div className='nuevachance'>
        <h2>¿Querés ganar otro premio?</h2>
        <p>Solo debes seguir a las siguientes cuentas en Instagram</p>
        <div className='card__follow'>
            <Follow />
        </div>
        <button disabled className='spin-button'>¡Nuevo Giro disponible!</button>
    </div>
    <Footer />
    </>
  )
}

export default Home