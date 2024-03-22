import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.scss';

import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DiaryPage from './pages/DiaryPage/DiaryPage.jsx';
import TodayPage from './pages/TodayPage/TodayPage.jsx';
import StatsPage from './pages/StatsPage/StatsPage.jsx';
import EditUserPage from './pages/EditUserPage/EditUserPage.jsx';
import PswResetPage from './pages/PswResetPage/PswResetPage.jsx';

import Navbar from './components/Navbar/Navbar';
import IsPrivate from './components/IsPrivate/IsPrivate';
import IsAnon from './components/IsAnon/IsAnon';
import OffcanvasSidebar from './components/OffcanvasSidebar/OffcanvasSidebar.jsx';

function App() {
  return (
    <div className="App container">
      <Navbar />

      <OffcanvasSidebar />
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
          path="/edit-user"
          element={
            <IsPrivate>
              <EditUserPage />
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

        <Route
          path="/password-reset"
          element={
            <IsPrivate>
              <PswResetPage />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
