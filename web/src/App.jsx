import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import RegisterForm from './pages/users/singup';
import LoginPage from './pages/users/login';
import Navbar from '../components/navbar';
import { Authenticated, Unauthenticated } from '../components/authenticated';
import { AuthProvider } from './contexts/auth';
import HomePage from './pages/home/homePage';
import GameDetail from './pages/games/game.detail';
import ReservationPage from './pages/reservation/reservationPage';
import ReservationDetailPage from './pages/reservation/reservatioDetail.page';


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/signup"
            element={
              <Unauthenticated>
                <RegisterForm />
              </Unauthenticated>
            } />
          <Route path="/users/login"
            element={
              <Unauthenticated>
                <LoginPage />
              </Unauthenticated>
            } />
          <Route path="/reservations"
            element={
              <Authenticated>
                <ReservationPage />
              </Authenticated>} />
              <Route path="/reservations/:gameId" 
              element={<Authenticated><ReservationPage />
              </Authenticated>} />
              <Route path="/reservation/:id" element={<ReservationDetailPage />} />
              

        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;