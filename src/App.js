import './App.css';
import {  BrowserRouter,Routes, Route, Switch } from 'react-router-dom';
import Login from "../src/Components/Login/Login"

import Header from './Components/Header/Header';
import Imagelivedata from './Components/Imagelivedata/Imagelivedata';
import Plrlivedata from './Components/Plrlivedata/Plrlivedata';
import Livedatatabs from './Components/Livedatatabs/Livedatatabs';
import Imagesourcedata from './Components/Imagesourcedata/Imagesourcedata';
import Plrsourcedata from './Components/pestsourcedata/Plrsourcedata';
import Tabs from './Components/sourcedatatabs/tabs';
import Instructionima from './Components/InstuctionsIMA/InstructionsIMA';
import Instructionplr from './Components/InstructionsPLR/Instructions';


function App() {
  
  return (
    <div >
     <BrowserRouter>
    <Routes>
        <Route path='/'    element={<Login/>}/>
        <Route path='/Imagelivedata'  element={<Imagelivedata/>}/>
        <Route path='/Plrlivedata'  element={<Plrlivedata/>}/>
        <Route path='/Livedatatabs'  element={<Livedatatabs/>}/>
        <Route path='/imagesourcedata' element={<Imagesourcedata/>}/>
        <Route path='/plrsourcedata'  element={<Plrsourcedata/>}/>
        <Route path='/sourcedata'  element={<Tabs/>}/>
        <Route path='/imagesourcedata'  element={<Imagesourcedata/>}/>
        <Route path='/IMA-Instrctions'  element={<Instructionima/>}/>
        <Route path='/PLR-Instrctions'  element={<Instructionplr/>}/>
        <Route path='/Header'  element={<Header/>}/>
    </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
