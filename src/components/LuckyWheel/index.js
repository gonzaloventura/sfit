import React, {useState, useEffect} from 'react'
import './LuckyWheel.scss'
import confetti from 'canvas-confetti';
import Swal from 'sweetalert2';

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
  const [elGanadorEs, setElGanadorEs] = useState("Milkaut");

  function obtenerValor(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function quienGana(marca){
    switch (marca){
      case "Tacural":
        return(obtenerValor(data[0].rotacion_min, data[0].rotacion_max));
      case "Milkaut":
        return(obtenerValor(data[1].rotacion_min, data[1].rotacion_max));
      case "Merengo":
        return(obtenerValor(data[2].rotacion_min, data[2].rotacion_max));
      case "Cerveza Santa Fe":
        return(obtenerValor(data[3].rotacion_min, data[3].rotacion_max));
      case "Santa Fe Capital":
        return(obtenerValor(data[4].rotacion_min, data[4].rotacion_max));
      default:
        return(obtenerValor(data[5].rotacion_min, data[5].rotacion_max));
    }
  }
  
  const styleGanador = {
    transform: "rotate(" + style + "deg)"
  }

  const validacionPrevia = () => {
    const nombreUsuario = document.getElementById("name").value;
    const emailUsuario = document.getElementById("email").value;
    if (nombreUsuario && emailUsuario) {
      Swal.fire({
        title: 'Los datos son válidos',
        text: "Haz click en GIRAR para ganar un premio",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#00c18c',
        confirmButtonText: '¡GIRAR!'
      }).then((result) => {
        if (result.isConfirmed) {
          startRotation();
        }
      })
      
    } else if (nombreUsuario && !emailUsuario) {
      Swal.fire({
        text: 'Debes ingresar tu correo electrónico',
        confirmButtonColor: '#00c18c'
      })
    } else if (!nombreUsuario && emailUsuario) {
      Swal.fire({
        text: 'Debes ingresar tu nombre',
        confirmButtonColor: '#00c18c'
      })
    } else {
      Swal.fire({
        text: 'Debes ingresar tu nombre y correo electrónico',
        confirmButtonColor: '#00c18c'
      })
    }
  }
  
  const startRotation = () => {
    setName("circle start-rotate")
    setTimeout(() => {
      setStyle(quienGana(elGanadorEs));
      console.log(quienGana(elGanadorEs));
      setName("circle stop-rotate");
      confetti({
        particleCount: 160,
        startVelocity: 25,
        spread: 120,
        });
    seQuedoSinChances();
    }, 4000);
    setTimeout(() => {
      Swal.fire({
        title: '¡Felicitaciones!',
        text: 'Ganaste un premio de ' + elGanadorEs,
        confirmButtonColor: '#00c18c'
      })}, 5500);
  }
  

  const seQuedoSinChances = () => {
    localStorage.setItem("Chances", 0);
    setChances(0);
  }

    return (
    <>
    {
        localStorage.getItem("Chances") !== "0" ? 
        <button className='spin-button' onClick={validacionPrevia}>CONTINUAR</button>
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