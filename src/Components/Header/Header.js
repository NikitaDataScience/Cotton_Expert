import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import '../Header/Header.css'

function Header () {
  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === 'Live Reports') {
      window.location.href = '/Livedatatabs';
    }
    if (event.target.value === 'Source Data') {
      window.location.href = '/sourcedata';
    }
    if (event.target.value === 'Live Reports') {
      window.location.href = '/Livedatatabs';
    }
  }

    return (
      // <div className="header">
      //   <div className="container">
      //     <div className="logo" style={{ marginTop: 0 }}>
      //       <h5 style={{fontFamily:"initial"}}>Cotton Expert</h5>
      //     </div>
      //     <div className="navbar" style={{ marginTop: -5, marginLeft: "50%" }}>
      //       <ul>
      //         <li>
      //           <NavLink to="/Livedatatabs" className="live" exact activeStyle={{ color: '#2a6496' }}>  Live Reports</NavLink>
      //         </li>
      //         <li>
      //           <NavLink to="/sourcedata" className="live" exact activeStyle={{ color: '#2a6496' }}>Source Data</NavLink>
      //         </li>
              
      //       </ul>
      //     </div>

      //   </div>
      // </div>
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
        </div>
        <div>
    <select  id="dropdown" value={selectedOption} onChange={handleOptionChange} style={{marginLeft:400,width:120,borderRadius:5,padding:5}}>
    <option value="Live Reports" >Instructions</option>
      <option value="Live Reports" > Live Reports</option>
      <option value="Source Data" > Source Data</option>
    </select>
   
  </div>
      </div>
    </div>
    );
  }


export default Header;
