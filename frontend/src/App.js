import logo from './logo.svg';
import './App.css';
import NavbarTemp from './components/NavbarTemp'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Update';




function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <NavbarTemp/>
      <Routes>
        <Route exact path="/" element={<Create/>}></Route>
        <Route  path="/all" element={<Read/>}></Route>
        <Route  path="/:id" element={<Update/>}></Route>
      </Routes>
      </BrowserRouter>
    
    </div>
    
  );
}

export default App;
