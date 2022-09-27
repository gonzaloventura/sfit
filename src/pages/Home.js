import React, {useState} from 'react'
import Brands from '../components/Brands'
import LuckyWheel from '../components/LuckyWheel'
import FormContact from '../components/FormContact'
import Footer from '../components/Footer'

function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    email:''
})

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
}

  
  return (
    <>
    <div className='sponsors'>
    <img className='banner__sponsors' src={require('../assets/images/brands/sponsors.png')} alt="Santa Fe Ciudad" />
    </div>
    
    <div>
    <div>
        <form>
            <input id='name' name='nombre' type="text" onChange={handleChange} placeholder='Nombre' />
            <input id='email' name='email' type="text" onChange={handleChange} placeholder='Correo electrónico' />
        </form>
    </div>
      <LuckyWheel nombre={formData.nombre} email={formData.email} />
    </div>
    <Footer />
    </>
  )
}

export default Home