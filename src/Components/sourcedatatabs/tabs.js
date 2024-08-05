import * as React from 'react';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Imagesourcedata from '../Imagesourcedata/Imagesourcedata';
import Voicesourcedata from '../Voicesourcedata/Voicesourcedata';
import Plrsourcedata from '../pestsourcedata/Plrsourcedata';


function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };


  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === 'Live Reports') {
      window.location.href = '/Livedatatabs';
    }
    if (event.target.value === 'Source Data') {
      window.location.href = '/sourcedata';
    }
  }

  return (
    <div >
       <div className="header">
        <div className="container">
          <div className="logo" >
            <h4 style={{ fontFamily: "initial" }}>Cotton Expert</h4>
          </div>

          <div className="navbar" style={{ marginTop: -5, }}>
            {/* <ul>
              <li style={{ marginLeft: 260 }}>
                <h6 >Live reports</h6>
              </li>
              <li style={{ marginLeft: 450 }}>
                <NavLink to="/sourcedata" className="live" exact activeStyle={{ color: '#2a6496', }}>Source Data</NavLink>
              </li>
            </ul> */}
            <h5 style={{marginLeft:400}}>Source Data</h5>
          </div>
          <div>
      <select id="dropdown" value={selectedOption} onChange={handleOptionChange} style={{marginLeft:400,width:120,borderRadius:5,padding:5}}>
      <option value="Source Data" > Source Data</option>
        <option value="Live Reports" > Live Reports</option>
      </select>
     
    </div>
        </div>
      </div>



      <div className="container bloc-tabs" style={{ marginTop: 20, paddingLeft: "15%", paddingRight: "15%" }}>
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Image Analysis
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Pesticide Label Recognition
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Voice Assistant
        </button>
      </div>


      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <Imagesourcedata></Imagesourcedata>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <Plrsourcedata></Plrsourcedata>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <Voicesourcedata></Voicesourcedata>
        </div>
      </div>
    </div>
  );
}

export default Tabs;

