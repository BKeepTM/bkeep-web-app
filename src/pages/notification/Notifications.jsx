import {useAuth} from "../../hooks/authProvider.jsx";
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";
import axios from "axios";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {Button,Box} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MarkunreadMailboxOutlinedIcon from '@mui/icons-material/MarkunreadMailboxOutlined';
function Notifications () {

    const apiUrl = import.meta.env.VITE_API_URL;
    const auth  = useAuth()
    const token = localStorage.getItem('site');
    const decoded = jwtDecode(token);
    console.log("jwt",decoded);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(`${apiUrl}/notification/list`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('site')}`,
                    },
                });

                setNotifications(data);
            } catch (error) {
                console.error('Napaka pri pridobivanju podatkov z API-ja:', error);
            }
        }

        fetchData();
    }, []);
    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'110vh',
        background: 'linear-gradient(60deg, #FFEAA7 50%, rgb(249, 250, 247) 50%)'
        }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/home')}
          sx={{ margin: '2%', color: "black", borderColor: "black", mb: 2, alignSelf:'start', background:'white'}}
        >
          Zapusti Obvestila
        </Button>

        <Box sx={{ maxWidth: 500, margin: "auto", p: 3, boxShadow: 3, borderRadius: 2, background: 'white', mt:2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 , marginBottom:"2%"}}>
            <MarkunreadMailboxOutlinedIcon sx={{ color:'#d6a400'}}/>
            <i>Nabiralnik:</i>
        </div>
        {
            notifications.map((noti) => {
                return (
                <Link key={noti.id}
                to={noti.href}
                >
               <Card sx={{mb:1}}>
                    <CardActionArea
                    >
                        <CardContent>
                            <Typography gutterBottom  component="div">
                               <b>{noti.summary}</b>
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {noti.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
               </Card>
            </Link>
        )})}
        </Box>
        </div>
    )
}
export default  Notifications