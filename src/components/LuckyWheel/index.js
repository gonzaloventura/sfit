import React, {useState, useEffect} from 'react'
import './LuckyWheel.scss'


const LuckyWheel = () => {
  const [name, setName] = useState("circle")
  const [chances, setChances] = useState(1);

  

  console.log("chances: " + chances);
  const startRotation = () => {
    setName("circle start-rotate")
    setTimeout( () => {
      setName("circle start-rotate stop-rotate");
      seQuedoSinChances();
    }, 5000 + Math.random() * 1000)
    
  }

  const seQuedoSinChances = () => {
    localStorage.setItem("Chances", 0);
    setChances(0);
    console.log("te quedaste sin chances");
  }

    return (
    <>
    <div className='wheel__container'>
        <div className='arrow'></div>
        <ul className={name}>
            <li>
                <div className='text'
                spellCheck="false"><img className='brand__rueda' src={require('../../assets/images/brands/tacural.png')} alt="Milkaut" /></div>
            </li>
            <li>
                <div className='text'
                spellCheck="false"><img className='brand__rueda' src={require('../../assets/images/brands/milkaut.png')} alt="Milkaut" /></div>
            </li>
            <li>
                <div className='text'
                spellCheck="false"><img className='brand__rueda' src={require('../../assets/images/brands/merengo.png')} alt="Milkaut" /></div>
            </li>
            <li>
                <div className='text'
                spellCheck="false"><img className='brand__rueda' src={require('../../assets/images/brands/cerveceria.png')} alt="Milkaut" /></div>
            </li>
            <li>
                <div className='text'
                spellCheck="false"><img className='brand__rueda' src={require('../../assets/images/brands/santafeciudad-alt.png')} alt="Milkaut" /></div>
            </li>
            <li>
                <div className='text'
                spellCheck="false"><img className='brand__rueda' src={require('../../assets/images/brands/multi.png')} alt="Milkaut" /></div>
            </li>
        </ul>
        {console.log("localstorage: " + localStorage.getItem("Chances"))}
        {
        localStorage.getItem("Chances") !== "0" ? 
        <button className='spin-button' onClick={startRotation}>¡GIRAR!</button>
        : 
        <>
          <h2 className='subtitulo__rueda'>
            ¡Te quedaste sin chances!
          </h2>
          <button className='spin-button'>
            OBTENER NUEVO GIRO
          </button>
        </>
        }
        
    </div>
    </>
  )
}

export default LuckyWheel