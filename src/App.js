import './App.css';
import './custom.scss'
import Home from './pages/Home';
import NuevaChance from './pages/NuevaChance';
import Monitor from './pages/Monitor';
import NavBar from './components/NavBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nuevachance" element={<NuevaChance />} />
              <Route path="/monitor" element={<Monitor />} />
            </Routes>
    </BrowserRouter>
  );
}

export default App;
