import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Portfolio from './pages/Portfolio'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/secret-admin" element={<Login />} />
        <Route path="/secret-admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
