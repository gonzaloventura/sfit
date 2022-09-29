import React, {useState, useEffect} from 'react'
import './Follow.scss'
import { collection, getDocs } from "firebase/firestore";
import db from "../../helpers/FirebaseConfig";
import {Link} from 'react-router-dom'


const Follow = () => {
    const [count, setCount] = useState(1);
    const [nuevaChance, setNuevaChance] = useState(false);

    const [data, setData] = useState([]);

    const handleClick = () => {
        setCount(count+1);
        if (count > 4) {
            localStorage.setItem("NuevaChance", 1);
            setNuevaChance(true);
        }
    }

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
        });
    }, [])
    data.splice(5,6);
  return (
    <>
    <div className='card__follow'>
    {data.map((data) => (
            <div className='cuenta__follow' key={data.id}>
                <img className='brand' src={require("../../" + data.logo)} alt={data.marca} />
                <a onClick={handleClick} target={'_blank'} rel="noreferrer" href={data.social}>Seguir en instagram</a>
            </div>
          ))
        }
    </div>
        <div className='menu_buttons'>
        <Link to={'/'}><button className='spin-button'>Volver atrás</button></Link>
        {(!nuevaChance) ? 
        <button className='spin-button disabled'>¡Nuevo Giro disponible!</button>
        :
        <Link to={'/'}><button className='spin-button'>¡Nuevo Giro disponible!</button></Link>
      }
        
        </div>
    </>
  )
}

export default Follow