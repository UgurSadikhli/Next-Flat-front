import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Main from "../src/pages/main/Main";
import Search from './pages/search/Search';
import Map from './pages/map/MapPage';
import Detail from './pages/detail/Detail';
import Register from './pages/register/RegisterPage';
import Login from './pages/login/LoginPage';
import AddAnnouncements from './pages/addAnnouncement/AddAnnouncement'
import FavoritesPage from './pages/favorites/Favorites'


function App() {

  return (
    <div className="App">
       
        <Router>
        <Routes>
          <Route path="/">
          <Route path="*" element={<Navigate to="/" replace />} />
            <Route  index element={<Main />} />
            <Route  path='search' element={<Search />} />
            <Route  path='map' element={<Map />} />
            <Route path="detail/:id" element={<Detail />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="newAnnouncement" element={<AddAnnouncements />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;