import axios from "axios";
import React, { useEffect, useState , useRef} from "react";
import {Link, useParams} from 'react-router-dom'
import NameElement from "../Items/Elements/NameElement";
import AddPlanetModal from "../Items/Modal/AddPlanetModal";
import PlanetSystemItem from "../Items/PlanetSystemItem";
import authHeader from "../Items/Security/auth-header";
import ErrorPage from "./ErrorPage";


const styles = {
  psName:{
    fontSize: '100px',
    color: 'rgb(255, 255, 255)',
    //position: 'absolute',
    margin: '0px',
  },
  ul:{
    listStyleType:'none',
    //position: 'absolute',
    color: 'rgb(255, 255, 255)',
    fontSize: '50px',
    
  },
  del:{
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    bottom: '50px',
    right:'50px',
  },
  coord:{
    position: 'absolute',
    top: '50px',
    right:'50px',
  }
}
function buildFileSelector(){
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('multiple', 'multiple');
  return fileSelector;
}
function PlanetSystemPage() {
  const inputFile = useRef()
    const {id} = useParams();
    const [loadFile, setLoadFile] = useState();
    const [planetSystem, setPlanetSystem] = useState('');
    const [planetActive, setPlanetActive] = useState(false)
    const [Xcoord, setXcoord] = useState(0)
    const [Ycoord, setYcoord] = useState(0)
    const [satellite, setSatellite] = useState({
      "id":'',
      "name":'',
      "value":''
    })
    const [error, setError] = useState();
    const fetchPlanetSystems = () => {
      axios.get("http://localhost:8080/universe/find/"+id, {
        headers: authHeader()
      }).then(res =>{
        console.log(res);
        setPlanetSystem(res.data);
      }).catch((error) => {
        console.log("Ошибочка");
        console.error(error.response);
        setError(error);
      });
    };
    const stylesball = {
      ball:{
        borderRadius: '50%',
        background: 'orange',
        boxShadow: '0 0 10px orange, 0 0 50px orange',
      }
    }
    


    
    useEffect(() => {
      fetchPlanetSystems();
    },[]);

    useEffect(() => {
      setXcoord(planetSystem.xcoord)
      
      setYcoord(planetSystem.ycoord)
    },[planetSystem])

    function delFun(){
      axios.delete(`http://localhost:8080/universe/delete/${id}`, {
        headers: authHeader()
      }).then(res => {
        console.log(res);
        console.log(res.data);
      })
    } 
    function saveFun(){
      axios.get(`http://localhost:8080/universe/save/${id}`, {
        headers: authHeader()
      }).then(res => {
        console.log(res);
        console.log(res.data);
      })
    } 
    function loadFun(){
      axios.post("http://localhost:8080/satellite/load", planetSystem, {
      headers: authHeader()
      }).then(res => {
        console.log(res);
        console.log(res.data);
      })
    } 
    function submitClick(e){
      var newPS ={
        id: planetSystem.id,
        name: planetSystem.name,
        satellites: planetSystem.satellites,
        xcoord: Xcoord,
        ycoord: Ycoord
      }
      axios.post(`http://localhost:8080/universe/update`,newPS, {
        headers: authHeader()
      }).then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
    
  function openFileDialog() {
      // `current` points to the mounted file input element
    inputFile.current.click();
    console.log(inputFile)
  }
  useEffect(() => {satellite.id !== '' ?
    (axios.post("http://localhost:8080/satellite/add", satellite, {
      headers: authHeader()
    }) //{"id":oreId, "name": nameOre, "value":valueOre, "satId":satId}
      .then(res => {
          console.log(res);
          console.log(res.data);
      }))
  : console.log("nope sat = "+ satellite.id)}, [satellite]);
    console.log("ps = "+planetSystem.satellites);
    return (
      <div className="space">
        {error != undefined ? <ErrorPage code={error.response.status} message={error.response.data.message}/> : <div>
        {planetSystem != '' && <PlanetSystemItem ps = {planetSystem} ycoord={500} xcoord={1200}/>}
        <div className="big-text" style={styles.psName}>{planetSystem.name}</div>
        <ul className="ul" style={styles.ul}>
            <li>
                <div className="big-text">Central object:</div>
                <div  className="thin-text">Sun</div>
            </li>
            <li>
                <div className="big-text" onClick={() => setPlanetActive(!planetActive)}>planets:</div>
                <ul className="ul" style={styles.ul}>
                {planetSystem.satellites?.map(sat => {
                  return <li key={sat.id}><NameElement name={sat.name} link={`/planet/${sat.id}`} color={sat.climate.color} colorName={'255,255,255'} type={'ball'}/></li>
                })}
                </ul>
            </li>
        </ul>
        <div style={styles.coord}>
          <input type="number" className="coordX" style={styles.input} value={Xcoord} onChange={(e)=>setXcoord(e.target.value)}/>
          <input type="number" className="coordY" style={styles.input} value={Ycoord} onChange={(e)=>setYcoord(e.target.value)}/>
          <div className="big-text" style={styles.but} onClick={(e) => submitClick(e)}>ok</div>
        </div>

        <div style={styles.del}>
          <div className="big-text" >save</div>
          
          <div className="big-text" onClick={()=> openFileDialog()}>load</div>
          <div className="big-text" onClick={() => delFun()}>delete</div>
        </div>
        
        {planetActive && <AddPlanetModal planetSystem={planetSystem} setSatellite={setSatellite} activePl={planetActive} setActivePl={setPlanetActive}/>}
        </div>}
      </div>
    );
  }
  
  export default PlanetSystemPage;