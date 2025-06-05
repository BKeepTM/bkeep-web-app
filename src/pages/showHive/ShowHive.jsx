import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Switch } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HiveIcon from '@mui/icons-material/Hive';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import DeleteIcon from '@mui/icons-material/Delete';
import HiveWeightChartSingle from "../../components/HiveWeightChartSingle";
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import NotifyAnalize from "../../components/NotifyAnalize";

function ShowHive() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [weight, setWeight] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("site");

        const [hiveRes, weightRes, notesRes] = await Promise.all([
          axios.get(`${apiUrl}/hive/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${apiUrl}/hiveWeight/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${apiUrl}/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setData(hiveRes.data[0]);
        setWeight(weightRes.data);
        setNotes(Array.isArray(notesRes.data) ? notesRes.data : [notesRes.data]);
      } catch (err) {
        console.error("Napaka pri pridobivanju podatkov:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

const handleDelete = async (noteId) => {

  try {
    const token = localStorage.getItem("site");
    await axios.post(
      `${apiUrl}/notes/remove`,
      { id: noteId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  } catch (err) {
    console.error("Napaka pri brisanju zapiska:", err);
  }
};


const handleToggle = async () => {
  const newStatus = data.status === 'online' ? 'offline' : 'online';
    setData(prev => ({ ...prev, status: newStatus }));

  try {
    await axios.put(`${apiUrl}/hive/${id}`, 
      { ...data, status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("site")}`,
        },
      }
    );
  } catch (error) {
    console.error("Napaka pri posodabljanju statusa:", error);
    setData(prev => ({ ...prev, status: data.status }));
  }
};


  if (loading || !data) return <p>Nalaganje...</p>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        sx={{ mb: 3, color: "black", borderColor: "black" }}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/home/hives")}
      >
        Nazaj
      </Button>

      <h2 style={{ margin: "0%" }}>{data.name}</h2>
      <i style={{ color: data.status === "online" ? "green" : "red" }}>
        {data.status}
      </i>


      <Switch
        checked={data.status === "online"}
        onChange={handleToggle}
        sx={{
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#E0AA3E',
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#E0AA3E',
          },
        }}
      />


    <div style={{display:'flex', flexDirection: 'row',  width: "100%", gap: '5%'}}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          maxHeight: 300,
          bgcolor: "background.paper",
          borderRadius: "5px",
          marginTop: "2%",
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar><LocationOnIcon /></Avatar>
          </ListItemAvatar>
          <ListItemText primary="Lokacija" secondary={data.location} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar><HiveIcon /></Avatar>
          </ListItemAvatar>
          <ListItemText primary="Tip" secondary={data.type} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar><FitnessCenterIcon /></Avatar>
          </ListItemAvatar>
          <ListItemText 
            primary="Teža" 
            secondary={weight && weight.length > 0 ? `${weight[weight.length - 1].weight.toFixed(2)} kg` : '0 kg'} 
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar><OnlinePredictionIcon /></Avatar>
          </ListItemAvatar>
          <ListItemText primary="Status" secondary={data.status} />
        </ListItem>
      </List>

      <div style={{width:'80%'}}>
      <HiveWeightChartSingle/>
      </div>
    </div>

      {notes.length > 0 && (
        <>
          <h3 style={{ marginTop: "2rem" }}>Zapiski</h3>
          <List
            sx={{
              width: "100%",
              maxWidth: 600,
              bgcolor: "background.paper",
              borderRadius: "5px",
              marginTop: "1%",
            }}
          >
            {notes.map((note) => (
              <ListItem
                key={note.id}
                alignItems="flex-start"
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(note.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar><TextSnippetIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={note.content}
                  secondary={new Date(note.time).toLocaleString("sl-SI", {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}

      <AddNoteForm
        hiveId={id}
        onNoteAdded={() => {
          axios.get(`${apiUrl}/notes/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("site")}` },
          }).then(res => setNotes(Array.isArray(res.data) ? res.data : []));
        }}
      />

      <NotifyAnalize recent={weight[weight.length - 1]} dated={weight[weight.length - 2]}/>

    </Container>
  );
}

export default ShowHive;


import { TextField, Box } from "@mui/material";


function AddNoteForm({ hiveId, onNoteAdded }) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("site");
      await axios.post(
        `${apiUrl}/notes`,
        {
          content,
          time: new Date().toISOString().slice(0, 19).replace("T", " "), 
          hiveId: hiveId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setContent("");
      if (onNoteAdded) onNoteAdded(); 
    } catch (err) {
      console.error("Napaka pri dodajanju zapiska:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, maxWidth: 600 }}>
      <TextField
        fullWidth
        multiline
        label="Beležka"
        minRows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button  sx={{ mb: 3, color: "black", borderColor: "black" }} type="submit" variant="outlined" disabled={submitting || !content}>
        {submitting ? "Shranjujem..." : "Zapiši"}
      </Button>
    </Box>
  );
}
