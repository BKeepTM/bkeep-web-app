import { Link } from 'react-router-dom';
import './Hello.css';
import cebelar from '../../../assets/images/cebelar2.png';

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
          <button><Link to="/register" style={{color:"black"}}>Registracija</Link></button>
          <button><Link to="/login" style={{color:"black"}}>Prijava</Link></button>
        </div>
      </div>

      <div className="hello-bottom-right">
        <h2 style={{color: "rgb(75, 76, 77)"}}>Nadzoruj svoje panje kjerkoli in kadarkoli, brez omejitev!</h2>
      </div>
    </div>
  );
}
