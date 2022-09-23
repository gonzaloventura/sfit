import './App.css';
import './custom.scss'
import Home from './pages/Home';
import NavBar from './components/NavBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
    </BrowserRouter>
  );
}

export default App;
