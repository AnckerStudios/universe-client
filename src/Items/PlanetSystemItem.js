import React from "react";
import {Link} from 'react-router-dom'
import SatelliteItem from "./SatelliteItem";
import { bounce } from 'react-animations';

//const Bounce = styled.div`animation: 2s ${keyframes`${bounce}`} infinite`;

function PlanetSystemItem({ps, ycoord, xcoord}) {

  const styles = {
    ps:{
      top: ycoord+'px',
      left: xcoord+'px'

    },
  };
    return (
      //<Bounce>
        <Link className ="planetSystem" style={styles.ps} to={'/planetSystem/'+ps.id}>
          <div className="centralObj"></div>
          {ps.satellites.map(sat => {
            return <SatelliteItem sat = {sat} key = {sat.id}/>
          })}
        </Link>
      //</Bounce>
    );
  }
  
  export default PlanetSystemItem;