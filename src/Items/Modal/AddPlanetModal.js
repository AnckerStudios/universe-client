import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'
import AddOreModal from "./AddOreModal";
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
        position: 'absolute',
        borderRadius: '12px',
        width: '180px',
        height: '60px',
        backgroundColor: 'rgb(255,255,255)',
        color: 'rgb(0, 0, 0)',
        fontSize: '40px',
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
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        appearance: 'none',
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
        flex: '1',
        flexGrow: '1',
      },
      ore:{
        fontSize: '30px',
      }
}

function AddPlanetModal({planetSystem, satellite, setSatellite, setActivePl}) {
    const [idPlanet, setIdPlanet] = useState(uuidv4());
    console.log("0 = "+idPlanet)
    var satelliteX = {"id":idPlanet,"name":"","discriminator":"", 'satellites':[],"climate":{climateName:'musson',color:'0,0,0'},"satellite":satellite,"radius":0,"planetSystem":planetSystem,"objectOre":[], "creatures":[]}
    console.log("1 = " + satelliteX.id)
    const [namePlanet, setNamePlanet] = useState();
    const [climate, setClimate] = useState([]);
    const [idClimate, setIdClimate] = useState();
    const [orbit, setOrbit] = useState();
    const [objOre, setObjOre] = useState({
        "id":"id",
        "name":"name",
        "value":10
    });
    const [objOres, setObjOres] = useState([]);
    const [oreActive, setOreActive] = useState(false)
    const [moon, setMoon] = useState();
    const [moons, setMoons] = useState([]);
    const [moonActive, setMoonActive] = useState(false)

    useEffect(() => {objOre.satellite !== undefined ?
        setObjOres(objOres.concat(objOre))
      : console.log("nope objOre = "+ objOre.satellite)}, 
    [objOre]);
    useEffect(() => {moon !== undefined ?
        setMoons(moons.concat(moon))
      : console.log("nope moon = "+ moon)}, 
    [moon]);

    function submitClick(e){
        var psIdd = idPlanet;
        console.log("2 = " + psIdd)
        
        var discriminator = satellite !== null ? 'planet':'satellite';
        setActivePl(false);
        console.log("id clim = "+idClimate)
        climate.map(o => {
            return console.log(o.climateName);
        })
        console.log("clim = "+climate.find(item => item.climateName === idClimate).climateName)
        console.log("clim = "+climate.find(item => item.climateName === idClimate).climateName)
        setSatellite({"id":psIdd,"name":namePlanet,"discriminator":discriminator,"climate":climate.find(item => item.climateName === idClimate),"radius":orbit,"planetSystem":planetSystem,'satellites':moons,"objectOre":objOres,"satellite":satellite, "creatures":[]});
        //window.location.assign('http://localhost:3000/universe');
    }
    useEffect( () => {
        axios.get("http://localhost:8080/climate/all", {
            headers: authHeader()
          }).then(res => {
                console.log("res"+res);
                setClimate(res.data);
                climate.map(o => {
                    return console.log(o.ClimateName);
                })
            })
    },[])
    return (
        <div className="modal" onClick={()=>setActivePl(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="big-text" style={styles.title}>new planet</div>
                    <div style={styles.flexCont}>
                        <div style={styles.item}>
                            <input type="text" className="coordX" style={styles.input} onChange={(e)=>setNamePlanet(e.target.value)} placeholder="name"/>
                            <select id="cities" style={styles.input2} onChange={(e)=>setIdClimate(e.target.value)}>
                                {climate != null ? (climate.map(o => {
                                    return <option value={o.climateName} key={o.climateName}>{o.climateName}</option>
                                })) : 'Noyp'}
                            </select>
                            <input type="number" className="coordY" style={styles.input} onChange={(e)=>setOrbit(e.target.value)} placeholder="orbit"/>
                        </div>
                        <div style={styles.item}>
                            <div className="big-text" style={styles.text} onClick={() => setOreActive(!oreActive)}>
                            ore:
                            {objOres.map(o => {return <div className="thin-text" style={styles.ore} key = {o.ore.id}>{o.ore.name}</div>})}
                            </div>
                        </div>
                        {planetSystem !== null && <div style={styles.item}>
                            <div className="big-text" style={styles.text} onClick={() => setMoonActive(!moonActive)}>
                            moons:
                            {moons.map(o => {return <div className="thin-text" style={styles.ore} key = {o.id}>{o.name}</div>})}
                            </div>
                        </div> }
                    </div>
                <div className="big-text" style={styles.but} onClick={(e) => submitClick(e)}>add</div>
            </div>
            {oreActive && <AddOreModal satellite={satelliteX} setObjOre={setObjOre} active={oreActive} setActive={setOreActive}/>}
            {moonActive && <AddPlanetModal planetSystem={null} satellite={satelliteX} setSatellite={setMoon} setActivePl={setMoonActive}/>}
        </div>
    );
  }
  
export default AddPlanetModal;