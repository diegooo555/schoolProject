import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from './ProtectedRoute'
import Asistence from './pages/asistence'
import Nav from './components/Nav'
import LoginPage from './pages/login'
import './index.css'
import HomePage from './pages/homePage'
import Student from './pages/student'
import ComputersPage from "./pages/computersPage"
import { AuthProvider } from './context/authContext'

function App() {

  return (
    <AuthProvider>
  
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          
          <Route path='/login' element={<LoginPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path='/asistence' element={<Asistence/>}/> 
            <Route path='/students' element={<Student/>}/>
            <Route path="/computers" element={<ComputersPage/>}/>              
          </Route>
        </Routes>
      </BrowserRouter>
  </AuthProvider>
    
  )
}

export default App
