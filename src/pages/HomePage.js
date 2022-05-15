import React from "react";
import {Link} from 'react-router-dom'
import PlanetSystemItem from "../Items/PlanetSystemItem";

const styles = {
    go:{
      position: 'absolute',
      right:'0px',
      margin:'10px',
      borderRadius: '12px',
      width: '180px',
      height: '60px',
      backgroundColor: 'rgb(255,255,255)',
      color: 'rgb(0, 0, 0)',
      fontSize: '40px',
      textAlign: 'center',
    },
    make:{
      fontSize: '100px',
      bottom:'200px',
      position: 'absolute',
    },
    uni:{
      fontSize: '250px',
      bottom:'-50px',
      position: 'absolute',
    },
    ps:{
      bottom: '10%',
      right: '5%',
    },
    star:{
      width: '300px',
      height: '300px',
      boxShadow: '0 0 10px orange, 0 0 50px orange',
    },
    ring1:{
      width: 300*2+'px',
      height: 300*2+'px',
      border: '2px solid rgb(0, 191, 129)',
      animation: 'animate infinite 9s linear'
    },
    sat1:{
      top: (300*0.30)-(100/2)+'px',
      left: (300*0.30)-(100/2)+'px',
      width: 100+'px',
      height: 100+'px',
      background: 'rgb(0, 191, 129)',
      boxShadow: '0 0 10px rgb(0, 191, 129), 0 0 50px rgb(0, 191, 129)',
    },
    ring2:{
      width: 450*2+'px',
      height: 450*2+'px',
      border: '2px solid rgb(15, 223, 255)',
      animation: 'animate infinite 11s linear'
    },
    sat2:{
      top: (450*0.30)-(150/2)+'px',
      left: (450*0.30)-(150/2)+'px',
      width: 150+'px',
      height: 150+'px',
      background: 'rgb(15, 223, 255)',
      boxShadow: '0 0 10px rgb(15, 223, 255),'+
                    '0 0 50px rgb(15, 223, 255)',
    },
    ring3:{
      width: '1600px',
      height: '1600px',
      border: '2px solid rgb(255, 102, 255)',
      animation: 'animate infinite 10s linear'
    },
    sat3:{
      top: (800*0.30)-(70/2)+'px',
      left: (800*0.30)-(70/2)+'px',
      width: 70+'px',
      height: 70+'px',
      background: 'rgb(255, 102, 255)',
      boxShadow: '0 0 10px rgb(255, 102, 255),'+
                    '0 0 50px rgb(255, 102, 255)',
    }
  };
function HomePage() {
    const ps = {"id":"e7e01748-ba91-4376-959d-f96e1bb3e464","name":"PS","satellites":[{"id":"f835742d-8359-480b-b943-d17e4685cd57","name":"moon","discriminator":"satellite","climate":"e","radius":50,"ores":[],"creatures":[]},{"id":"57231504-9c98-428f-8970-4bfa80bdc924","name":"hh","discriminator":"planet","climate":"norm","radius":60,"ores":[{"id":"326232f1-6487-4f98-a5a9-cf13ac41d1c6","name":"copper"},{"id":"e14c03d3-8b94-4965-8e85-240c072e1faa","name":"tin"}],"creatures":[]},{"id":"a0b5b7f9-7a92-43e9-b4cb-18650873cda5","name":"sat","discriminator":"satellite","climate":"n","radius":130,"ores":[],"creatures":[]},{"id":"f7102fa4-6281-4596-85cc-6c28ff5e78dd","name":"planet","discriminator":"planet","climate":"n","radius":170,"ores":[{"id":"ad0ab2a6-934f-40e7-928c-508445e066be","name":"iron"}],"creatures":[]}],"coords":"700,550"};
    return (
      <div className="space">
        <div className ="planetSystem" style={styles.ps}>
          <div className="centralObj" style={styles.star}></div>
          <div className="ring" style={styles.ring1}>
            <div className ="sat" style={styles.sat1}></div>
          </div>
          <div className="ring" style={styles.ring2}>
            <div className ="sat" style={styles.sat2}></div>
          </div>
          <div className="ring" style={styles.ring3}>
            <div className ="sat" style={styles.sat3}></div>
            
          </div>
        </div>

        <Link className="big-text" style={styles.go} to="/universe">start</Link>

        <div className="thin-text" style={styles.make}>make the</div>
        <div className="big-text" style={styles.uni}>UNIVERSE</div>
        
      </div>
    );
  }
  
  export default HomePage;