import './home.css';
import ActionAreaCard from '../../components/ActionAreaCard';
import cardHive from '../../assets/images/cardHive.jpg';
import cardGraph from '../../assets/images/cardGraph.jpg';
import cardMap from '../../assets/images/newCardMap.jpg';
import cardNotes from '../../assets/images/cardNotes.jpg';
import Button from '@mui/material/Button';
import { useEffect, useRef } from 'react';
import HiveWeightChart from '../../components/HiveWeightChart';
import SwitchListSecondary from '../../components/HiveStatusList';
import Alert from '@mui/material/Alert';
import { useNavigate,Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useAuth} from '../../hooks/authProvider'
import NotificationsIcon from '@mui/icons-material/Notifications';

function Home() {
  const moreRef = useRef(null);
  const navigate = useNavigate();
  const [hives, setHives] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const auth  = useAuth()
  const token = localStorage.getItem('site');
  const decoded = jwtDecode(token);
  console.log("jwt",decoded);


  return (
    <div className="home-container">
      <header className="status-container">
        <div className="title-wrapper">
          <h1>BKeep™</h1>

          <div className="user-info">
          <AccountCircleIcon sx={{marginTop: "5%"}}/>
          <Link to={`/home/profile`}>
              <u style={{color: "black"}}>{decoded.data.username}</u>
            </Link>
          <Link to={`/home/notifications`}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  marginTop: "7%",
                  color: 'black',
                  borderColor: 'black',
                  ml: 1,
                    border: 'none',
                }}
              >
                  <NotificationsIcon sx={{color: 'black'}}/>
              </Button>
          </Link>
              <Button
              variant="outlined"
              size="small"
              sx={{
                  marginTop: "7%",
                  color: 'black',
                  borderColor: 'black',
                  ml: 1,

                  '&:hover': {
                      backgroundColor: '#444',
                      borderColor: '#f5f5f5',
                  }
              }}
              onClick={() => {
                  auth.logout()
              }}
          >
              Odjava
          </Button>
        </div>
        </div>

        <div style={{ width: '100%', maxWidth: '600px', alignSelf: 'center'}}>
            <HiveWeightChart/>
        </div>

        <SwitchListSecondary hives={hives} setHives={setHives}/>
       

        <Button 
          color="secondary"
          sx={{
            width: '100%',
            mt: 'auto',
            color: 'black',
            border: 'none',
            '&:focus': {
              outline: 'none',
            },
          }}
          onClick={() =>
            moreRef.current?.scrollIntoView({
              behavior: 'smooth',
            })
          }
        >
          <i>več možnosti</i>
        </Button>
      </header>

      <main ref={moreRef} className="card-container">
        <ActionAreaCard img={cardHive} title="Panji" description="Upravljaj in spremljaj panje." onClick={()=>navigate("/home/hives")}/>
          <ActionAreaCard img={cardGraph} title="Statistika" description="Statistični podatki glede panjev." onClick={()=>navigate("/home/stats")} />
        <ActionAreaCard img={cardMap} title="Zemljevid" description="Lokacije panjev in naravnih virov." onClick={()=>navigate("/home/location")} />
      </main>
    </div>

  );
}

export default Home;
