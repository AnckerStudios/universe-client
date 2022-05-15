import React, { useEffect, useState } from "react";
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
        margin: '10px',
        fontSize: '50px',
    },
    but:{
        margin: '20px',
        position: 'relative',
        borderRadius: '12px',
        width: '180px',
        height: '60px',
        backgroundColor: 'rgb(255,255,255)',
        color: 'rgb(0, 0, 0)',
        fontSize: '40px',
        bottom:'0',
        textAlign: 'center',
    },
    input:{
        margin: '10px',
        width: '250px',
        height: 'calc(2.25rem + 2px)',
        padding: '0.375rem 0.75rem',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '2rem',
        fontWeight: '400',
        lineHeight: '0.5',
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.6)',
        backgroundClip: 'padding-box',
        border: '1px solid #bdbdbd',
        borderRadius:' 12px',
        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
        '-webkit-appearance': 'none',
        '-moz-appearance': 'none',
        appearance: 'none',
      },
}
function RegisterPage() {
    let navigate = useNavigate();
    const [username, setLogin] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState("");
    function submitClick(){
        AuthService.register(username,password).then(()=>{
            navigate("/login")
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
            <div className="big-text" style={styles.text}>
                <input type="text" style={styles.input} onChange={(e)=>setLogin(e.target.value)} placeholder="name"/>
            </div>
            <div className="big-text" style={styles.text}>
                <input type="text" style={styles.input} onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
            </div>
            <div className="big-text" style={styles.but} onClick={(e) => submitClick(e)}>register</div>
            {message && (
            <div className="form-group">
              <div className="big-text" role="alert">
                {message}
              </div>
            </div>)}
        </div>
    );
  }
  
  export default RegisterPage;