import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import axios from "axios";


export default function LocateOnMap({ cords }) {
  const [location, setLocation] = useState([]);
  const mapContainer = useRef(null);
  const map = useRef(null);
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
      zoom: zoom,});

    map.current.on("click", function (e) {
    const lngLat = e.lngLat;

    const selected = {
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    };

    cords(selected); 

    new maptilersdk.Marker({ color: "#00FF00" }) 
      .setLngLat([lngLat.lng, lngLat.lat])
      .addTo(map.current);
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
    <div style={{width: '100vw'}} ref={mapContainer} className="map" />
  );
}
