import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import TextField from '@mui/material/TextField';
import { useAuth } from '../../../hooks/authProvider';

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  const payload = {
    username,
    password,
  };

  const handleLogin = (e) => {
    e.preventDefault(); // nevem zakaj mora bit to samo pusti na miru :)
    auth.login(payload);
  };

  return (
    <div className="login-container">

      <div className='login-art'>
        <h1 style={{paddingLeft: "5%"}}>BKeep™</h1>
        <p style={{marginTop: "0%",paddingLeft:"5%"}}>honey&hives</p>
      </div>


      <div className='login-forum'>
      <h2 style={{ marginBottom: "0"}}>Prijavi se,</h2>
      <h2 style={{ marginTop: "0"}}>panji se polnijo🍯</h2>
      <form onSubmit={handleLogin} className="form-container">

          <TextField
            required
            label="Ime"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
  
          <TextField
            required
            label="Geslo"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />

        <button type="submit" className="login-button" onClick={handleLogin}>
          Prijava
        </button>
      </form>
      </div>

    </div>
  );
}
