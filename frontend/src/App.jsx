import { Routes, Route } from 'react-router-dom'
import { ChatProvider }   from './context/ChatContext'
import { SchemeProvider } from './context/SchemeContext'
import { AuthProvider }   from './context/AuthContext'
import Navbar             from './components/layout/Navbar'
import Footer             from './components/layout/Footer'
import ChatBot            from './components/chatbot/ChatBot'
import Home               from './pages/Home/Home'
import Students           from './pages/Students/Students'
import Farmers            from './pages/Farmers/Farmers'
import Women              from './pages/Women/Women'
import Jobs               from './pages/Jobs/Jobs'
import Seniors            from './pages/Seniors/Seniors'
import Disabled           from './pages/Disabled/Disabled'
import Startups           from './pages/Startups/Startups'
import EligibilityChecker from './pages/EligibilityChecker/EligibilityChecker'
import About              from './pages/About/About'
import Login              from './pages/Login/Login'
import Profile            from './pages/Profile/Profile'
import './styles/app.css'

export default function App() {
  return (
    <AuthProvider>
      <SchemeProvider>
        <ChatProvider>
          <div className="app-wrapper">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/"                    element={<Home />} />
                <Route path="/students"            element={<Students />} />
                <Route path="/farmers"             element={<Farmers />} />
                <Route path="/women"               element={<Women />} />
                <Route path="/jobs"                element={<Jobs />} />
                <Route path="/seniors"             element={<Seniors />} />
                <Route path="/disabled"            element={<Disabled />} />
                <Route path="/startups"            element={<Startups />} />
                <Route path="/eligibility-checker" element={<EligibilityChecker />} />
                <Route path="/about"               element={<About />} />
                <Route path="/login"               element={<Login />} />
                <Route path="/profile"             element={<Profile />} />
              </Routes>
            </main>
            <Footer />
            <ChatBot />
          </div>
        </ChatProvider>
      </SchemeProvider>
    </AuthProvider>
  )
}