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
import { Link } from 'react-router-dom';
function Notifications () {

    const apiUrl = import.meta.env.VITE_API_URL;
    const auth  = useAuth()
    const token = localStorage.getItem('site');
    const decoded = jwtDecode(token);
    console.log("jwt",decoded);
    const [notifications, setNotifications] = useState([]);
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
        <>{
            notifications.map((noti) => {
                return (
                <Link key={noti.id}
                to={noti.href}
                >
               <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea
                    >
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {noti.summary}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {noti.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
               </Card>
            </Link>
        )})}
        </>
    )
}
export default  Notifications