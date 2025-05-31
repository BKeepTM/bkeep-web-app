import './home.css';
import ActionAreaCard from '../../components/ActionAreaCard';
import cardHive from '../../assets/images/cardHive.jpg';
import cardGraph from '../../assets/images/cardGraph.jpg';
import cardMap from '../../assets/images/cardMap1.jpg';
import cardNotes from '../../assets/images/cardNotes.jpg';
import Button from '@mui/material/Button';
import { useRef } from 'react';
import HiveWeightChart from '../../components/HiveWeightChart';
import SwitchListSecondary from '../../components/HiveStatusList';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Home() {
  const moreRef = useRef(null);
  const navigate = useNavigate();
  const [hives, setHives] = useState([]);
  

  return (
    <div className="home-container">
      <header className="status-container">
        <div className="title-wrapper">
          <h1>BKeep™</h1>    
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
            color: 'white',
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
        <ActionAreaCard img={cardMap} title="Zemljevid" description="Lokacije panjev in naravnih virov." onClick={()=>navigate("/home/location")} />
        <ActionAreaCard img={cardNotes} title="Zapiski" description="Dodaj beležke, opravila in opažanja." />
      </main>
    </div>
  );
}

export default Home;
