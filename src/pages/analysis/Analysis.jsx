import ImageUploader from '../../components/ImageUploader';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

function Analysis() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleAnalyzeFrame = async () => {
    if (selectedFiles.length === 0) {
      alert('Nobena slika ni naložena');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append('image', file)); 

    try {
      const response = await axios.post(`${apiUrl}/analysis/frame`, formData, {
        headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('site')}`,
        },  
      });

      console.log('Rezultat analize:', response.data);
      alert('Slika poslana');
    } catch (error) {
      console.error('Napaka pri analizi:', error);
      alert('Prišlo je do napake pri analizi.');
    }
  };

    const handleAnalyzePopulation = async () => {
    if (selectedFiles.length === 0) {
      alert('Nobena slika ni naložena');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append('image', file)); 

    try {
      const response = await axios.post(`${apiUrl}/analysis/hive`, formData, {
        headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('site')}`,
        },
        });

      console.log('Rezultat analize:', response.data);
      alert('Slika poslana');
    } catch (error) {
      console.error('Napaka pri analizi:', error);
      alert('Prišlo je do napake pri analizi.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
    <div style={{ padding: '2%' }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/home')}
        sx={{ color: 'black', borderColor: 'black', mb: 4 }}
      >
        Nazaj domov
      </Button>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Analiza slik🔎
      </Typography>

      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, maxWidth: '40%' }}>
            <h2>Navodila za uporabo</h2>
            <p> <b>1.</b> Povlecite in spustite sliko ali kliknite na "Prebrskaj", da izberete sliko iz računalnika.</p>
            <p> <b>2.</b> Ko je slika naložena, bo prikazana kot predogled.</p>
            <p> <b>3.</b> Klik na gumb <b><i>"Analiziraj"</i></b> pošlje sliko v naš model in vrne rezultate.</p>

            <button style={{ margin: 5, marginLeft: 0, borderColor: 'black', backgroundColor: '#FFEAA7'}} onClick={handleAnalyzeFrame}>Analiziraj okvir</button>
            <button style={{ margin: 5 }} onClick={handleAnalyzePopulation}>Oceni populacijo</button>
        </div>


        <div style={{ flex: 1, maxWidth: '60%' }}>
          <ImageUploader onFilesChange={setSelectedFiles} />
        </div>
      </div>
    </div>
    </Container>
  );
}

export default Analysis;
