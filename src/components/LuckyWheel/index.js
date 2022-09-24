import React, {useState, useEffect} from 'react'
import './LuckyWheel.scss'
import confetti from 'canvas-confetti';

const data = [
  {
    id: 0,
    marca: "Tacural",
    logo: "assets/images/brands/tacural.png",
    premio: "Lorem Ipsum",
    disponibles: 10,
    probabilidad: 15,
    rotacion_min: 302,
    rotacion_max: 358
  },
  {
    id: 1,
    marca: "Milkaut",
    logo: "assets/images/brands/milkaut.png",
    premio: "Lorem Ipsum",
    disponibles: 10,
    probabilidad: 15,
    rotacion_min: 242,
    rotacion_max: 298
  },
  {
    id: 2,
    marca: "Merengo",
    logo: "assets/images/brands/merengo.png",
    premio: "Lorem Ipsum",
    disponibles: 10,
    probabilidad: 15,
    rotacion_min: 182,
    rotacion_max: 238
  },
  {
    id: 3,
    marca: "Cerveza Santa Fe",
    logo: "assets/images/brands/cerveceria.png",
    premio: "Lorem Ipsum",
    disponibles: 10,
    probabilidad: 15,
    rotacion_min: 122,
    rotacion_max: 178
  },
  {
    id: 4,
    marca: "Santa Fe Capital",
    logo: "assets/images/brands/santafeciudad-alt.png",
    premio: "Lorem Ipsum",
    disponibles: 10,
    probabilidad: 15,
    rotacion_min: 62,
    rotacion_max: 118
  },
  {
    id: 5,
    marca: "Comodín",
    logo: "assets/images/brands/multi.png",
    premio: "Lorem Ipsum",
    disponibles: 10,
    probabilidad: 15,
    rotacion_min: 2, 
    rotacion_max: 58
  }
]

const LuckyWheel = () => {
  const [name, setName] = useState("circle");
  const [chances, setChances] = useState(1);   
  const [style, setStyle] = useState(0);
  const [randomValues, setRandomValues] = useState(0);

  function obtenerValor(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function quienGana(marca){
    switch (marca){
      case "Tacural":
        return(obtenerValor(data[0].rotacion_min, data[0].rotacion_max));
        break;
      case "Milkaut":
        return(obtenerValor(data[1].rotacion_min, data[1].rotacion_max));
        break;
    }
  }
  
  const styleGanador = {
    transform: "rotate(" + style + "deg)"
  }

  
  const startRotation = () => {

    setName("circle start-rotate")
    setTimeout(() => {
      setStyle(quienGana("Tacural"));
      console.log(quienGana("Tacural"));
      setName("circle stop-rotate");
      confetti({
        particleCount: 160,
  startVelocity: 25,
  spread: 120,
  });
    seQuedoSinChances();
    }, 4000);
  }

  const seQuedoSinChances = () => {
    localStorage.setItem("Chances", 0);
    setChances(0);
  }
  

    return (
    <>
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
    <div className='wheel__container'>
        <div className='arrow'></div>
        <ul className={name} style={styleGanador}>
          {data.map((data) => (
            <li key={data.id}>
                <div className='text'>
                  <img className='brand__rueda' src={require("../../" + data.logo)} alt={data.marca} />
                </div>
            </li>
          ))
        }
        </ul>        
    </div>
    </>
  )
}


export default LuckyWheel