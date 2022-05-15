import React, { useEffect, useState } from "react";

const styles = {
    
}

function InputField({name, type, event}) {
    return (
        <div style={styles.con}>
            <div class="group">      
                <input type={type} required onChange={(e)=>event(e.target.value)}/>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="label">{name}</label>
            </div>
        </div>
    );
  }
  
export default InputField;