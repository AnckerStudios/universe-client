import axios from "axios";
import React, { useEffect, useState } from "react";
import PSSearch from "./PSSearch";
import searchLogo from "../../imgs/searchLogo.svg"
import SSearch from "./SSearch";
import authHeader from "../Security/auth-header";
import OreSearch from "./OreSearch";
import NotFound from "./NotFound";

const styles = {
    con:{
        zIndex: 1,
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
    },
    con2:{
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
    },
    con3:{
        zIndex: 1,
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
    },
    img:{
        width: '40px',
        height: '40px',
    },
    inpt:{
        width: '30%',
    },
    z:{
        zIndex: 0,
    }
    
}

function Search() {
    const [list, setList] = useState();
    const [searchActive, setSearchActive] = useState(false);
    const [searchStr, setSearchStr] = useState('');
    const [sSearch, setSSearch] = useState([]);
    const [oreSearch, setOreSearch] = useState([]);
    const [psSearch, setPsSearch] = useState([]);
    function openSearch(){
        const formSearch = document.getElementById('formSearch');
        formSearch.style.visibility = 'visible';
        
    }
    function onSearch(e){
        if(searchStr!=''){
        console.log("PS = "+psSearch)
        axios.get('http://localhost:8080/universe/findByName/'+searchStr, {headers: authHeader()}).then(res =>{
            console.log(res);
            setPsSearch(res.data);
        });
        axios.get('http://localhost:8080/satellite/findByName/'+searchStr, {headers: authHeader()}).then(res =>{
            console.log(res);
            setSSearch(res.data);
        });
        axios.get('http://localhost:8080/objore/findSatByOre/'+searchStr, {headers: authHeader()}).then(res =>{
            console.log(res);
            setOreSearch(res.data);
        });
        setSearchActive(true);
        }
    }
    return (
        <div style={styles.con}>
            
            <div style={styles.con2}>
                <img src={searchLogo} alt="Search Logo" style={styles.img} onClick={(e) => onSearch(e)}/>
                &nbsp;
                <div class="group" style={styles.inpt}>      
                    <input type="text" required onChange={(e)=>setSearchStr(e.target.value)} />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label class="label">Search</label>
                </div>
            </div>
            {searchActive && searchStr!='' && <div className="modal" style={styles.z} onClick={()=>setSearchActive(false)} ></div>}
            {searchActive && searchStr!='' && 
                <div style={styles.con3}>
                {psSearch.map(ps => {
                    return <PSSearch ps={ps}/>
                })}
                {sSearch.map(sat => {
                    return <SSearch sat={sat}/>
                })}
                {oreSearch.map(sat => {
                    return <OreSearch sat={sat} ore ={searchStr}/>
                })}
                {psSearch.length == 0 && sSearch.length == 0 && oreSearch.length == 0 && <NotFound str ={searchStr} />}
            </div>}
        </div>
    );
  }
  
  export default Search;