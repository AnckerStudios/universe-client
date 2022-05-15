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
        color: '#1cdd5c',
    },
    img:{
        width: '40px',
        height: '40px',
    },
    
}

function PSSearch({ps}) {
    const [list, setList] = useState();
    const [searchActive, setSearchActive] = useState(false);
    const [searchStr, setSearchStr] = useState('');
    const [psSearch, setPsSearch] = useState([]);
    return (
        <Link style={styles.con} to={'/planetSystem/'+ps.id}>
            <div style={styles.con2}>
                <div className="thin-text">planet system</div>
                <div className="big-text" style={styles.name}>{ps.name}</div>
            </div>
        </Link>
    );
  }
  
  export default PSSearch;