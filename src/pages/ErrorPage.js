import React from "react";
import {Link} from 'react-router-dom'
import PlanetSystemItem from "../Items/PlanetSystemItem";

const styles = {
    con:{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        textDecoration: 'none',
        flexDirection: 'column',
    },
    code:{
        fontSize: '150px',
        color: '#1cdd5c',
    },
    mes:{
        fontSize: '30px',
    },
  };
function ErrorPage({code, message}) {
    return (
        <div className="space">
            <div style={styles.con}>
                <div className="big-text" style={styles.code}>{code}</div>
                <div className="thin-text" style={styles.mes}>{message}</div>
            </div> 
        </div>
    );
  }
  
  export default ErrorPage;