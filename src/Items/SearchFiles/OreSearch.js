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
    },
    ore:{
        fontSize: '20px',
        color: '#1cdd5c',
    },
    img:{
        width: '40px',
        height: '40px',
    },
    
}

function OreSearch({sat, ore}) {
    const [list, setList] = useState();
    const [searchActive, setSearchActive] = useState(false);
    const [searchStr, setSearchStr] = useState('');
    const [psSearch, setPsSearch] = useState([]);
    var s = sat.objectOre.find(item => item.name=ore)
    console.log("sss fas = "+sat.objectOre.find(item => item.name=ore).value)
    return (
        <Link style={styles.con} to={'/planet/'+sat.id}>
            <div style={styles.con2}>
                <div className="thin-text">planet</div>
                <div className="big-text" style={styles.name}>{sat.name}</div>
            </div>
            <div style={styles.con2}>
                <div className="thin-text">ore</div>
                <div className="big-text" style={styles.ore}>{ore} {sat.objectOre.find(item => item.name=ore).value}</div>
            </div>
        </Link>
    );
  }
  
  export default OreSearch;