import React, { useState, useEffect,useRef } from 'react';
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledEngineProvider } from '@mui/material/styles';
import "../Voicelivedata/Voicelivedata.css"
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function Voicelivedata() {

  const columns = [
    { id: 'id', label: 'ID', minWidth: 50, },
    { id: 'updated_on', label: 'Date', minWidth: 150 },
    { id: 'language', label: 'Language', },
    { id: 'query_type', label: 'Query Type', minWidth: 110 },
    { id: 'input_query', label: 'Input Query', minWidth: 170 },
    { id: 'user_audio_path', label: 'User Audio' },
    { id: 'Response_Question', label: 'Response Question', minWidth: 170 },
    { id: 'text_response', label: 'Text Response', minWidth: 250 },
    { id: 'Top_3_QA', label: 'Top 3 QA', minWidth: 110 },
    { id: 'class_name', label: 'Class Name' },
    { id: 'predicted_similarity_score', label: 'Accuracy (%)', minWidth: 140 },
    { id: 'Response_audio_file', label: 'Audio Response', minWidth: 150 },
    { id: 'latency', label: 'Latency (sec)' },
    { id: 'user_name', label: 'User Name', minWidth: 90 },
    { id: 'user_loc', label: 'User Location', minWidth: 90 },
    { id: 'user_ipaddr', label: 'User IP Address', minWidth: 110 },
    { id: 'user_weather', label: 'Weather', minWidth: 120 },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const avatarFormatteraudio = ({ value }) => {
    return <audio src={value} onPlay={(e) => { e.target.currentTime = 0; }} controls style={{ width: "220px" }} />
   
  };
  const avatarFormatteraudio2 = ({ value }) => {
    return <audio src={value} onPlay={(e) => { e.target.currentTime = 0; }} controls style={{ width: "220px" }} />;
  };

  const [rowData, setRowData] = useState([]);
  const [pagenumber, setpagenumber] = useState(1);
  const [isDisabled, setisDisabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();
  const [data, setdata] = useState([]);

  const scollToRef = useRef();

  useEffect(() => { 
    var obj = {};
    // setpagenumber(2)
    const requestOptions = {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj) 
    };
    fetch('http://192.168.100.188:5000/va_records_live?page_num=1&page_size=10', requestOptions)
      .then(res => res.json())
      .then(result => {
        // console.log("va records", result);
        setRowData(result.data)
        if(result.page_num == 1){
          setisDisabled(true)
        }else{
          setisDisabled(false)
        }
        setdata(result)
        scollToRef.current.scrollIntoView()
        // console.log(rowData, "Va live data")
        result.data.forEach(element => {
          if (element.user_audio_path) {
            element.user_audio_path = avatarFormatteraudio({ value: element.user_audio_path });
          }
          if (element.Response_audio_file) {
            element.Response_audio_file = avatarFormatteraudio2({ value: element.Response_audio_file });
          }
          if(element.updated_on){
            const dateStr = element.updated_on;
            // console.log(dateStr,"11111")
            const formattedDate = dateStr.replace('T', ' ');
            // console.log(formattedDate,"dcfvghj")
            element.updated_on = formattedDate
          }
        
        });
      
        // console.log('====================================');
      });
  //  console.log(pagenumber,"landing page")   
  }, []);


  function Next() {
    var obj = {};
    var num = pagenumber+1;
    setpagenumber(num);
    const requestOptions = {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch(`http://192.168.100.188:5000/va_records_live?page_num=${num}&page_size=10`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result, "va next print data")
        // console.log(pagenumber,"page number....................")
        setRowData(result.data)
        if(result.page_num == 1){
          setisDisabled(true)
        }else{
          setisDisabled(false)
        }
        setdata(result)
        scollToRef.current.scrollIntoView()
        result.data.forEach(element => {
          if (element.user_audio_path) {
            element.user_audio_path = avatarFormatteraudio({ value: element.user_audio_path });
          }
          if (element.Response_audio_file) {
            element.Response_audio_file = avatarFormatteraudio2({ value: element.Response_audio_file });
          }
          if(element.updated_on){
            const dateStr = element.updated_on;
            // console.log(dateStr,"11111")
            const formattedDate = dateStr.replace('T', ' ');
            // console.log(formattedDate,"dcfvghj")
            element.updated_on = formattedDate
          }
    
        });
      });
  }

  function previous() {
    var obj = {};
    const currentValue = pagenumber-1;
   
    
    setpagenumber(currentValue);
    console.log(pagenumber)
    const requestOptions = {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(obj)
    };
    fetch(`http://192.168.100.188:5000/va_records_live?page_num=${currentValue}&page_size=10`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result, "Va previous print data") 
        // console.log(currentValue,"page number....................")
        setRowData(result.data)
        if(result.page_num == 1){
          setisDisabled(true)
        }else{
          setisDisabled(false)
        }
        setdata(result)
        scollToRef.current.scrollIntoView()
        result.data.forEach(element => {
          if (element.user_audio_path) {
            element.user_audio_path = avatarFormatteraudio({ value: element.user_audio_path });
          }
          if (element.Response_audio_file) {
            element.Response_audio_file = avatarFormatteraudio2({ value: element.Response_audio_file });
          }
          if(element.updated_on){
            const dateStr = element.updated_on;
            // console.log(dateStr,"11111")
            const formattedDate = dateStr.replace('T', ' ');
            // console.log(formattedDate,"dcfvghj")
            element.updated_on = formattedDate
          }
        });
      });
   
  
  }
  return (
    <div>
      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-8' style={{ marginBottom: 10 }}>
          <div className='row'>
            <div className='col-md-1' style={{marginLeft:"36%",paddingLeft:60,}}> <button onClick={previous} disabled={isDisabled}  style={{ width: 40, height: 40, background: "gray", borderRadius: 25, color: "white" }}>🡨</button> </div>
            <div className='col-md-2' style={{borderRadius:1,fontSize:13,fontWeight:450,paddingLeft:40,marginRight:-70,marginTop:10,textDecoration:"underline"}}> <p >Pg No:- {data.page_num} </p> </div>
            <div className='col-md-2' style={{fontSize:13,fontWeight:450,marginRight:-60,marginTop:10,textDecoration:"underline"}}> <p>Page Count:- {data.page_count}</p>  </div>
            <div className='col-md-2' style={{fontSize:13,fontWeight:450,marginRight:-50,marginTop:10,textDecoration:"underline"}}> <p>Total Pages:- {data.total_pages}</p>  </div>
            <div className='col-md-2' style={{fontSize:13,fontWeight:450,marginRight:-30,marginTop:10,textDecoration:"underline"}}> <p>Total Records:- {data.total_count}</p>  </div>
            <div className='col-md-1' style={{fontSize:13,fontWeight:450}}>  <button onClick={Next} style={{ width: 40, height: 40, background: "gray", borderRadius: 25, color: "white" }}>🡪</button></div>
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


      <StyledEngineProvider injectFirst>
        <div style={{ paddingRight: "1%", paddingLeft: "1%" }}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 450 }}>
              <Table stickyHeader aria-label="sticky table" ref={scollToRef}>
                <TableHead >
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align} style={{ textAlign: column.numeric ? 'right' : 'left' }}>
                                {value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

          </Paper>

        </div>
      </StyledEngineProvider>
    </div>
  );
}


export default Voicelivedata;

