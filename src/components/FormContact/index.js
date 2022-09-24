import React, {useState} from 'react'
import './FormContact.scss'

const FormContact = () => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handleNameChange = (event) => {
    setNameInput(event.target.value);
    console.log(nameInput);
  }

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
    console.log(emailInput);
  }
  return (
    <div>
        <form>
            <input type="text" onChange={handleNameChange} placeholder='Nombre' />
            <input type="text" onChange={handleEmailChange} placeholder='Correo electrónico' />
        </form>
    </div>
  )
}

export default FormContact