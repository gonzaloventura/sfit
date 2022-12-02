import React, {useState, useEffect} from 'react'
import './LuckyWheel.scss'
import confetti from 'canvas-confetti';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import db from "../../helpers/FirebaseConfig";

const LuckyWheel = ({nombre, email}) => {
  const [name, setName] = useState("circle");
  const [chances, setChances] = useState(1);   
  const [style, setStyle] = useState(0);
  const [elGanadorEs, setElGanadorEs] = useState();
  const [data, setData] = useState([
    {
    disponibles: 100,
    info: "Acércate a nuestro stand para retirarlo.",
    logo: "assets/images/brands/01.png",
    marca: "Francelina Espinoza",
    premio: "Ganaste",
    probabilidad: 0,
    rotacion_max: 358,
    rotacion_min: 302
  },
  {
    disponibles: 100,
    info: "Acércate a nuestro stand para retirarlo.",
    logo: "assets/images/brands/02.png",
    marca: "Cesar Flodata",
    premio: "Ganaste",
    probabilidad: 0,
    rotacion_max: 298,
    rotacion_min: 242
  },
  {
    disponibles: 100,
    info: "Acércate a nuestro stand para retirarlo.",
    logo: "assets/images/brands/03.png",
    marca: "Walter Yanho",
    premio: "Ganaste",
    probabilidad: 0,
    rotacion_max: 238,
    rotacion_min: 182
  },{
    disponibles: 100,
    info: "Acércate a nuestro stand para retirarlo.",
    logo: "assets/images/brands/04.png",
    marca: "Victoria Bavosi",
    premio: "Ganaste",
    probabilidad: 0,
    rotacion_max: 178,
    rotacion_min: 122
  },{
    disponibles: 100,
    info: "Acércate a nuestro stand para retirarlo.",
    logo: "assets/images/brands/05.png",
    marca: "Madeleine Orihuela",
    premio: "Ganaste",
    probabilidad: 0,
    rotacion_max: 118,
    rotacion_min: 62
  },{
    disponibles: 100,
    info: "Acércate a nuestro stand para retirarlo.",
    logo: "assets/images/brands/06.png",
    marca: "Jaime Miranda Vega",
    premio: "Ganaste",
    probabilidad: 0,
    rotacion_max: 58,
    rotacion_min: 2
  }
]);

  const [success, setSuccess] = useState()

  const [order, setOrder] = useState({});
  const [userData, setUserData] = useState({});


  useEffect(() => {
    giroRandom()
}, [])

const giroRandom = () => {
  let randomNumber = obtenerValor(1,13);
      if (randomNumber === 1 && data[1].disponibles > 0){
        setElGanadorEs("Francelina Espinoza");
      } else if (randomNumber === 2 && data[2].disponibles > 0){
        setElGanadorEs("Cesar Flodata");
      }  else if ((randomNumber === 3 || randomNumber === 6 || randomNumber === 7) && data[2].disponibles > 0){
        setElGanadorEs("Walter Yanho");
      }  else if ((randomNumber === 4 || randomNumber === 8 || randomNumber === 9) && data[3].disponibles > 0){
        setElGanadorEs("Victoria Bavosi");
      }  else if ((randomNumber === 5 || randomNumber === 10 || randomNumber === 11) && data[4].disponibles > 0){
        setElGanadorEs("Madeleine Orihuela");
      } else if (randomNumber === 12 || randomNumber === 13) {
        setElGanadorEs("Jaime Miranda Vega");
      } 
}


  useEffect(() => {
    setUserData({
      nombre: nombre,
      email: email
    })
    console.log("userdata", userData);
  }, [nombre, email])


  function obtenerValor(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function buscarEnData(marca) {
    return data.find((element) => {
      return element.marca === marca;
    })
  }

  function quienGana(marca){
    switch (marca){
      case "Francelina Espinoza":
        return(obtenerValor(data[0].rotacion_min, data[0].rotacion_max));
      case "Cesar Flodata":
        return(obtenerValor(data[1].rotacion_min, data[1].rotacion_max));
      case "Walter Yanho":
        return(obtenerValor(data[2].rotacion_min, data[2].rotacion_max));
      case "Victoria Bavosi":
        return(obtenerValor(data[3].rotacion_min, data[3].rotacion_max));
      case "Madeleine Orihuela":
        return(obtenerValor(data[4].rotacion_min, data[4].rotacion_max));
      case "Jaime Miranda Vega":
        return(obtenerValor(data[5].rotacion_min, data[5].rotacion_max));
      default:
        console.log("error");
    }
  }
  
  const styleGanador = {
    transform: "rotate(" + style + "deg)"
  }

  const validacionPrevia = () => {
      giroRandom()
      startRotation();
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
    }, 4000);
    setTimeout(() => {
      Swal.fire({
        title: '¡Felicitaciones!',
        text: buscarEnData(elGanadorEs).marca, 
        confirmButtonColor: '#6CACE4'
      })}, 5500);
  }
  
  const seQuedoSinChances = () => {
    localStorage.setItem("Chances", 1);
    if (localStorage.getItem("NuevaChance")){
      localStorage.setItem("NuevaChance", 0);
    }
    
    setChances(1);
  }

  const botonera = () => {
    if ((localStorage.getItem("Chances")) === "0")
    {
      if (localStorage.getItem("NuevaChance") === "1"){
        return (
          <button className='spin-button' onClick={validacionPrevia}>CONTINUAR</button>
        )
      } else {
        return (
          <>
          <h2 className='subtitulo__rueda'>
            ¡Muchas gracias por participar!
          </h2>
          <Link to={'/nuevachance'}>
            <button className='spin-button'>
              OBTENER NUEVO GIRO
            </button>
          </Link>
          </>
        )
        }
    } 
    if ((localStorage.getItem("Chances")) === "0" && (localStorage.getItem("NuevaChance") === "1"))
    {
        return (
          <button className='spin-button' onClick={validacionPrevia}>CONTINUAR</button>
      )
    }
    if (chances === 1)
        return (
          <button className='spin-button' onClick={validacionPrevia}>GIRAR</button>
      )
  }

    return (
    <>
        <div className='wheel__container'>
        <div className='arrow'></div>
        <div className='circle__interior'></div>
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
      {botonera()}
    </>
  )
}


export default LuckyWheel