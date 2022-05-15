import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import { fadeIn } from 'react-animations'


function SatelliteItem({sat}) {
  //const colors = ['rgb(0, 191, 129','rgb(138, 203, 255','rgb(255, 114, 42'];
  //const color = colors[getRandom(0,3)];
  
  const styles = {
    ring:{
        'width': sat.radius*2+'px',
        'height': sat.radius*2+'px',
        'border': '2px solid rgb('+sat.climate.color+')',
        'animation': 'animate infinite '+sat.radius/10+'s linear'
    },
    sat:{
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'center',
        'top': (sat.radius*0.288)-(sizeSat()/2)+'px',
        'left': (sat.radius*0.288)-(sizeSat()/2)+'px',
        'width': sizeSat()+'px',
        'height': sizeSat()+'px',
        'background': 'rgb('+sat.climate.color+')', //colorSut()
        'boxShadow': '0 0 10px rgb('+sat.climate.color+'),'+
                      '0 0 50px rgb('+sat.climate.color+')',
    }
  }

  function sizeSat(){
    const init = 0;
    var sum = sat.objectOre.map(s => s.value).reduce((previousValue, currentValue) => previousValue + currentValue, init)
    console.log(sum)
    if(sum > sat.radius*0.4)
      return sat.radius*0.4;
    else if(sum < sat.radius*0.1)
      return sat.radius*0.1
    else
      return sum;
  }

  
  //const color = colors[Math.floor(Math.random() * (3))];
  const diam = getRandom(15,30)
  function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  
    return (
        <div className="ring" style={styles.ring}>
            <Link className ="sat" style={styles.sat} to={'/planet/'+sat.id}>
            {sat.satellites?.map(sat => {
              console.log("sat yes")
              return <SatelliteItem sat = {sat} key = {sat.id}/>
            })}
            </Link>
        </div>
    );
  }
  
  export default SatelliteItem;