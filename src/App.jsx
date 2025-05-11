import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/auth/register/register'; 
import Login from './pages/auth/login/login';
import Hello from './pages/auth/hello/hello';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </Router>
  );
}

export default App;
