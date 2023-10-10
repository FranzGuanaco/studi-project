import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './Interface/AuthPage'
import Admin from './Interface/Admin'
import Catalogue from './Interface/Catalogue'
import './App.css';

function App() {
      return(
    
        <div className="App">
          <BrowserRouter>
          <Routes>
            <Route path='/Auth' element={<AuthPage/>} />
            <Route path='/Admin' exact element={<Admin/>} />
            <Route path='/Catalogue' exact element={<Catalogue/>} />
            </Routes>
      </BrowserRouter>
      </div>
  );
  
}

export default App;
