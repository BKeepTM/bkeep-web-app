import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import TextField from '@mui/material/TextField';
import { useAuth } from '../../../hooks/authProvider';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 

  const payload = { username, password };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      await auth.login(payload); 
    } catch (err) {
      setError("Napačno uporabniško ime ali geslo!"); 
    }
  };

  return (
    <div className="login-container">
      <div className='login-art'>
        <h1 style={{ paddingLeft: "5%" }}>BKeep™</h1>
        <p style={{ marginTop: "0%", paddingLeft: "5%" }}>honey&hives</p>
      </div>

      <div className='login-forum'>
        <h2 style={{ marginBottom: "0" }}>Prijavi se,</h2>
        <h2 style={{ marginTop: "0" }}>panji se polnijo🍯</h2>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Napaka pri prijavi</AlertTitle>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin} className="form-container">
          <TextField
            required
            label="Ime"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            sx={{mb:1}}
          />

          <TextField
            required
            label="Geslo"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            sx={{mb:1}}
            type="password"
          />

          <button type="submit" className="login-button">
            Prijava
          </button>
        </form>
      </div>
    </div>
  );
}
