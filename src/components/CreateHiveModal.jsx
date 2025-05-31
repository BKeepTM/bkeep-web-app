import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography
} from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import LocateOnMap from './LocateOnMap';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default  function CreateHiveModal({onHiveCreate}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const [name,setName] = useState("")
  const [location,setLocation] = useState("")
  const [cords, setCords] = useState(null);
  const [type,setType] = useState("az");
  const [status,setStatus] = useState("offline")


   const formData = {
    name,
    latitude: cords?.latitude,
    longitude: cords?.longitude,
    location,
    type,
    status
  };

  const handleCreate = ()=>{
  try {
         axios.post(
          `${apiUrl}/hive`,
         formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('site')}`,
            },
          }
        );

        if (onHiveCreate) {
            onHiveCreate();
        }
        
        handleClose();
      } catch (error) {
        console.error('Napaka pri dodajanju panja:', error);
      }
    }

  return (
    <div>
    <Button
      variant="outlined"
      size="medium"
      color="success"
      sx={{background:'white'}}
      onClick={handleOpen}
    >
      Dodaj panj
    </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleCreate}>
            <TextField
              label="Ime"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={(e)=>{setName(e.target.value)}}
            />            
            <Select
            label="Izberi tip"
            fullWidth
            defaultValue={'az'}
            variant="outlined"
            margin="normal"
            onChange={(e)=>{setType(e.target.value)}}
            >
                <MenuItem value={'az'}>AZ</MenuItem>
                <MenuItem value={'lr'}>LR</MenuItem>
                <MenuItem value={'db'}>DB</MenuItem>
            </Select>

            <TextField
              label="Lokacija"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={(e)=>{setLocation(e.target.value)}}
            /> 
            <MapModal cords={setCords} />

            <TextField
            label="Koordinate"
            fullWidth
            variant="outlined"
            margin="normal"
            value={
                cords ? `Lat: ${cords.latitude}, Lng: ${cords.longitude}` : ""
            }
            disabled
            />

            <Select
            label="Izberi status"
            fullWidth
            defaultValue={'offline'}
            variant="outlined"
            margin="normal"
            onChange={(e)=>{setStatus(e.target.value)}}
            >
                <MenuItem value={'offline'}>offline</MenuItem>
                <MenuItem value={'online'}>online</MenuItem>
            </Select>

            <Button variant="outlined" color="primary" type="submit" sx={{ mt: 2 }}>
              Dodaj
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

function MapModal({cords}){
     const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
    <Button
      variant="outlined"
      size="medium"
      color="black"
      sx={{background:'white'}}
      onClick={handleOpen}
    >
    Izberi lokacijo
    </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: '100vw', height: '100vh' }}>
          <LocateOnMap cords={(loc) => {
            cords(loc);
            handleClose(); 
          }} />
        </Box>
      </Modal>
    </div>
  );
}