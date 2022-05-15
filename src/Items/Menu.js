import React from "react";
import CreateMenu from "./CreateMenu";
import AccountMenu from "./AccountMenu";



const styles = {
    panel:{
        position: 'fixed',
        right: '0',
        width: '320px',
        right: '-280px',
        'transition': 'right .2s linear',
    },
    title:{
        'width': '280px',
        'align':'right',
        'fontSize': '50px',
        'color': 'rgb(255, 255, 255)',
    },
    img:{
        width: '40px',
        height: '40px',
    }
}

function Menu(props) {
    function mouseEnter(){
        const panel = document.getElementById('panel');
        panel.style.right = '0px'
    }
    function mouseLeave(){
        const panel = document.getElementById('panel');
        panel.style.right = '-280px'
    }
    
    return (
        <div id="panel" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}  style={styles.panel}>
            <div>
                <AccountMenu/>
            </div>
            <div>
                <CreateMenu props = {props}/>
            </div>
        </div>
    );
  }
  
  export default Menu;