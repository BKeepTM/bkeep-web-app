import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import TextField from '@mui/material/TextField';

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  const payload = {
    username,
    password,
    email,
  };

  const handleRegister = (e) => {
    e.preventDefault();

    axios
      .post(`${apiUrl}/users/register`, payload)
      .then(() => navigate('/login'))
      .catch((error) => {
        console.log('API URL:', apiUrl);
        console.error('Napaka pri registraciji:', error.message);
      });
  };

  return (
    <div className='register-container'>

    <div className='register-forum'>
      <h2 style={{ marginBottom: "0"}}>Še nimaš računa?</h2>
      <h2 style={{ marginTop: "0"}}>Registriraj se🐝</h2>
      <form onSubmit={handleRegister} className='form-container'>

        <TextField
          required
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

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

        <button type="submit" className="register-button">
          Ustvari račun
        </button>
      </form>
      </div>

      <div className='register-art'>
        <div style={{display: "flex", flexDirection: "column", paddingRight:"5%"}}>
        <h1>BKeep™</h1>
        <p style={{marginTop: "0%"}}>honey&hives</p>
        </div>
      </div>
  </div>

  );
}
