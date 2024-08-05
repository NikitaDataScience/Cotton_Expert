import React, { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledEngineProvider } from '@mui/material/styles';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Header from '../Header/Header';


function Home() {
  const columns = [
    { id: 'id', label: 'ID', minWidth: 80, },
    { id: 'parent_class_name', label: 'Parent Class Name', minWidth: 170 },
    { id: 'class_name', label: 'Class Name', minWidth: 170 },
    { id: 'Symptom', label: 'Symptom', minWidth: 170 },
    { id: 'Management', label: 'Management', minWidth: 170 },

  ];
  const scollToRef = useRef();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const avatarFormatteraudio = ({ value }) => {
    return <audio src={value} onPlay={(e) => { e.target.currentTime = 0; }} controls />;
  };

  const [data, setdata] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [pagenumber, setpagenumber] = useState(1);
  const [isDisabled, setisDisabled] = useState(false);

  useEffect(() => {
    var obj = {};
    
    const requestOptions = {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch('http://192.168.100.188:5000/ima_source_instructions', requestOptions)
      .then(res => res.json())
      .then(result => {
        // console.log('====================================');
        // console.log("ll", result);
        // console.log('====================================');
        setRowData(result.data)
        if(result.page_num == 1){
          setisDisabled(true)
        }else{
          setisDisabled(false)
        }
        setdata(result)
        scollToRef.current.scrollIntoView()
      });

  }, []);

  const avatarFormatter = ({ value }) => {
    return <img src={value} width="50px" height="50px" />;
  };

  function Next() {
    var obj = {};
    var num = pagenumber + 1;
    setpagenumber(num);
    // obj["Page_num"] = count
    const requestOptions = {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch(`http://192.168.100.188:5000/ima_source_instructions?page_num=${num}&page_size=10`, requestOptions)
      .then(res => res.json())
      .then(result => {
        // console.log('====================================');
        // console.log("imaaaa", result);
        // console.log('====================================');
        setRowData(result.data)
        if(result.page_num == 1){
          setisDisabled(true)
        }else{
          setisDisabled(false)
        }
        setdata(result)
        scollToRef.current.scrollIntoView()
        // console.log(rowData, "Image live data.......")
        result.forEach(element => {
          if (element.image_path) {
            element.image_path = avatarFormatter({ value: element.image_path });
            element.audio_file_path = avatarFormatteraudio({ value: element.audio_file_path });
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
      fetch(`http://192.168.100.188:5000/ima_source_instructions?page_num=${currentValue}&page_size=10`, requestOptions)
        .then(res => res.json())
        .then(result => {
          // console.log('====================================');
          // console.log("imaaaa", result);
          // console.log('====================================');
          setRowData(result.data)
          if(result.page_num == 1){
            setisDisabled(true)
          }else{
            setisDisabled(false)
          }
        setdata(result)
          scollToRef.current.scrollIntoView()
          console.log(rowData, "Image live data.......")
          result.forEach(element => {
            if (element.image_path) {
              element.image_path = avatarFormatter({ value: element.image_path });
              element.audio_file_path = avatarFormatteraudio({ value: element.audio_file_path });
            }
          });
        });
    
  }

  return (
    <div class="totalbody">
      <Header />
      <div style={{ paddingRight: "5%", paddingLeft: "5%", paddingTop: "3%", }}>

        <div style={{
          textAlign: "center", marginBottom: "20px", fontSize: "20px", fontWeight: "550",
          textDecoration: "underline"
        }}>Instructions-IMA</div>
        <div className='row' style={{ marginBottom: 10 }}>
          <div className='col-md-3'> <button style={{
            marginLeft: "20%",
            width: 60, background: "gray", color: 'white', borderRadius: 2
          }}  > <a href='/sourcedata' style={{ color: "white", textDecoration: "none", }}>🡨 Back </a> </button></div>
         <div className='col-md-8' style={{ marginBottom: 10,marginLeft:50 }}>
          <div className='row'>
            <div className='col-md-1' style={{marginLeft:"36%",paddingLeft:60,}}> <button onClick={previous} disabled={isDisabled} style={{ width: 40, height: 40, background: "gray", borderRadius: 25, color: "white" }}>🡨</button> </div>
            <div className='col-md-2' style={{borderRadius:1,fontSize:13,fontWeight:450,paddingLeft:50,marginRight:-60,marginTop:10,textDecoration:"underline"}}> <p >Pg No:- {data.page_num} </p> </div>
            <div className='col-md-2' style={{fontSize:13,fontWeight:450,marginRight:-60,marginTop:10,textDecoration:"underline"}}> <p>Page Count:- {data.page_count}</p>  </div>
            <div className='col-md-2' style={{fontSize:13,fontWeight:450,marginRight:-50,marginTop:10,textDecoration:"underline"}}> <p>Total Pages:- {data.total_pages}</p>  </div>
            <div className='col-md-2' style={{fontSize:13,fontWeight:450,marginRight:-30,marginTop:10,textDecoration:"underline"}}> <p>Total Records:- {data.total_count}</p>  </div>
            <div className='col-md-1' style={{fontSize:13,fontWeight:450}}>  <button onClick={Next} style={{ width: 40, height: 40, background: "gray", borderRadius: 25, color: "white" }}>🡪</button></div>
          </div>
            {/* <TablePagination
        
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
          <div style={{ paddingRight: "5%", paddingLeft: "5%" }}>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table" ref={scollToRef}>
                  <TableHead>
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
                                <TableCell key={column.id} align={column.align}>
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
    </div>
  );
}


export default Home;

