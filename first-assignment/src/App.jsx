import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home.jsx';
import Success from './components/Success.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/success" element={<Success  />} />
      </Routes>
    </Router>
  );
}

export default App;
