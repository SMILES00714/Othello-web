import Header from './components/Header';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={Register} />
        <Route path='/dash' Component={Dashboard} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
