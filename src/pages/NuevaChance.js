import React from 'react'
import Follow from '../components/Follow'
import Brands from '../components/Brands'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <>
    <div className='nuevachance'>
        <h2>¿Querés ganar otro premio?</h2>
        <p>Solo debes seguir a las siguientes cuentas en Instagram</p>
        <div className='card__follow'>
            <Follow />
        </div>
        <div className='menu_buttons'>
        <Link to={'/'}><button className='spin-button'>Volver atrás</button></Link>
        <button className='spin-button disabled'>¡Nuevo Giro disponible!</button>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Home