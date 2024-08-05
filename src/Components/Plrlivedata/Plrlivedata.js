import React, { useState, useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import '../Plrlivedata/Plrlivedata.css'
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import { Dialog } from '@mui/material';
import { green } from '@mui/material/colors';

function Plrlivedata() {


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowData, setRowData] = useState([]);
  const [pagenumber, setpagenumber] = useState(1);
  const [isDisabled, setisDisabled] = useState(false);
  const [data, setdata] = useState([]);
  const scollToRef = useRef();

  useEffect(() => {
    var obj = {};
   
    const requestOptions = {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch('http://192.168.100.188:5000/plr_records_live', requestOptions)
      .then(res => res.json())
      .then(result => {
        // console.log('====================================');
        // console.log("ll", result);
        setRowData(result.data)
        if(result.page_num == 1){
          setisDisabled(true)
        }else{
          setisDisabled(false)
        }
        setdata(result)
        scollToRef.current.scrollIntoView()
        // console.log(rowData, "126984554584")
        result.data.forEach(item => {
          if (item.updated_on) {
            const dateStr = item.updated_on;
            // console.log(dateStr,"11111")
            const formattedDate = dateStr.replace('T', ' ');
            // console.log(formattedDate,"dcfvghj")
            item.updated_on = formattedDate
          }
        });
      });

    if (setRowData.audio_file_path === '') { }
    setRowData.audio_file_path = "None"
  }, []);


  function Next() {
    var obj = {};
    var num = pagenumber + 1;
    setpagenumber(num);
    const requestOptions = {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch(`http://192.168.100.188:5000/plr_records_live?page_num=${num}&page_size=10`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result, "print data")
        setRowData(result.data)
        if(result.page_num == 1){
          setisDisabled(true)
        }else{
          setisDisabled(false)
        }
        setdata(result)
        scollToRef.current.scrollIntoView()
        // console.log(rowData, "Plr live data.......")
        result.data.forEach(item => {
          if (item.updated_on) {
            const dateStr = item.updated_on;
            // console.log(dateStr,"11111")
            const formattedDate = dateStr.replace('T', ' ');
            // console.log(formattedDate,"dcfvghj")
            item.updated_on = formattedDate
          }
        });
      });

  }

  function previous() {
    var obj = {};
    const currentValue = pagenumber - 1;
  
      setpagenumber(currentValue);
      const requestOptions = {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      };
      fetch(`http://192.168.100.188:5000/plr_records_live?page_num=${currentValue}&page_size=10`, requestOptions)
        .then(response => response.json())
        .then(result => {
          // console.log(result, "print data")
          setRowData(result.data)
          if(result.page_num == 1){
            setisDisabled(true)
          }else{
            setisDisabled(false)
          }
          setdata(result)
          scollToRef.current.scrollIntoView()
          // console.log(rowData, "Plr live data.......")
          result.data.forEach(item => {
            if (item.updated_on) {
              const dateStr = item.updated_on;
              // console.log(dateStr,"11111")
              const formattedDate = dateStr.replace('T', ' ');
              // console.log(formattedDate,"dcfvghj")
              item.updated_on = formattedDate
            }
          });
        });
    
  }
  const [dialogOpen, setDialogOpen] = useState(false);
  function handleOpenDialog() {
    setDialogOpen(true);
  }

  function handleCloseDialog() {
    setDialogOpen(false);
  }
  const [imagedisplay, setimagedisplay] = useState("");
  function EditImage(item) {
    setimagedisplay(item.image_path);
    // setinfotranslated(item.info_d_translated)
  }
  // us

  return (
    <div style={{ overflow: 'hidden' }}>
      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-8' style={{ marginBottom: 10 }}>
          <div className='row'>
            <div className='col-md-1' style={{ marginLeft: "36%", paddingLeft: 60, }}> <button onClick={previous} disabled={isDisabled} style={{ width: 40, height: 40, background: "gray", borderRadius: 25, color: "white" }}>🡨</button> </div>
            <div className='col-md-2' style={{ borderRadius: 1, fontSize: 13, fontWeight: 450, paddingLeft: 50, marginRight: -60, marginTop: 10, textDecoration: "underline" }}> <p >Pg No:- {data.page_num} </p> </div>
            <div className='col-md-2' style={{ fontSize: 13, fontWeight: 450, marginRight: -60, marginTop: 10, textDecoration: "underline" }}> <p>Page Count:- {data.page_count}</p>  </div>
            <div className='col-md-2' style={{ fontSize: 13, fontWeight: 450, marginRight: -60, marginTop: 10, textDecoration: "underline" }}> <p>Total Pages:- {data.total_pages}</p>  </div>
            <div className='col-md-2' style={{ fontSize: 13, fontWeight: 450, marginRight: -30, marginTop: 10, textDecoration: "underline" }}> <p>Total Records:- {data.total_count}</p>  </div>
            <div className='col-md-1' style={{ fontSize: 13, fontWeight: 450 }}>  <button onClick={Next} style={{ width: 40, height: 40, background: "gray", borderRadius: 25, color: "white" }}>🡪</button></div>
          </div>
        </div>
      </div>


      <div style={{ height: 460, overflowX: 'auto', position: "relative" }}>
        <Table className='table' style={{ top: 0 }} ref={scollToRef}>
          <thead >
            <tr>
              <th >Id</th>
              <th >Date</th>
              <th >Message</th>
              <th >Image</th>
              <th >Language</th>
              <th >Detected Pest</th>
              <th >Accuracy (%)</th>
              <th >Instruction</th>
              <th >Latency (sec)</th>
              <th >Audio Response</th>
              <th >User Name</th>
              <th >User Location</th>
              <th>User IP Address</th>
              <th>Weather</th>
            </tr>
          </thead>
          <tbody>
            {rowData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                return (
                  <tr >
                    <td width={70} style={{ textAlign: "right" }}>{item.id}</td>
                    <td style={{ minWidth: 180, textAlign: "right" }}>{item.updated_on}</td>
                    <td style={{ minWidth: 180, textAlign: "left" }}>{item.message}</td>
                    <td>
                      <div>  <img src={item.image_path} onClick={() => EditImage(item) || handleOpenDialog()} width="70px" height="60px" style={{ borderRadius: "10px", marginLeft: 5 }} /></div>
                      {/* <Popup trigger={<button style={{ borderRadius: 5 }}>
                    <button onClick={handleCloseDialog} style={{ border: "none", background: "white", margin: 10,marginLeft:320 }}>✖</button>
                       <img src={item.image_path} width={80} height="80px" style={{ borderRadius: "10px" }} /></button>} position="right center">
                      <div> <img src={item.image_path} width="320px" height="400px" style={{ borderRadius: "10px", marginLeft: 5 }} /></div>
                    </Popup> */}
                    </td>
                    <td style={{ textAlign: "left" }}>{item.language_name}</td>
                    <td style={{ textAlign: "left" }}>{item.detected_pest}</td>
                    <td style={{ textAlign: "right" }}>{item.relevance}</td>
                    <td>  
                      {/* <button style={{ background: "white" }}  onClick={() => EditImage(item) || handleOpenDialog()} >👁️‍🗨️</button>
                      <div >{item.info_d_translated}</div> */}
                      <Popup trigger={<button style={{ background: "white" }}>👁️‍🗨️</button>} position="right center">
                      <div >{item.info_d_translated}</div>
                    </Popup>
                     </td>
                    <td style={{ textAlign: "right" }}>{item.latency}</td>
                    <td>
                      <audio src={item.audio_file_path} onPlay={(e) => { e.target.currentTime = 0; }} controls />
                    </td>
                    <td>{item.user_name}</td>
                    <td>{item.user_loc}</td>
                    <td>{item.user_ipaddr}</td>
                    <td>{item.user_weather}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Dialog open={dialogOpen} style={{marginLeft:-150}}>
          <button onClick={handleCloseDialog} style={{ border: "none", background: "white", margin: 10, marginLeft: 320 }}>✖</button>
          <img src={imagedisplay} width="320px" height="380px" style={{ borderRadius: "10px", marginLeft: 10, marginBottom: 20 }} />
          {/* <div>{infotranslated}</div> */}
          
        </Dialog>
      </div>
    </div>
  );
}

export default Plrlivedata;

