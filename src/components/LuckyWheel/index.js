import React, {useState, useEffect} from 'react'
import './LuckyWheel.scss'
import confetti from 'canvas-confetti';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import db from "../../helpers/FirebaseConfig";

const LuckyWheel = ({nombre, email}) => {
  const [name, setName] = useState("circle");
  const [chances, setChances] = useState(1);   
  const [style, setStyle] = useState(0);
  const [elGanadorEs, setElGanadorEs] = useState("Cerveza Santa Fe");
  const [data, setData] = useState([]);

  const [success, setSuccess] = useState()

  const [order, setOrder] = useState({});
  const [userData, setUserData] = useState({});


  const getData = async () => {
    const dataCollection = collection(db, 'data')
    const dataSnapshot = await getDocs(dataCollection)
    const dataList = dataSnapshot.docs.map( (doc) => {
        let sponsor = doc.data()
        sponsor.id = doc.id
        return sponsor
    })
    return dataList;
  }

  useEffect(() => {
    getData()
    .then((res) => {
      setData(res);
    })
}, [])



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
    if (nombre && email) {
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
      
    } else if (nombre && !email) {
      Swal.fire({
        text: 'Debes ingresar tu correo electrónico',
        confirmButtonColor: '#00c18c'
      })
    } else if (!nombre && email) {
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
        pushData({...userData, premio: buscarEnData(elGanadorEs).marca});
    seQuedoSinChances();
    }, 4000);
    setTimeout(() => {
      Swal.fire({
        title: '¡Felicitaciones!',
        text: buscarEnData(elGanadorEs).premio,
        confirmButtonColor: '#00c18c'
      })}, 5500);
  }

  const pushData = async (newOrder) => {
    const collectionOrder = collection(db, 'entregados')
    const orderDoc = await addDoc(collectionOrder, newOrder)
    setSuccess(orderDoc.id)
    console.log('ORDEN GENERADA', orderDoc)
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
          <Link to={'/nuevachance'}>
            <button className='spin-button'>
              OBTENER NUEVO GIRO
            </button>
          </Link>
        </>
        }
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
    </>
  )
}


export default LuckyWheel