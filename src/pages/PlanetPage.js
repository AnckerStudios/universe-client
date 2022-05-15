import { render } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link, NavLink, useParams} from 'react-router-dom'
import CreateLogo from "..//imgs/create.svg";
import NameElement from "../Items/Elements/NameElement";
import AddOreModal from "../Items/Modal/AddOreModal";
import AddPlanetModal from "../Items/Modal/AddPlanetModal";
import authHeader from "../Items/Security/auth-header";
import ErrorPage from "./ErrorPage";

const styles = {
    space:{
        'verticalAlign': 'middle'
    },
    psName:{
        fontSize: '100px',
        color: 'rgb(255, 255, 255)',
    //position: 'absolute',
        margin: '0px',
    },
    img:{
        width: '80px',
        height: '80px',
    },
    ul:{
        listStyleType:'none',
    //position: 'absolute',
        color: 'rgb(255, 255, 255)',
        fontSize: '50px',
    },
input:{
    
    height: 'calc(2.25rem + 2px)',
    
    padding: '0.375rem 0.75rem',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '2rem',
    fontWeight: '400',
    display: 'inline-block',
    color: '#fff',
    backgroundColor: '#000',
   
   

  },
  ul:{
    listStyleType:'none',
    //position: 'absolute',
    color: 'rgb(255, 255, 255)',
    fontSize: '40px',
    
  },
  del:{
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    bottom: '50px',
    right:'50px',
  }
}
function PlanetPage() {
    const {id} = useParams();
    const [satellite, setSatellite] = useState({climate:{climateName: '',color:'0,0,0'}} );
    const [error, setError] = useState();
    const stylesSat = {
        ring:{
          width: 2000+'px',
          height: 2000+'px',
          border: '2px solid rgb('+satellite.climate.color+')',
          top: '50%',
          marginRight: '-50%',
          transform: 'translate(50%, -50%)'
        },
        sat:{
            top: '50%',
            width: (300 )+'px',
            height: (300 )+'px',
            transform: 'translate(-50%, -50%)',
            background: 'rgb('+satellite.climate.color+')',
            boxShadow:  '0 0 10px rgb('+satellite.climate.color+'),'+
                          '0 0 50px rgb('+satellite.climate.color+')',
        }
    }
    const fetchPlanetSystems = () => {
      axios.get("http://localhost:8080/satellite/find/"+id, {
        headers: authHeader()
      }).then(res =>{
        console.log(res);
        console.log("res = "+ res.data);
        setSatellite(res.data);
      }).catch((error) => {
        console.log("Ошибочка");
        console.error(error.response);
        setError(error);
      });
    };
    useEffect(() => {
      fetchPlanetSystems();
    },[]);
    
    function saveFun(){
      axios.get(`http://localhost:8080/satellite/save/${id}`, {
        headers: authHeader()
      }).then(res => {
        console.log(res);
        console.log(res.data);
      })
    } 
    function delFun(){
      axios.delete(`http://localhost:8080/satellite/delete/${id}`, {
        headers: authHeader()
      }).then(res => {
        console.log(res);
        console.log(res.data);
      })
    } 
    function sumValue(){
        const init = 0;
        console.log("cccc = "+init)
        var sum = satellite.ores.map(s => s.value).reduce((previousValue, currentValue) => previousValue + currentValue, init);
        console.log("ccsscc = "+sum)
        return sum;
    }
    function valueCalculate(value){
        const init = 0;
        var sum = satellite.objectOre.map(s => s.value).reduce((previousValue, currentValue) => previousValue + currentValue, init)
        return (value/sum)*100;
    } 
    const [showEN, setShowEN] = useState(false)
    const [editN, setEditN] = useState(false)
    const [oreActive, setOreActive] = useState(false)
    const [objOre, setObjOre] = useState({
      "id":"id",
      "name":"name",
      "value":10
    });
    const [planet, setPlanet] = useState({});
    const [planetActive, setPlanetActive] = useState(false)
    useEffect(() => {objOre.satellite !== undefined ?
      axios.post("http://localhost:8080/objore/add", objOre, {
        headers: authHeader()
      }) //{"id":oreId, "name": nameOre, "value":valueOre, "satId":satId}
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    : console.log("nope objOre = "+ objOre.satellite)}, [objOre]);
    
    useEffect(() => {planet.id !== undefined ?
      axios.post("http://localhost:8080/satellite/add", planet, {
        headers: authHeader()
      }) //{"id":oreId, "name": nameOre, "value":valueOre, "satId":satId}
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    : console.log("nope planet = "+ planet.satellite)}, [planet]);
    return (
    <div className="space" style={styles.space}>
        {error != undefined ? <ErrorPage code={error.response.status} message={error.response.data.message}/> : <div>
        <div className="big-text" style={styles.psName} onMouseEnter={()=>setShowEN(!showEN)} onMouseLeave={()=>setShowEN(!showEN)} contentEditable={editN}>
            {satellite.name}
            {showEN && <img src={CreateLogo} id="img" alt="Create Logo" style={styles.img} onClick={()=> setEditN(!editN)}/>}
        </div>
            
        <ul className="ul" style={styles.ul}>
            <li>
                <div className="big-text" >climate:</div>
                <NameElement name={satellite.climate.climateName} link={``} color={satellite.climate.color} colorName={satellite.climate.color} type={'ball'}/>
                
                
            </li>

            <li>
                <div className="big-text" onClick={() => setOreActive(!oreActive)}>ores:</div>
                <ul className="ul" style={styles.ul}>
                {satellite.objectOre?.map(objectOre => {
                  return <li key = {objectOre.ore.id}><NameElement name={objectOre.ore.name} link={''} colorName={'255,255,255'} color={objectOre.ore.color} type={'rhomb'}/></li>
                })}
                </ul>
            </li>
            <li>
                <div className="big-text" onClick={() => setPlanetActive(!oreActive)}>moons:</div>
                <ul className="ul" style={styles.ul}>
                {satellite.satellites?.map(sat => {
                  return <li key={sat.id}><NameElement name={sat.name} link={`/planet/${sat.id}`} colorName={sat.climate.color} color={sat.climate.color} type={'ball'}/></li>
                })}
                </ul>
            </li>
        </ul>
        <div className="ring" style={stylesSat.ring}>
            <div className ="sat" style={stylesSat.sat}></div>
        </div>
        <div style={styles.del}>
          <div className="big-text" onClick={() => saveFun()}>save</div>
          <div className="big-text" onClick={() => delFun()}>delete</div>
        </div>
        {oreActive && <AddOreModal satellite={satellite} setObjOre={setObjOre} active={oreActive} setActive={setOreActive}/>}
        {planetActive && <AddPlanetModal planetSystem={null} satellite={satellite} setSatellite={setPlanet} setActivePl={setPlanetActive}/>}
        </div>}
      </div>
    );
  }
  
  export default PlanetPage;