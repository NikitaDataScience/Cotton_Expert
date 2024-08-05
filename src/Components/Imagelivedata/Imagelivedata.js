import React, { useState, useEffect, useRef} from 'react';
import Table from '@mui/material/Table';
import "../Imagelivedata/Imagelivedata.css"
import { NavLink } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../Header/Header"
import { Dialog } from '@mui/material';

function Imagelivedata() {
  const [rowData, setRowData] = useState([]);
  const [data, setdata] = useState([]);
  const [page, setPage] = React.useState(0);
  const [currentdate, setcurrentdate] = React.useState([]);
  const [pagenumber, setpagenumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [isDisabled, setisDisabled] = useState(false);
  const [audioone, setaudioone] = useState("");
  const scollToRef = useRef();
  const [dialogOpen, setDialogOpen] = useState(false);
 
  document.addEventListener('play', function(e){
    var audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
        if(audios[i] != e.target){
            audios[i].pause();
        }
    }
}, true);

 
  useEffect(() => {
    var obj = {};
    
    const requestOptions = {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch('http://192.168.100.188:5000/ima_records_live2?page_num=1&page_size=10', requestOptions)
      .then(res => res.json())
      .then(result => {
        setRowData(result.data)
        if(result.page_num == 1){
          setisDisabled(true)
        }
        console.log(rowData)
        setdata(result)
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
  
}, []);

  // const [isPlaying, setIsPlaying] = useState(false);
  // const [audio_file2, srtaudio_file2] = useState('');

  // function handlePlayPause() {
  //   if (isPlaying) {
  //     audio_file2.pause();
  //   } else {
  //     audio_file2.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // }

  function previous() {
    var obj = {};
    const currentValue = pagenumber - 1;
 
      setpagenumber(currentValue);
      const requestOptions = {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      };
      fetch(`http://192.168.100.188:5000/ima_records_live2?page_num=${currentValue}&page_size=10`, requestOptions)
        .then(res => res.json())
        .then(result => {
          setRowData(result.data)
          if(result.page_num == 1){
            setisDisabled(true)
          }else{
            setisDisabled(false)
          }
          setdata(result)
          scollToRef.current.scrollIntoView()
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

  function Next() {
    window.scrollTo({top: 0, left: 0,});
    var obj = {};
    var num = pagenumber + 1;
    setpagenumber(num);
    const requestOptions = {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch(`http://192.168.100.188:5000/ima_records_live2?page_num=${num}&page_size=10`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setRowData(result.data)
        if(result.page_num == 1){
          setisDisabled(true)
        }else{
          setisDisabled(false)
        }
        setdata(result)
        scollToRef.current.scrollIntoView()
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
function handleOpenDialog() {
    setDialogOpen(true);
}

function handleCloseDialog() {
    setDialogOpen(false);
}
const [imagedisplay, setimagedisplay] = useState("");
function EditImage(item) {
  console.log(item, "data"); 
  setimagedisplay(item.image_path);
 
}
  // const [inputField , setInputField] = useState({
  //   searchtype: 'class',
  //   searchvalue: ''
  //   })

    // const inputsHandler = (e) =>{
    //     setInputField( {[e.target.name]: e.target.value} )
    // }

    // const submitButton = () =>{
    //     alert(inputField.searchtype);
    //     alert(inputField.searchvalue);
    // }
  
    
  
  return (
    <div >
     {/* <div>
      <select name='searchtype' id='searchtype' onChange={inputsHandler} value={inputField.searchtype || null}>
        <option value={"id"}>ID</option>
        <option value={"class"}>Class</option>
      </select>            

            <br/>

            <input 
            type="text" 
            name="searchvalue" 
            onChange={inputsHandler} 
            placeholder="Search value" 
            value={inputField.searchvalue || null}/>

            <br/>

            <button onClick={submitButton} className='form-control'>Submit Now</button>
        </div> */}
       <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-8' style={{ marginBottom: 10 }}>
          <div className='row' >
            <div className='col-md-1' style={{marginLeft:"37%",paddingLeft:60,}}> <button onClick={previous} disabled={isDisabled} style={{ width: 41, height: 41, background: "gray", borderRadius: 25, color: "white" }}>🡨</button> </div>
            <div className='col-md-2' style={{borderRadius:1,fontSize:13,fontWeight:450,paddingLeft:50,marginRight:-50,marginTop:10,textDecoration:"underline"}}> <p >Page No:- {data.page_num} </p> </div>
            <div className='col-md-2' style={{fontSize:13,fontWeight:450,marginRight:-80,marginTop:10,textDecoration:"underline"}}> <p>Pg Count:- {data.page_count}</p>  </div>
            <div className='col-md-2' style={{fontSize:13,fontWeight:450,marginRight:-55,marginTop:10,textDecoration:"underline"}}> <p>Total Pages:- {data.total_pages}</p>  </div>
            <div className='col-md-2' style={{fontSize:13,fontWeight:450,marginRight:-20,marginTop:10,textDecoration:"underline"}}> <p>Total Records:- {data.total_count}</p>  </div>
            <div className='col-md-1' style={{fontSize:13,fontWeight:450}} onClick={Next}>  <button onClick={Next} style={{ width: 40, height: 40, background: "gray", borderRadius: 25, color: "white" }}>🡪</button></div>
          </div>
          {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
         component="div"
        count={rowData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
        </div>
      </div>

      <div  style={{ height: 450, overflowX: 'hidden', position: "relative", overflow: "auto" }}>
        <Table  responsive="sm" className='table container'  ref={scollToRef}>
          <thead style={{ position: "sticky", top: 0 }}  >
            <tr >
              <th>Id</th>
              <th >Date</th>
              <th >Image</th>
              <th >Language</th>
              <th >Top 3 class</th>
              <th >Parent Class</th>
              <th >Class Name</th>
              <th >Instructions</th>
              <th >Accuracy(%)</th>
              <th >Audio</th>
              <th >Latency (sec)</th>
              <th>User Name</th>
              <th>User Location</th>
              <th>User IP Address</th>
              <th>Weather</th>
            </tr>
          </thead>

          <tbody  >
            {rowData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                return (
                  <tr >
                    <td style={{ textAlign: "right" }}>{item.id}</td>
                    <td style={{ textAlign: "right", minWidth: 170 }}>{item.updated_on}</td>
                    <td>
                    <div>  <img src={item.image_path} onClick={() => EditImage(item) || handleOpenDialog()} width="70px" height="60px" style={{ borderRadius: "10px", marginLeft: 5 }} /></div>
                      {/* <Popup trigger={<button style={{ borderRadius: 5 }}> <img src={item.image_path} width="70px" height="60px" style={{ borderRadius: "10px" }} /></button>} position="right center">
                        <div>  <img src={item.image_path} onClick={ handleOpenDialog} width="320px" height="400px" style={{ borderRadius: "10px", marginLeft: 5 }} /></div>
                      </Popup> */}
                    </td>
                    <td style={{ textAlign: "left" }}>{item.language_name}</td>
                    <td style={{ textAlign: "right" }}>{item.TOP}</td>
                    <td style={{ textAlign: "left" }}>{item.lang_pt_class}</td>
                    <td style={{ textAlign: "left" }}>{item.lang_class}</td>
                    <td>
                      <Popup trigger={<button style={{ background: "white", width: 50 }}> 👁️‍🗨️ </button>} position="right center">
                        <div>{item.instruction2}</div>
                      </Popup>
                    </td>
                    <td style={{ textAlign: "right" }}>{item.predicted_probaility}</td>
                    <td>
                      <audio src={item.audio_file2} onPlay={(e) => { e.target.currentTime = 0; }}  controls/>
                    </td>
                    <td style={{ textAlign: "right" }}>{item.latency} </td>
                    <td>{item.user_name}</td>
                    <td>{item.user_loc}</td>
                    <td>{item.user_ipaddr}</td>
                    <td>{item.user_weather}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Dialog open={dialogOpen} style={{marginLeft:-490}}>
                    {/* <h1 >Dialog Title</h1>
                    <p>Dialog contents go here.</p> */}
                    <button onClick={handleCloseDialog} style={{ border: "none", background: "white", margin: 10,marginLeft:320 }}>✖</button>
                    <img src={imagedisplay}  width="320px" height="380px" style={{ borderRadius: "10px", marginLeft: 10,marginBottom:20 }} />
                </Dialog>
      </div>
    </div>
  );
}


export default Imagelivedata;

