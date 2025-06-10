import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import profilePic from '../../../assets/images/Profil_Bkeep.png';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('site');
  const decoded = jwtDecode(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    axios
      .get(`${apiUrl}/users/${decoded.data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const user = res.data;
        setUserData({
          username: user.username,
          email: user.mail,
        });
      })
      .catch((err) => {
        console.error("Napaka pri pridobivanju uporabnika:", err);
      });
  }, []);

  const handleChange = (field) => (e) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleSave = async () => {
    setLoading(true);
    const updatedData = {};
    if (editMode.username) updatedData.username = userData.username;
    if (editMode.email) updatedData.mail = userData.email;

    try {
      await axios.post(`${apiUrl}/users/update`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditMode({ username: false, email: false });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Gesli se ne ujemata!");
      return;
    }

    try {
      await axios.post(`${apiUrl}/users/update`, {
        password: newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch (error) {
      alert("Napaka pri spremembi gesla!");
      console.error(error);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(8deg,rgb(249, 250, 247), #FFEAA7)', height: "100vh", paddingTop:2 }}>
      <Box sx={{ maxWidth: 500, margin: "auto", p: 3, boxShadow: 3, borderRadius: 2, background: 'white', mt:2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/home')}
          sx={{ margin: '2%', color: "black", borderColor: "black", mb: 2 }}
        >
          Zapusti Profil
        </Button>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img src={profilePic} alt="Profilna slika" width={250} />
        </Box>

        {["username", "email"].map((field) => (
          <Box key={field} sx={{ my: 2 }}>
            <TextField
              label={field === "email" ? "E-pošta" : "Uporabniško ime"}
              type="text"
              fullWidth
              value={userData[field]}
              onChange={handleChange(field)}
              onClick={() => handleEdit(field)}
            />
          </Box>
        ))}

        <Button
          variant="outlined"
          onClick={handleSave}
          disabled={loading}
          fullWidth
          sx={{ color: "black", borderColor: "black", mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Shrani spremembe"}
        </Button>

        <Typography variant="h6" sx={{ mt: 4 }}>Spremeni geslo:</Typography>
        {!showPasswordForm ? (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setShowPasswordForm(true)}
            sx={{color: "black", borderColor: "black", mb: 2 }}
          >
            Spremeni geslo
          </Button>
        ) : (
          <>
            <TextField
              label="Novo geslo"
              type="password"
              fullWidth
              sx={{ mt: 2 }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              label="Potrdi geslo"
              type="password"
              fullWidth
              sx={{ mt: 2 }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              variant="outlined"
              fullWidth
              sx={{color: "black", borderColor: "black", mb: 2, mt: 2 }}
              onClick={handlePasswordChange}
            >
              Shrani novo geslo
            </Button>
            <Button
              variant="text"
              fullWidth
              onClick={() => {
                setShowPasswordForm(false);
                setNewPassword("");
                setConfirmPassword("");
              }}
              sx={{ mt: 1 , color:'black'}}
            >
              Prekliči
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default Profile;