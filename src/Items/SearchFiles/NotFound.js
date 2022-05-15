import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const styles = {
    con:{
        width: '100%',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        borderBottom:'1px solid #757575',
        textDecoration: 'none',
    },
    con2:{
        flexDirection: 'column',
    },
    name:{
        fontSize: '20px',
        color: '#1cdd5c',
    },
    name2:{
        fontSize: '20px',
    }
    
}

function NotFound({str}) {
    

    return (
        <div style={styles.con}>
            <div style={styles.con2}>
                <div className="big-text" >Oh no,</div>
                <div>
                    <div className="big-text" style={styles.name}>{str}</div>&nbsp;
                    <div className="big-text" style={styles.name2}> is nowhere to be found</div>
                </div>     
            </div>
        </div>
    );
  }
  
  export default NotFound;