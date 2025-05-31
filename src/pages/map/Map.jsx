import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';
import axios from "axios";
import { Card, CardContent, Typography, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="location-container">

      <div className="hive-info">
        <div className="hive-header">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/home')}
            sx={{
              color: "white",
              borderColor: "white",
              mb: 2,
              '&:hover': {
                borderColor: "#90caf9",
                backgroundColor: "#333",
              },
            }}
          >
            Nazaj domov
          </Button>

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: "#ffffff" }}>
            Seznam lokacij panjev
          </Typography>
        </div>

        <div className="hive-list">
          {location.map((loc) => (
            <Card key={loc.id} sx={{ mb: 2, backgroundColor: "#6e6e6e" }}>
              <CardContent sx={{ color: 'white' }}>
                <Typography variant="subtitle1"><strong>Panj ID:</strong> {loc.id}</Typography>
                <Typography variant="body2">Dolžina: {loc.longitude}</Typography>
                <Typography variant="body2">Širina: {loc.latitude}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div ref={mapContainer} className="map" />
    </div>
  );
}
