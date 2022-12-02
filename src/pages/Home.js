import React, {useState} from 'react'
import LuckyWheel from '../components/LuckyWheel'
import FormContact from '../components/FormContact'
import Footer from '../components/Footer'

function Home() {
  const [formData, setFormData] = useState({
    nombre: 'test',
    email:'test'
})


  
  return (
    <>
    <div className='sponsors'>
    <img className='banner__sponsors' src={require('../assets/images/brands/sponsors.png')} alt="Genomma Lab" />
    </div>
    <div>
      <LuckyWheel nombre={formData.nombre} email={formData.email} />
    </div>
    </>
  )
}

export default Home