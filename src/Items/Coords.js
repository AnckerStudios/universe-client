import React, { useRef, useState } from "react";
import PlanetSystemItem from "./PlanetSystemItem";


function Coords(props) {
  const coords = '0,0'; 
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
      coords = shiftX;
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);
    
    console.log(shiftX) 
    container.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      uni.onmouseup = null;
    };
  }
  
  return (
    <div className="conteiner" onMouseDown={onMouseDown} id="mapConteiner" >
      <div className="big-text">{coords}</div>
      <div className="uni" id="uni">
        <div>
        {props != null ? (props.planetSystems.map(ps => {
          return <PlanetSystemItem ps = {ps} key = {ps.id}/>
        })) : 'Noyp'}
        </div>
      </div>
    </div>
  )
}
  
export default Coords;