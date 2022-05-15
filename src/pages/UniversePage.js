import React from "react";
import axios from "axios";
import { useEffect, useState } from 'react';
import UniverseMap from "../Items/universeMap";
import Menu from "../Items/Menu";
import authHeader from "../Items/Security/auth-header";
import Search from "../Items/SearchFiles/Search";


const styles = {
  del:{
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    bottom: '50px',
    right:'50px',
  },
  fileDialog:{
    display:'none',
  }
}

function UniversePage() {
 
  //const [gg,setGg] = useState();
    const [planetSystems, setPlanetSystems] = useState([]);
    const [file, setFile] = useState();
    useEffect(() => {console.log("file "+file)},[file])
    const fetchPlanetSystems = () => {
      axios.get("http://localhost:8080/universe/all", {
        headers: authHeader()
      }).then(res =>{
        console.log(res);
        setPlanetSystems(res.data);
      });
    };
    function saveFun(){
      axios.get(`http://localhost:8080/universe/load`, {
        headers: authHeader()
      }).then(res => {
        console.log(res);
        console.log(res.data);
      })
    } 
    function loadFun(e){
      
      axios.post(`http://localhost:8080/universe/load`, file,{
        headers: authHeader()
      }).then(res => {
        console.log(res);
        console.log(res.data);
      })
    } ;
    
    
    return (
      <div className="space">
        <UniverseMap />
        <Search/>
        <Menu planetSystems={planetSystems} ></Menu>
        <div style={styles.del}>
          <div className="big-text" onClick={() => saveFun()}>save</div>
          <div className="big-text" onClick={() => loadFun()}>load</div>
          <input type="text" onChange={(e)=>setFile(e.target.value)}/>
        </div>
      </div>
    );
  }
  
  export default UniversePage;