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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

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
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'auto',
        background: 'linear-gradient(8deg,rgb(249, 250, 247), #FFEAA7'
        }}>

        
        <Box sx={{width:"50vw", margin: "auto", p: 3, boxShadow: 3, borderRadius: 2, background: 'white', mt:2 , mb:2}}>
        
        <div style={{display:'flex', flexDirection:'row', gap:"17%"}}>
            <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/home')}
            sx={{ margin: '2%', color: "black", borderColor: "black", mb: 2, alignSelf:'start', background:'white'}}
            >
            Zapusti
            </Button>

            
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 , marginBottom:"2%"}}>
                <MarkunreadMailboxOutlinedIcon sx={{ color:'#d6a400'}}/>
                <i>Nabiralnik:</i>
            </div>
        </div>
        <Stack sx={{ width: '100%' }} spacing={2}>
        {
            notifications.map((noti) => {

            let severityType = 'info';

                switch (noti.severity) {
                case 1:
                    severityType = 'info';
                    break;
                case 2:
                    severityType = 'warning';
                    break;
                case 3:
                    severityType = 'error';
                    break;
                default:
                    severityType = 'info';
                }

                return (
                <Link key={noti.id}
                to={noti.href}
                >
                <Alert severity={severityType}>
                    <AlertTitle>{noti.summary}</AlertTitle>
                    {noti.description}
                </Alert>             
            </Link>
        )})}
           </Stack>
        </Box>
        </div>
    )
}
export default  Notifications