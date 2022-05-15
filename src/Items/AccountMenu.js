import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import {BrowserRouter, Link, useNavigate} from 'react-router-dom'
import SatelliteItem from "./SatelliteItem";
import { bounce } from 'react-animations';
import AccountLogo from "..//imgs/account.svg";
import AuthService from "./Security/auth.service";

const styles = {
    panel:{
        position: 'fixed',
        right: '0',
        width: '320px',
        right: '-280px',
        'transition': 'right .2s linear',
    },
    title:{
        'fontSize': '50px',
        'color': 'rgb(255, 255, 255)',
    },
    logout:{
        position: 'absolute',
        right: '15px',
        top:'15px',
        'fontSize': '30px',
        'color': 'rgb(255, 255, 255)',
    },
    img:{
        width: '40px',
        height: '40px',
    },
    form:{
        'visibility': 'hidden',
        'transition': 'right .2s linear',
    },
    input:{
      width: '200px',
      height: 'calc(2.25rem + 2px)',
      padding: '0.375rem 0.75rem',
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '2rem',
      fontWeight: '400',
      lineHeight: '0.5',
      color: '#fff',
      backgroundColor: '#000',
      backgroundClip: 'padding-box',
      border: '1px solid #bdbdbd',
      borderRadius:' 0.25rem',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
    },
    findlabel:{

    }
    
}

function AccountMenu() {
    let navigate = useNavigate();
    //const user = JSON.parse(localStorage.getItem('user'));
    const [username, setUsername] = useState(JSON.parse(localStorage.getItem('user')).username);
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('user')).role);
    
    function mouseEnterSearch(){
        const textSearch = document.getElementById('textAcc');
        textSearch.style.color = 'rgb(138, 203, 255)'
    }
    function mouseLeaveSearch(){
        const textSearch = document.getElementById('textAcc');
        textSearch.style.color = 'rgb(255, 255, 255)'
    }
    function logout(){
        AuthService.logout();
        navigate("/login")
    }
    return (
        <div onMouseEnter={mouseEnterSearch} onMouseLeave={mouseLeaveSearch}>
            <img src={AccountLogo} alt="Account Logo" style={styles.img}/>
            &nbsp;
            <label className="big-text" id="textAcc" style={styles.title} >{username}</label>
            <div className="thin-text" style={styles.logout} onClick={()=>logout()}>╳</div>
        </div>
    );
  }
  
  export default AccountMenu;