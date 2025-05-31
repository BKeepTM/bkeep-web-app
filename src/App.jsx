import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageWrapper from './hooks/PageWrapper';
import Register from './pages/auth/register/register'; 
import Login from './pages/auth/login/login';
import Hello from './pages/auth/hello/hello';
import AuthGuard from './hooks/authGuard';
import AuthProvider from './hooks/authProvider';
import Home from './pages/home/home';
import HivePage from './pages/hivePage/hive';
import Map from './pages/map/Map';

function TransitionRoutes() {
  const location = useLocation();

  return (
    <AuthProvider>
      <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route element={<AuthGuard/>}> 
          <Route path="/home" element={<PageWrapper><Home/></PageWrapper>} /> 
          <Route path="/home/hives" element={<PageWrapper><HivePage/></PageWrapper>} />
          <Route path="/home/location" element={<PageWrapper><Map/></PageWrapper>} /> 
        </Route>
        <Route path="/" element={<PageWrapper><Hello/></PageWrapper>} /> 
        <Route path="/register" element={<PageWrapper><Register/></PageWrapper>} /> 
        <Route path="/login" element={<PageWrapper><Login/></PageWrapper>} /> 
      </Routes>
      </AnimatePresence>
    </AuthProvider>
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
