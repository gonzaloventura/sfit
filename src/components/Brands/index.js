import React from 'react'
import './Brands.scss'

const Brands = () => {
  return (
    <div className='sponsors'>
            <img className='brand' src={require('../../assets/images/brands/milkaut.png')} alt="Milkaut" />
            <img className='brand' src={require('../../assets/images/brands/cerveceria.png')} alt="Cerveza Santa Fe" />
            <img className='brand' src={require('../../assets/images/brands/merengo.png')} alt="Merengo" />
            <img className='brand' src={require('../../assets/images/brands/tacural.png')} alt="Tacural" />
    </div>
  )
}

export default Brands