import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, CssBaseline } from '@mui/material';

import Header from './layout/Header';
import Login from './components/Login';
import Home from './pages/Home';
import Register from './components/Register';
import MainArea from './layout/MainArea';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/main-area/*' element={<MainArea />}></Route>
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
