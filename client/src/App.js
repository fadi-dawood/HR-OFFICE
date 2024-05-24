import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import views
import LoginPage from './views/LoginPage/LoginPage';
import NewEmployee from './views/NewEmployee/NewEmployee';
import SetPassword from './views/SetPassword/SetPassword';
import UserDataContextProvider from './context/UserDataContextProvider.jsx';
import AuthContextProvider from './context/AuthContextProvider.jsx';
import ProtectedAuthRoute from './components/ProtectedAuthRoute/ProtectedAuthRoute.jsx';
import Home from './views/Home/Home.jsx';
import Profile from './views/Profile/Profile.jsx';
import Dashboard from './views/Dashboard/Dashboard.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <AuthContextProvider>
          <UserDataContextProvider>
            <Routes>
              {/* Routes without navbar and footer */}
              <Route path="/" element={<LoginPage />} />
              <Route path="/setpassword/:token" element={<SetPassword />} />

              <Route element={<ProtectedAuthRoute />}>
                <Route path="/newEmployee" element={<NewEmployee />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>

            </Routes>
          </UserDataContextProvider>
        </AuthContextProvider>
      </div>
    </Router>


  );
}

export default App;
