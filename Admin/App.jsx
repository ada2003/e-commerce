import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './src/Componends/LOGIN/Login.jsx';
import Panel from './src/Componends/ADMIN/Panel.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<Panel />} />
      </Routes>
    </Router>
  );
};

export default App;
