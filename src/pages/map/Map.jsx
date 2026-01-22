import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';
import axios from "axios";
import { Card, CardContent, Typography, Button , Container} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InventoryIcon from '@mui/icons-material/Inventory';

export default function Map() {
  const [location, setLocation] = useState([]);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${apiUrl}/location/list`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('site')}`,
          },
        });
        setLocation(data);
      } catch (error) {
        console.error('Napaka pri pridobivanju podatkov z API-ja:', error);
      }
    }

    fetchData();
  }, []);

  const center = { lng: 15.074711350729473, lat: 46.14005365906485 };
  const zoom = 7;
  maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [center.lng, center.lat],
      zoom: zoom,
    });
  }, []);

  useEffect(() => {
    if (!map.current || location.length === 0) return;

    location.forEach((loc) => {
      if (loc.longitude && loc.latitude) {
        new maptilersdk.Marker({ color: "#FF0000" })
          .setLngLat([loc.longitude, loc.latitude])
          .addTo(map.current);
      }
    });
  }, [location]);

  const groupedByLocation = location.reduce((acc, loc) => {
  if (!acc[loc.location]) {
    acc[loc.location] = [];
  }
  acc[loc.location].push(loc.name); 
  return acc;
}, {});


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
    <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/home')}
        sx={{
          margin: '2%',
          color: "black",
          borderColor: "black",
          mb: 2,
        }}
      >
        Nazaj domov
      </Button>
    <div className="location-container">


       <List sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 2,
            bgcolor: 'background.paper',
            padding: 2,
            borderRadius: 2,
            flexWrap: 'wrap', 
            marginTop: 1
        }}>
        {Object.entries(groupedByLocation).map(([locationName, hives]) => (
          <ListItem key={locationName} sx={{ flex: 1 }}>
            <ListItemAvatar>
              <Avatar>
                <LocationOnIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<b>{locationName}</b>}
              secondary={
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {hives.map((name, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <InventoryIcon sx={{ fontSize: 18 }} />
                      <i>{name}</i>
                    </div>
                  ))}
                </div>
              }
            />
          </ListItem>
        ))}
      </List>

      <div ref={mapContainer} className="map" />
    </div>
    </Container>
  );
}