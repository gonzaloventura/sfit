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
      let randomNumber = obtenerValor(1,13);
      if (randomNumber === 1 && res[1].disponibles > 0){
        setElGanadorEs("Francelina Espinoza");
      } else if (randomNumber === 2 && res[2].disponibles > 0){
        setElGanadorEs("Cesar Flores");
      }  else if ((randomNumber === 3 || randomNumber === 6 || randomNumber === 7) && res[2].disponibles > 0){
        setElGanadorEs("Walter Yanho");
      }  else if ((randomNumber === 4 || randomNumber === 8 || randomNumber === 9) && res[3].disponibles > 0){
        setElGanadorEs("Victoria Bavosi");
      }  else if ((randomNumber === 5 || randomNumber === 10 || randomNumber === 11) && res[4].disponibles > 0){
        setElGanadorEs("Madeleine Orihuela");
      } else if (randomNumber === 12 || randomNumber === 13) {
        setElGanadorEs("Jaime Miranda Vega");
      }
    });
}, [chances, setChances, elGanadorEs, success, setElGanadorEs, data])


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
        updateDoc(doc(db, 'data', "0"), {disponibles: data[0].disponibles - 1})
        return(obtenerValor(data[0].rotacion_min, data[0].rotacion_max));
      case "Cesar Flores":
        updateDoc(doc(db, 'data', "1"), {disponibles: data[1].disponibles - 1});
        return(obtenerValor(data[1].rotacion_min, data[1].rotacion_max));
      case "Walter Yanho":
        updateDoc(doc(db, 'data', "2"), {disponibles: data[2].disponibles - 1});
        return(obtenerValor(data[2].rotacion_min, data[2].rotacion_max));
      case "Victoria Bavosi":
        updateDoc(doc(db, 'data', "3"), {disponibles: data[3].disponibles - 1});
        return(obtenerValor(data[3].rotacion_min, data[3].rotacion_max));
      case "Madeleine Orihuela":
        updateDoc(doc(db, 'data', "4"), {disponibles: data[4].disponibles - 1});
        return(obtenerValor(data[4].rotacion_min, data[4].rotacion_max));
      case "Jaime Miranda Vega":
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
        pushData({...userData, premio: buscarEnData(elGanadorEs).marca});
    }, 4000);
    setTimeout(() => {
      Swal.fire({
        title: '¡Felicitaciones!',
        text: buscarEnData(elGanadorEs).marca, 
        confirmButtonColor: '#6CACE4'
      })}, 5500);
  }

  const pushData = async (newOrder) => {
    const collectionOrder = collection(db, 'entregados')
    const orderDoc = await addDoc(collectionOrder, newOrder)
    setSuccess(orderDoc.id)
    console.log('ORDEN GENERADA', orderDoc)
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