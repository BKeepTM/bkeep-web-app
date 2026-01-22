import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect } from 'react';

export default function SwitchListSecondary({ hives, setHives }) {

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${apiUrl}/hive/list`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('site')}`,
          },
        });

        setHives(data);
      } catch (error) {
        console.error('Napaka pri pridobivanju podatkov z API-ja:', error);
      }
    }

    fetchData();
  }, []);

  const handleToggle = (id) => async () => {
    const updatedHives = hives.map((hive) =>
      hive.id === id
        ? { ...hive, status: hive.status === 'online' ? 'offline' : 'online' }
        : hive
    );
    
    setHives(updatedHives);

    const updatedHive = updatedHives.find(hive => hive.id === id);

    try {
      await axios.put(`${apiUrl}/hive/${id}`, updatedHive, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('site')}`,
        },
      });
    } catch (error) {
      console.error("Napaka pri posodabljanju statusa:", error);
    }
  };


  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'hsl(0, 0.00%, 19.20%)', alignSelf: 'center' , overflow: 'auto',
        maxHeight: '50%', color: 'white', borderRadius: '5px',scrollbarWidth: 'none'}}>
      {hives.map((hive) => {
        const isChecked = hive.status === 'online';
        const key = `hive-${hive.id}`;

        return (
          <ListItem
            key={key}
            sx={{ border: '1px solid #424242' }}
            secondaryAction={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Typography variant="body2" color="white">
                   {hive.type}  |  {isChecked ? 'on' : 'off'}
                </Typography>
                <Switch
                  edge="end"
                  onChange={handleToggle(hive.id)}
                  checked={isChecked}
                  inputProps={{
                    'aria-labelledby': `switch-list-label-${key}`,
                  }}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: 'white',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: 'white',
                    },
                  }}
                />
              </div>
            }
          >
            <ListItemText
              id={`switch-list-label-${key}`}
              primary={`${hive.name || hive.id}`}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
