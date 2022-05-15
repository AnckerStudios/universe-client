import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'
import CreateOreModal from "./CreateOreModal";
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
        transition: "all 0.2s",
        "but:hover":{
            backgroundColor: 'rgb(138, 203, 255)',
        },
    },
    
    input:{
        width: '100px',
        height: '50px',
        padding: '5px',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '30px',
        fontWeight: '400',
        lineHeight: '0.5',
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.6)',
        backgroundClip: 'padding-box',
        border: '1px solid #bdbdbd',
        borderRadius:' 0.25rem',
        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',

      },
      input2:{
        width: '250px',
        height: '60px',
        padding: '6px 7px',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '30px',
        fontWeight: '400',
        lineHeight: '0.5',
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.6)',
        backgroundClip: 'padding-box',
        border: '1px solid #bdbdbd',
        borderRadius:' 0.25rem',
        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
        margin: '0px 5px 20px 0px',

      },
      flexCont:{
        display: 'flex',
      },
      item:{
        alignItems : 'stretch',
      },
}

function AddOreModal({satellite,setObjOre,active,setActive}) {
    

    const [valueOre, setValueOre] = useState(0);
    const [ores, setOres] = useState([]);
    const [idOre, setIdOre] = useState();
    const [oreCreActive, setOreCreActive] = useState(false)

    useEffect( () => {
        axios.get("http://localhost:8080/ore/all", {
            headers: authHeader()
          }).then(res => {
                console.log("res"+res);
                setOres(res.data);
                setIdOre(res.data[0].id);
            })
    },[oreCreActive])

    function submitClick(e){
        setActive(false);
        setObjOre({"satellite":satellite,"ore":ores.find(item => item.id === idOre), "value":valueOre});//{"satellite": null,"ore": ore, "value":valueOre}
        console.log("ore find = "+ idOre)
    }
    return (
        <div className="modal" onClick={()=>setActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="big-text" style={styles.title}>add ore</div>
                <div style={styles.flexCont}>
                    <select id="cities" style={styles.input2} onChange={(e)=>setIdOre(e.target.value)}>
                    {ores != null ? (ores.map(o => {
                        return <option value={o.id} key={o.id}>{o.name}</option>
                    })) : 'Noyp'}
                    </select>
                    <input type="number" style={styles.input} onChange={(e)=>setValueOre(e.target.value)} placeholder="value"/>
                    <div className="big-text" style={styles.text} onClick={() => setOreCreActive(true)}>&nbsp;&nbsp;+</div>
                </div>
                <div className="big-text" style={styles.but} onClick={(e) => submitClick(e)}>add</div>
            </div>
            {oreCreActive && <CreateOreModal active={oreCreActive} setActive={setOreCreActive}/>}
        </div>
    );
  }
  
export default AddOreModal;