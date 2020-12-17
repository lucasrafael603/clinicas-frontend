import React, {useEffect, useState} from 'react'
import './styles.css';
import Header from '../components/Header/index'
import 'antd/dist/antd.css';
import Lista from './List/index'

function HomeComponent() {

  return (
    <div>

        <Header/>
        <Lista></Lista>
    </div>
  );
}

export default HomeComponent;
