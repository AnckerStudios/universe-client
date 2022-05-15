import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const styles = {
    con:{
        width: '100%',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'space-between',
        borderBottom:'1px solid #757575',
        textDecoration: 'none',
    },
    con2:{
        flexDirection: 'column',
    },
    name:{
        fontSize: '40px',
        color: '#88D2EC',
    },
    img:{
        width: '40px',
        height: '40px',
    },
    
}

function SSearch({sat}) {
    return (
        <Link style={styles.con} to={'/planet/'+sat.id}>
            <div style={styles.con2}>
                <div className="thin-text">planet</div>
                <div className="big-text" style={styles.name}>{sat.name}</div>
            </div>
        </Link>
    );
  }
  
  export default SSearch;