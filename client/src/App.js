import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

//^ import views
import LoginPage from './views/LoginPage/LoginPage';
import SetPassword from './views/SetPassword/SetPassword';
import UserDataContextProvider from './context/UserDataContextProvider.jsx';
import AuthContextProvider from './context/AuthContextProvider.jsx';
import ProtectedAuthRoute from './components/ProtectedAuthRoute/ProtectedAuthRoute.jsx';
import Home from './views/Home/Home.jsx';
import Profile from './views/Profile/Profile.jsx';
import Dashboard from './views/Dashboard/Dashboard.jsx';
import ProtectedAuthAdminRoute from './components/ProtectedAuthAdminRoute/ProtectedAuthAdminRoute.jsx';
import NotFoundPage from "./views/NotFoundPage/NotFoundPage.jsx"




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
              <Route path="/*" element={<NotFoundPage />} />


              {/* Routes with navbar and footer */}
              <Route element={<ProtectedAuthRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />

                <Route element={<ProtectedAuthAdminRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>

              </Route>


            </Routes>
          </UserDataContextProvider>
        </AuthContextProvider>
      </div>
    </Router>


  );
}

export default App;
