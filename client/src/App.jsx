import './App.css';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DiaryPage from './pages/DiaryPage/DiaryPage.jsx';
// import DiaryPage2 from "./pages/DiaryPage2/DiaryPage2"
import TodayPage from './pages/TodayPage/TodayPage.jsx';
import StatsPage from './pages/StatsPage/StatsPage.jsx';

import Navbar from './components/Navbar/Navbar';
import IsPrivate from './components/IsPrivate/IsPrivate';
import IsAnon from './components/IsAnon/IsAnon';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Routes>
        <Route index element={<HomePage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        <Route
          path="/diary"
          element={
            <IsPrivate>
              <DiaryPage />
            </IsPrivate>
          }
        />

        <Route
          path="/today"
          element={
            <IsPrivate>
              <TodayPage />
            </IsPrivate>
          }
        />

        <Route
          path="/stats"
          element={
            <IsPrivate>
              <StatsPage />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
