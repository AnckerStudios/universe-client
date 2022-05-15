import React, { useEffect, useState } from "react";
import {Link, Navigate, useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import AuthService from "../Items/Security/auth.service";

const styles = {
    space:{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        margin: '0px 0px 50px 0px',
        fontSize: '30px',
        color: '#1cdd5c',
    },
    con:{
        width: '250px',
    },
    but:{
      
        position: 'relative',
        borderRadius: '5px',
        width: '100%',
        height: '43px',
        backgroundColor: 'rgb(255,255,255)',
        color: 'rgb(0, 0, 0)',
        fontSize: '30px',
        bottom:'0',
        textAlign: 'center',
    },
    ring:{
        width: '700px',
        height: '700px',
        border: '2px solid rgb(0, 191, 129)',
        animation: 'animate infinite 10s linear'
    },
    
}
function LoginPage() {
    let navigate = useNavigate();
    const [username, setLogin] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState("");
    function submitClick(){
        AuthService.login(username,password).then(()=>{
            navigate("/home")
            //window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
        })
        
    }
    return (
        <div className="space" style={styles.space}>
            
            <div className="thin-text" style={styles.text}>LOGIN</div>
            <div style={styles.con}>
                <div class="group">      
                    <input type="text" required onChange={(e)=>setLogin(e.target.value)}/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label class="label">Username</label>
                </div>
            </div>
            <div style={styles.con}>
                <div class="group">      
                    <input type="password" required onChange={(e)=>setPassword(e.target.value)}/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label class="label">Password</label>
                </div>
            </div>
            <div style={styles.con}>
                <div className="buttom" onClick={(e) => submitClick(e)}>login</div>
            </div>
            <Link className="thin-text" to={"/reg"}>or register</Link>
            {message && (
            <div className="form-group">
              <div className="big-text" role="alert">
                {message}
              </div>
            </div>)}
            
        </div>
    );
    /*return (
        <div className="space" style={styles.space}>
            <div className="big-text" style={styles.text}>
                <input type="text" style={styles.input} onChange={(e)=>setLogin(e.target.value)} placeholder="name"/>
            </div>
            <div className="big-text" style={styles.text}>
                <input type="text" style={styles.input} onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
            </div>
            <div className="big-text" style={styles.but} onClick={(e) => submitClick(e)}>login</div>
            <Link className="big-text"  to={"/reg"}>or reg</Link>
            {message && (
            <div className="form-group">
              <div className="big-text" role="alert">
                {message}
              </div>
            </div>)}
        </div>
    );*/
  }
  
  export default LoginPage;