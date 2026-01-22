import ImageUploader from '../../components/ImageUploader';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Container, Paper, Box, Divider } from '@mui/material'; // Added Paper, Box, Divider
import { useState } from 'react';
import axios from 'axios';

function Analysis() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null); // State to store the result
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleAnalyzeFrame = async () => {
    if (selectedFiles.length === 0) {
      alert('Nobena slika ni naložena');
      return;
    }

    setAnalysisResult(null); // Clear previous results while loading

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
      setAnalysisResult(response.data); // Save result to state
      alert('Analiza končana');
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

    setAnalysisResult(null); // Clear previous results while loading

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
      setAnalysisResult(response.data); // Save result to state
      alert('Analiza končana');
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

        {/* --- RESULTS SECTION --- */}
        {analysisResult && (
          <Paper elevation={3} sx={{ mt: 5, p: 3, border: '1px solid #ddd' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Rezultati analize</Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              {/* Processed Image */}
              {analysisResult.imageUrl && (
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <img 
                    // Construct the full URL. If apiUrl ends with /api, you might need to strip it, 
                    // depending on where your backend serves static files.
                    // Assuming apiUrl is the base host (e.g., http://localhost:3000)
                    src={`${apiUrl}${analysisResult.imageUrl}`} 
                    alt="Processed Analysis" 
                    style={{ maxWidth: '100%', maxHeight: '600px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} 
                  />
                </Box>
              )}

              {/* Data / Counts */}
              {analysisResult.data && (
                <Box>
                  <Typography variant="h6">Statistika:</Typography>
                  <Typography variant="body1">
                    <strong>Skupaj zaznano:</strong> {analysisResult.data.total}
                  </Typography>
                  
                  {analysisResult.data.counts && Object.keys(analysisResult.data.counts).length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                       <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Podrobnosti:</Typography>
                       <ul style={{ listStyleType: 'none', padding: 0 }}>
                         {Object.entries(analysisResult.data.counts).map(([label, count]) => (
                           <li key={label} style={{ padding: '4px 0', borderBottom: '1px solid #eee' }}>
                             <span style={{ textTransform: 'capitalize' }}>{label}:</span> <strong>{count}</strong>
                           </li>
                         ))}
                       </ul>
                    </div>
                  )}
                </Box>
              )}
            </Box>
          </Paper>
        )}
        {/* --- END RESULTS SECTION --- */}

      </div>
    </Container>
  );
}

export default Analysis;