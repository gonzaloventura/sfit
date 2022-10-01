import React, {useState, useEffect} from 'react'
import './LuckyWheel.scss'
import confetti from 'canvas-confetti';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import db from "../../helpers/FirebaseConfig";
import NuevaChance from '../../pages/NuevaChance'

const LuckyWheel = ({nombre, email}) => {
  const [name, setName] = useState("circle");
  const [chances, setChances] = useState(1);   
  const [style, setStyle] = useState(0);
  const [elGanadorEs, setElGanadorEs] = useState();
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
      let salePicada = res[5].probabilidad;
      let randomNumber = obtenerValor(1,11);
      if (salePicada > 0) {
        setElGanadorEs("Picada");
      } else if (randomNumber === 1 && res[1].disponibles > 0){
        setElGanadorEs("Tacural");
      } else if (randomNumber === 2 && res[2].disponibles > 0){
        setElGanadorEs("Milkaut");
      }  else if ((randomNumber === 3 || randomNumber === 6 || randomNumber === 7) && res[2].disponibles > 0){
        setElGanadorEs("Merengo");
      }  else if ((randomNumber === 4 || randomNumber === 8 || randomNumber === 9) && res[3].disponibles > 0){
        setElGanadorEs("Cerveza Santa Fe");
      }  else if ((randomNumber === 5 || randomNumber === 10 || randomNumber === 11) && res[4].disponibles > 0){
        setElGanadorEs("Santa Fe Capital");
      }
      
    });
    
    
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
        updateDoc(doc(db, 'data', "0"), {disponibles: data[0].disponibles - 1})
        return(obtenerValor(data[0].rotacion_min, data[0].rotacion_max));
      case "Milkaut":
        updateDoc(doc(db, 'data', "1"), {disponibles: data[1].disponibles - 1});
        return(obtenerValor(data[1].rotacion_min, data[1].rotacion_max));
      case "Merengo":
        updateDoc(doc(db, 'data', "2"), {disponibles: data[2].disponibles - 1});
        return(obtenerValor(data[2].rotacion_min, data[2].rotacion_max));
      case "Cerveza Santa Fe":
        updateDoc(doc(db, 'data', "3"), {disponibles: data[3].disponibles - 1});
        return(obtenerValor(data[3].rotacion_min, data[3].rotacion_max));
      case "Santa Fe Capital":
        updateDoc(doc(db, 'data', "4"), {disponibles: data[4].disponibles - 1});
        return(obtenerValor(data[4].rotacion_min, data[4].rotacion_max));
      case "Picada":
        updateDoc(doc(db, 'data', "5"), {probabilidad: 0})
        updateDoc(doc(db, 'data', "5"), {disponibles: data[5].disponibles - 1})
        return(obtenerValor(data[5].rotacion_min, data[5].rotacion_max));
      default:
        console.log("error");
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
    if (localStorage.getItem("NuevaChance")){
      localStorage.setItem("NuevaChance", 0);
    }
    
    setChances(0);
  }

  const botonera = () => {
    if ((localStorage.getItem("Chances")) === "0" && (localStorage.getItem("NuevaChance") === "0"))
    {
        return (
        <h2 className='subtitulo__rueda'>
          ¡Muchas gracias por participar!
        </h2>
      )
    }
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
          <button className='spin-button' onClick={validacionPrevia}>CONTINUAR</button>
      )
  }

    return (
    <>
        {botonera()}
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