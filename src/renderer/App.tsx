import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Encoder from './components/Encoder';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Encoder />} />
      </Routes>
    </Router>
  );
}
