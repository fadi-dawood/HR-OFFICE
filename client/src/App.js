import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


//import components
import MyNavbar from './components/MyNavbar/MyNavbar';
import MyFooter from './components/MyFooter/MyFooter';


// import views
import LoginPage from './views/LoginPage/LoginPage';
import NewEmployee from './views/NewEmployee/NewEmployee';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes without navbar and footer */}
          <Route path="/login" element={<LoginPage />} />

          {/* Routes with navbar and footer */}
          <Route
            path="/*"
            element={
              <>
                <MyNavbar />
                <Routes>
                  {/* Aggiungi altre rotte qui */}
                  <Route path="/newEmployee" element={<NewEmployee />} />
                  
                </Routes>
                <MyFooter />
              </>
            }
          />
        </Routes>
      </div>
    </Router>


  );
}

export default App;
