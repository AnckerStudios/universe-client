import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'
import authHeader from "../Security/auth-header";

const styles = {
    title:{
        fontSize: '70px',
        color: 'rgb(255, 255, 255)',
        margin: '0px',
    },
    text:{
        fontSize: '50px',
    },
    but:{
        position: 'relative',
        borderRadius: '12px',
        width: '180px',
        height: '60px',
        backgroundColor: 'rgb(255,255,255)',
        color: 'rgb(0, 0, 0)',
        fontSize: '40px',
        bottom:'0',
        textAlign: 'center',
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
        backgroundColor: 'rgba(0,0,0,0.6)',
        backgroundClip: 'padding-box',
        border: '1px solid #bdbdbd',
        borderRadius:' 0.25rem',
        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
        '-webkit-appearance': 'none',
        '-moz-appearance': 'none',
        appearance: 'none',
      },
}

function CreateOreModal({active,setActive}) {
    const [nameOre, setNameOre] = useState();
    const [colorOre, setColorOre] = useState();
    function submitClick(e){
        var oreId = uuidv4();
        var ore = {"id": oreId, "name":nameOre, "color":colorOre}
        
        //setOre({"id": oreId, "name":nameOre, "value":valueOre});//{"satellite": null,"ore": ore, "value":valueOre}
        
        axios.post("http://localhost:8080/ore/add", ore, {
            headers: authHeader()
          }) //{"id":oreId, "name": nameOre, "value":valueOre, "satId":satId}
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        setActive(false);
        //window.location.assign('http://localhost:3000/universe');
    }
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var r = parseInt(result[1], 16);
        var g = parseInt(result[2], 16);
        var b = parseInt(result[3], 16);
        return r+','+g+','+b;
      }
    return (
        <div className="modal" onClick={()=>setActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="big-text" style={styles.title}>add ore</div>
                <div className="big-text" style={styles.text}>
                    name:
                    <input type="text" className="coordX" style={styles.input} onChange={(e)=>setNameOre(e.target.value)}/>
                    <input type="color" id="body" name="body" value="#f6b73c" onChange={(e)=>setColorOre(hexToRgb(e.target.value))}></input>
                </div>
                <div className="big-text" style={styles.but} onClick={(e) => submitClick(e)}>add</div>
            </div>
        </div>
    );
  }
  
export default CreateOreModal;