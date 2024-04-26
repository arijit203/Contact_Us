import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubmissionsPage from './components/Submissions';
import ContactForm from './components/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactForm />} /> {/* Use element prop */}
        <Route path="/submissions" element={<SubmissionsPage />} /> {/* Use element prop */}
      </Routes>
    </Router>
  );
}

export default App;
