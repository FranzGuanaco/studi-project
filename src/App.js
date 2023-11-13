import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './Interface/AuthPage'
import Admin from './Interface/Admin'
import Catalogue from './Interface/Catalogue'
import './App.css';
import Promotion from './Interface/Promotion';

function App() {
      return(
    
        <div className="App">
          <BrowserRouter>
          <Routes>
            <Route path='/' element={<AuthPage/>} />
            <Route path='/Admin' exact element={<Admin/>} />
            <Route path='/Catalogue' exact element={<Catalogue/>}/>
            <Route path='/Admin/Promotion' exact element={<Promotion/>} />
            </Routes>
      </BrowserRouter>
      </div>
  );
  
}

export default App;
