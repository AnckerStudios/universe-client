import React, { useEffect, useRef, useState } from "react";
import PlanetSystemItem from "./PlanetSystemItem";
import axios from "axios";
import authHeader from "./Security/auth-header";

var dx = 0;
var dy = 0;
function UniverseMap() {
  const [coords,setCoords] = useState({
    x: 0,
    y: 0
  }); 
  const [planetSystems, setPlanetSystems] = useState([]); 
  

  const range = window.screen.width/2 + 500;


  useEffect( () => {
    console.log("hgfh");
    //console.log("token2 = "+JSON.getItem('user'))
    axios.post("http://localhost:8080/universe/findByCoords", {
      coordX: dx + window.screen.width/2,
      coordY: dy + window.screen.height/2,
      range: range*1.5
    }, {
      headers: authHeader()
    }
    ).then(res => {
            console.log(res);
            setPlanetSystems(res.data);
        })
  },[])
  function onMouseDown(e){
    const uni = document.getElementById('uni');
    const container = document.getElementById('mapConteiner');
    const width = uni.getBoundingClientRect().left;;
    const height = uni.getBoundingClientRect().top;
    let shiftX = e.clientX - width;
    let shiftY = e.clientY - height;
    
    function moveAt(pageX, pageY) {
      uni.style.left = pageX - shiftX + 'px';
      uni.style.top = pageY - shiftY + 'px';
      setCoords({x: 0 - (pageX - shiftX), y: 0 - (pageY - shiftY)})
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);
    console.log("old dx1= "+(dx-range)+" dx2= "+(dx+range)+" dy1= "+ (dy-range)+" dy2= "+ (dy+range))
    console.log({x:shiftX,y:shiftY}) 
    container.onmouseup = function() {
      if(coords.x < dx-range || coords.x > dx+range || coords.y < dy-range || coords.y > dy+range){
        dx = coords.x;
        dy = coords.y;
        console.log("x= "+coords.x+" y= "+ coords.y)
        console.log("dx1= "+(dx-range)+" dx2= "+(dx+range)+" dy1= "+ (dy-range)+" dy2= "+ (dy+range))
        axios.post("http://localhost:8080/universe/findByCoords", {
          coordX: coords.x + window.screen.width/2,
          coordY: coords.y + window.screen.height/2,
          range: range*1.5
        }, {headers: authHeader()}).then(res => {
          console.log(res);
          setPlanetSystems(res.data);
        })
      }
      document.removeEventListener('mousemove', onMouseMove);
      uni.onmouseup = null;
    };
  }
  
  return (
    <div className="conteiner" onMouseDown={onMouseDown} id="mapConteiner" >
      <div className="big-text">{coords.x},{coords.y}</div>

      <div className="uni" id="uni">
        <div>
        {planetSystems != null ? (planetSystems.map(ps => {
          return <PlanetSystemItem ps = {ps} ycoord={ps.ycoord} xcoord={ps.xcoord} key = {ps.id}/>
        })) : 'Noyp'}
        </div>
      </div>
    </div>
  )
}
  
export default UniverseMap;