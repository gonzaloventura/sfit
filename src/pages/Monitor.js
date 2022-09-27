import React, {useState, useEffect} from 'react'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom'
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import db from "../helpers/FirebaseConfig";

function Home() {
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

  return (
    <>
    <div className='monitor'>
        <h2>Monitoreo de premios</h2>
        <div>
            <p><strong>Total premios entregados: {data.length}</strong></p>
            <p><strong><img className='brand' src={require("../assets/images/brands/tacural.png")} /> Entregados: {filtrarPremio("Tacural").length}</strong></p>
            <p><strong><img className='brand' src={require("../assets/images/brands/santafeciudad-alt.png")} /> Entregados: {filtrarPremio("Santa Fe Capital").length}</strong></p>
            <p><strong><img className='brand' src={require("../assets/images/brands/milkaut.png")} /> Entregados: {filtrarPremio("Milkaut").length}</strong></p>
            <p><strong><img className='brand' src={require("../assets/images/brands/merengo.png")} /> Entregados: {filtrarPremio("Merengo").length}</strong></p>
            <p><strong><img className='brand' src={require("../assets/images/brands/cerveceria.png")} /> Entregados: {filtrarPremio("Cerveza Santa Fe").length}</strong></p>
        </div>
        <div className='menu_buttons'>
        <Link to={'/'}><button className='spin-button'>Volver atrás</button></Link>
        <button className='spin-button disabled'>Entregar Picada <span className='picadas__contador'>(Entregadas: {filtrarPremio("Tacural").length})</span></button>
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

export default Home