import HiveTypeChart from "../../components/HiveTypeChart";
import HiveNumLocationChart from "../../components/HiveNumLocationChart";
import { Button, List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HiveIcon from '@mui/icons-material/Hive';
import PlaceIcon from '@mui/icons-material/Place';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Stats.css";

function Stats() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    totalHives: 0,
    totalLocations: 0,
    onlineHives: 0,
    offlineHives: 0,
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchSummary() {
      try {
        const { data } = await axios.get(`${apiUrl}/hive/list`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('site')}`
          }
        });

        const totalHives = data.length;
        const uniqueLocations = new Set(data.map(h => h.location)).size;
        const onlineHives = data.filter(h => h.status === "online").length;
        const offlineHives = data.filter(h => h.status === "offline").length;

        setSummary({ totalHives, totalLocations: uniqueLocations, onlineHives, offlineHives });
      } catch (err) {
        console.error("Napaka pri pridobivanju povzetka:", err);
      }
    }

    fetchSummary();
  }, []);

  return (
    <div className="stats-container">
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/home')}
        sx={{ marginBottom: '2rem', color: "black", borderColor: "black" }}
      >
        Nazaj domov
      </Button>

      <div className="chart-block">
        <HiveTypeChart />
        <HiveNumLocationChart />
      </div>
        <List
        sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 2,
            bgcolor: 'background.paper',
            padding: 2,
            borderRadius: 2,
            flexWrap: 'wrap', 
            marginTop: 1
        }}
        >
        <ListItem sx={{ flex: 1 }}>
            <ListItemAvatar>
            <Avatar><HiveIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText primary="Panji" secondary={summary.totalHives} />
        </ListItem>
        <ListItem sx={{ flex: 1 }}>
            <ListItemAvatar>
            <Avatar><PlaceIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText primary="Lokacije" secondary={summary.totalLocations} />
        </ListItem>
        <ListItem sx={{ flex: 1 }}>
            <ListItemAvatar>
            <Avatar ><WifiIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText primary="Online" secondary={summary.onlineHives} />
        </ListItem>
        <ListItem sx={{ flex: 1 }}>
            <ListItemAvatar>
            <Avatar ><WifiOffIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText primary="Offline" secondary={summary.offlineHives} />
        </ListItem>
        </List>

    </div>
  );
}

export default Stats;
