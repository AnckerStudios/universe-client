import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'
import AddPlanetModal from "./AddPlanetModal";
import InputField from "../Elements/InputField";
import NameElement from "../Elements/NameElement";


const styles = {
    title:{
        fontSize: '70px',
        color: 'rgb(255, 255, 255)',
        margin: '0px',
    },
    text:{
        fontSize: '30px',
        width: '250px',
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
    flexCont:{
        display: 'flex',
    },
    item:{
        flex: '1',
        flexGrow: '1',
    },
    contentLeft:{
        padding: '20px',
        width: '50%', 
        flexGrow: 1,
    },
    contentRight:{
        width: '50%', 
        flexGrow: 1,
        padding: '20px',
        borderLeft:'1px solid #757575',
    },
    content:{
        display: 'flex',
    },
    ore:{
        fontSize: '30px',
    },
    ul:{
        listStyleType:'none',
        color: 'rgb(255, 255, 255)',
        fontSize: '50px',
        margin: '0',
    },
}

function AddPSModal({setPS,activePS,setActivePS}) {
    const [idPS, setIdPS] = useState(uuidv4());
    console.log("0 = "+idPS)
    var PSX = {"id":idPS,"name":'',"satellites":[],"xcoord":'',"ycoord":''}
    const [namePS, setNamePS] = useState();
    const [X, setX] = useState();
    const [Y, setY] = useState();
    const [planet, setPlanet] = useState({
        "id":'',
        "name":'',
        "value":'10'
    });
    const [planets, setPlanets] = useState([]);
    const [planetActive, setPlanetActive] = useState(false)

    useEffect(() => {planet.id !== '' ?
        setPlanets(planets.concat(planet))
      : console.log("nope objOre = "+ planet.id)}, 
    [planet]);

    function submitClick(e){
        var psIdd = idPS;
        //var satId = planetSystem.id;
        setActivePS(false);
        setPS({"id":psIdd,"name":namePS,"satellites":planets,"xcoord":X,"ycoord":Y});
        console.log("2 = " + psIdd)
        //window.location.assign('http://localhost:3000/universe');
    }
    return (
        <div className="modal" onClick={()=>setActivePS(false)}>
            <div className="modal__content" style={styles.content} onClick={e => e.stopPropagation()}>
                <div style={styles.item}>
                    <div className="big-text" style={styles.title}>create planet system</div>
                    <div style={styles.flexCont}>
                        <div style={styles.contentLeft}>
                            <div style={styles.item}>
                                <InputField name={'name'} type={'text'} event={setNamePS} />
                                <div style={styles.flexCont}>
                                    <InputField name={'x coord'} type={'number'} event={setX} />&nbsp;	&nbsp;	&nbsp;	
                                    <InputField name={'y coord'} type={'number'} event={setY} />
                                </div>
                            </div>
                        </div>
                        <div style={styles.contentRight}>
                            <div style={styles.item}>
                                <div className="big-text" style={styles.text} onClick={() => setPlanetActive(!planetActive)}>
                                planets:
                                {planets.map(o => {return <NameElement key = {o.id} name={o.name} link={``} color={o.climate.color} colorName={'255,255,255'} type={'ball'}/>})}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="big-text" style={styles.but} onClick={(e) => submitClick(e)}>add</div>
                </div>
                
            
            </div>
            {planetActive && <AddPlanetModal planetSystem={PSX} satellite={null} setSatellite={setPlanet} setActivePl={setPlanetActive}/>}
        </div>
    );
  }
  
export default AddPSModal;