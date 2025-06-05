import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateHiveModal from './CreateHiveModal';

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [hives, setHives] = useState([]);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);


  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSingleDelete = async (id) => {
    const confirmed = window.confirm('Ali res želiš izbrisati ta panj?');
    if (!confirmed) return;

    try {
      await axios.post(
        `${apiUrl}/hive/remove`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('site')}`,
          },
        }
      );

      setHives((prev) => prev.filter((hive) => hive.id !== id));
    } catch (error) {
      console.error('Napaka pri brisanju panja:', error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Ime', width: 130 },
    { field: 'location', headerName: 'Lokacija', width: 130 },
    { field: 'type', headerName: 'Tip', width: 90 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Dejanja',
      width: 220,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate(`/panj/${params.row.id}`)}
            sx={{ mr: 1 }}
          >
            Več
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleSingleDelete(params.row.id)}
          >
            Izbriši
          </Button>
        </>
      ),
    },
  ];

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
  }, [refresh]);

  return (
    <>
    <Paper sx={{ width: '100%', mt: 2 , borderRadius: '8px'}}>
      <DataGrid
        rows={hives}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{
          border: '1px solid #ccc',
          borderRadius: 2,
          bgcolor: 'white',
          '& .MuiDataGrid-cell': {
            color: '#333',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
          },
        }}
      />
    </Paper>

    <CreateHiveModal onHiveCreate={()=>{setRefresh(prev => !prev)}}/>
    </>
  );
}
