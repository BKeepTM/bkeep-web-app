import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageWrapper from './hooks/PageWrapper';
import Register from './pages/auth/register/register'; 
import Login from './pages/auth/login/login';
import Hello from './pages/auth/hello/hello';

function TransitionRoutes() {
  const location = useLocation();

  return (
      <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Hello/></PageWrapper>} /> 
        <Route path="/register" element={<PageWrapper><Register/></PageWrapper>} /> 
        <Route path="/login" element={<PageWrapper><Login/></PageWrapper>} /> 
      </Routes>
      </AnimatePresence>
  );
}

function App(){
  return(
  <BrowserRouter>
    <TransitionRoutes/>
  </BrowserRouter>
  )
}

export default App;
