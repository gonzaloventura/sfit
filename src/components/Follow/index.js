import React from 'react'
import './Follow.scss'
import {data} from '../LuckyWheel';

const Follow = () => {
  return (
    <>
    <div className='cuenta__follow'>
        <img className='brand' src={require("../../" + data[0].logo)} />
        <a target={'_blank'} href={'https://www.instagram.com/chacinados_tacural_srl/'}>Seguir en instagram</a>
    </div>
    <div className='cuenta__follow'>
        <img className='brand' src={require("../../" + data[1].logo)} />
        <a target={'_blank'} href={'https://www.instagram.com/milkautarg/'}>Seguir en instagram</a>
    </div>
    <div className='cuenta__follow'>
        <img className='brand' src={require("../../" + data[2].logo)} />
        <a target={'_blank'} href={'https://www.instagram.com/alfajoresmerengo/'}>Seguir en instagram</a>
    </div>
    <div className='cuenta__follow'>
        <img className='brand' src={require("../../" + data[3].logo)} />
        <a target={'_blank'} href={'https://www.instagram.com/cervezasantafe/'}>Seguir en instagram</a>
    </div>
    <div className='cuenta__follow'>
        <img className='brand' src={require("../../" + data[4].logo)} />
        <a target={'_blank'} href={'https://www.instagram.com/santafecapitalok/'}>Seguir en instagram</a>
    </div>
    </>
  )
}

export default Follow