import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import RegisterForm from './pages/users/singup';
import LoginPage from './pages/users/login';
import Navbar from '../components/navbar';
import { Authenticated, Unauthenticated } from '../components/authenticated';
import { AuthProvider } from './contexts/auth';


function App() {
  return (
    <AuthProvider>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/signup" element={
        <Unauthenticated>
          <RegisterForm />
        </Unauthenticated>} />
        <Route path="/users/login" element={
        <Unauthenticated>
          <LoginPage />
        </Unauthenticated>} />
        <Route path="/game" element={
        <Authenticated>
          <h1>Home</h1>
        </Authenticated>} />
        
              
      </Routes>
    </div>
    </AuthProvider>

  );
}

export default App
