import { Link } from 'react-router-dom';
import './Hello.css';
import cebelar from '../../../assets/images/cebelar2.png';
import { linearGradient } from 'framer-motion/client';

export default function Hello() {
  return (
    <div className="hello-container">
      <div className="hello-top-left">
        <h1>BKeep™</h1>
        <p style={{marginTop: "0%"}}>honey&hives</p>
      </div>

      <div className="hello-center">
        <img src={cebelar} width="250px" alt="Čebelar" />
        <div className="hello-buttons">
          <Link to="/register" style={{color:"black"}}><button>Registracija</button></Link>
          <Link to="/login" style={{color:"black"}}><button>Prijava</button></Link>
        </div>
      </div>

      <div className="hello-bottom-right"> 
      <i className='gradient-text'>Opravlaj✔️nadziraj📋beleži✏️ <br/> Zvesti panjem kjerkoli in kadarkoli.</i>     
      </div>
    </div>
  );
}
