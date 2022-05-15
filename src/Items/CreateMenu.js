import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateLogo from "..//imgs/create.svg";
import AddPSModal from "./Modal/AddPSModal";
import authHeader from "./Security/auth-header";

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
    img:{
        width: '40px',
        height: '40px',
    },
    form:{
        'visibility': 'hidden',
        'transition': 'right .2s linear',
    },
    input:{
      width: '250px',
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
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      appearance: 'none',
    },
    input2:{
        width: '112px',
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
        '-webkit-appearance': 'none',
        '-moz-appearance': 'none',
        appearance: 'none',
      },
    
}

function CreateMenu({props}) {
    //const id = uuidv4();
    const [PSActive, setPSActive] = useState(false)
    const [planetSystem, setPlanetSystem] = useState({
        "id":'',
        "name":''
    });
    useEffect(() => {planetSystem.id !== '' ?
    axios.post("http://localhost:8080/universe/add", planetSystem, {
        headers: authHeader()
      }) //{"id":oreId, "name": nameOre, "value":valueOre, "satId":satId}
    .then(res => {
        console.log(res);
        console.log(res.data);
    })
        : console.log("nope objOre = "+ planetSystem.id)}, 
    [planetSystem]);

    function mouseEnter(){
        const text = document.getElementById('text');
        text.style.color = 'rgb(138, 203, 255)'
    }
    function mouseLeave(){
        const text = document.getElementById('text');
        text.style.color = 'rgb(255, 255, 255)'
    }
    return (
        <div onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <img src={CreateLogo} id="img" alt="Create Logo" style={styles.img}/>
            &nbsp;
            <label className="big-text" id="text" style={styles.title} onClick={() => setPSActive(!PSActive)} >create</label>
            {PSActive && <AddPSModal setPS={setPlanetSystem} activePS={PSActive} setActivePS={setPSActive}/>}
        </div>
    );
  }
  
  export default CreateMenu;