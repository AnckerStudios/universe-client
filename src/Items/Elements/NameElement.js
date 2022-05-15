import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const styles = {
    con:{
        display: 'flex',
        alignItems: 'center'
    }
}

function NameElement({name, link, color, type, colorName}) {
    const styletype = {
        type:{
            width: '15px',
            height: '15px',
            margin: '15px',
            background: `rgb(${color})`,
            boxShadow: `0 0 10px rgb(${color}), 0 0 50px rgb(${color})`,
        },
        text:{
            color: `rgb(${color})`
        }
      }
    return (
        <div style={styles.con}>
            <div className={type} style={styletype.type}></div>
            <Link className="thin-text" to={link} style={styletype.text} onClick={render()}>{name}</Link>
        </div>
        
    );
  }
  
export default NameElement;