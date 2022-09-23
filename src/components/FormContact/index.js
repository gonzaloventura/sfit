import React from 'react'
import './FormContact.scss'

const FormContact = () => {
  return (
    <div>
        <form>
            <input type="text" placeholder='Nombre' />
            <input type="text" placeholder='Correo electrónico' />
        </form>
    </div>
  )
}

export default FormContact