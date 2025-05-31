import './hive.css';
import SwitchListSecondary from '../../components/HiveStatusList';
import HiveStatusPieChart from '../../components/HiveStatusPieChart';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DataTable from '../../components/HiveDetailList';
import { Box, Container, Typography } from '@mui/material';

function HivePage() {
  const navigate = useNavigate();
  const [hives, setHives] = useState([]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        sx={{ mb: 3, color: "black", borderColor: "black" }}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/home')}
      >
        Nazaj domov
      </Button>

      <Typography variant="h4" sx={{ mb: 2 }}>
        Tvoji panji
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <DataTable />
        </Box>

      </Box>
    </Container>
  );
}

export default HivePage;
