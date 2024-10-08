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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {

  return (
    <div className="App">
       
        <Router>
        <Routes>
          <Route path="/">
            <Route  index element={<Main />} />
            <Route  path='search' element={<Search />} />
            <Route  path='map' element={<Map />} />
            <Route path="detail/:id" element={<Detail />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
