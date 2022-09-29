import React, {useState, useEffect} from 'react'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom'
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import db from "../helpers/FirebaseConfig";

function Monitor() {
    const [data, setData] = useState([]);

    const getData = async () => {
        const dataCollection = collection(db, 'entregados')
        const dataSnapshot = await getDocs(dataCollection)
        const dataList = dataSnapshot.docs.map( (doc) => {
            let sponsor = doc.data()
            sponsor.id = doc.id
            return sponsor
        })
        return dataList;
      }

      useEffect(() => {
        setInterval(() => {
            console.log("update");
            getData()
            .then((res) => {
              setData(res);
            })
        }, 5000);
      }, []);

      const filtrarPremio = (premio) => {
        return data.filter((element) => {
          return element.premio === premio;
        })
      }

      const entregarPicada = () =>{
        const docRef = doc(db, 'data', "5")
        updateDoc(docRef, {probabilidad: 1})
      }

  return (
    <>
    <div className='monitor'>
        <h2>Monitoreo de premios</h2>
        <div>
            <p><strong>Total premios entregados: {data.length}</strong></p>
            <p><strong><img className='brand' src={require("../assets/images/brands/tacural.png")} alt={"Tacural"} /> Entregados: {filtrarPremio("Tacural").length}</strong></p>
            <p><strong><img className='brand' src={require("../assets/images/brands/santafeciudad-alt.png")} alt={"Santa Fe Capital"} /> Entregados: {filtrarPremio("Santa Fe Capital").length}</strong></p>
            <p><strong><img className='brand' src={require("../assets/images/brands/milkaut.png")} alt={"Milkaut"}/> Entregados: {filtrarPremio("Milkaut").length}</strong></p>
            <p><strong><img className='brand' src={require("../assets/images/brands/merengo.png")} alt={"Merengo"} /> Entregados: {filtrarPremio("Merengo").length}</strong></p>
            <p><strong><img className='brand' src={require("../assets/images/brands/cerveceria.png")} alt={"Cerveza Santa Fe"}/> Entregados: {filtrarPremio("Cerveza Santa Fe").length}</strong></p>
            <p><strong><img className='brand' src={require("../assets/images/brands/multi.png")} alt={"Picada"}/> Entregados: {filtrarPremio("Picada").length}</strong></p>
        </div>
        <div className='menu_buttons'>
        <Link to={'/'}><button className='spin-button'>Volver atrás</button></Link>
        <button onClick={entregarPicada} className='spin-button'>Entregar Picada <span className='picadas__contador'>(Entregadas: {filtrarPremio("Picada").length})</span></button>
        </div>
        <div className='card__follow'>
        <h4>Listado de Ganadores</h4>
        {data.map((data) => (
            <p key={data.id}>
                <div>
                  Nombre: {data.nombre} <br/>
                  Email: {data.email}   <br/>
                  Premio: {data.premio}
                </div>
            </p>
          ))
        }
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Monitor