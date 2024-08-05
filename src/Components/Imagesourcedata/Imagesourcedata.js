import React, { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledEngineProvider } from '@mui/material/styles';
import { NavLink } from "react-router-dom";
import '../Imagesourcedata/Imagesourcedata.css'
import "../Imagesourcedata/Imagesourcedata.css"
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { Dialog } from '@mui/material';


function Imagesourcedata() {

  const columns = [
    { id: 'id', label: 'ID',minWidth: 20 },
    // { id: 'updated_on', label: 'Date', minWidth: 170 },
    { id: 'image_path', label: 'Image',minWidth: 10 },
    { id: 'source', label: 'Source', },
    { id: 'parent_class_name', label: 'Parent Class', },
    { id: 'class_name', label: 'Class Name', },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const avatarFormatteraudio = ({ value }) => {
    return <audio src={value} controls onPlay={(e) => { e.target.currentTime = 0; }} />;
  };

  const [data, setdata] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [pagenumber, setpagenumber] = useState(1);
  const [isDisabled, setisDisabled] = useState(false);
  const scollToRef = useRef();

  useEffect(() => {
    var obj = {};
    console.log(pagenumber, "pagenumabr ")
    // if (pagenumber <=0 || pagenumber ==1 || pagenumber <=0 ) {
    //   setisDisabled(true);
    //   console.log(pagenumber,"pagenumabr ")
    // }

    const requestOptions = {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch('http://192.168.100.188:5000/ima_records_source', requestOptions)
      .then(res => res.json())
      .then(result => {
        if (result.page_num == 1) {
          setisDisabled(true)
        } else {
          setisDisabled(false)
        }
        // console.log('====================================');
        // console.log("ll", result);
        setRowData(result.data)
        setimagedisplay(result.data.image_path)
        scollToRef.current.scrollIntoView()
        setdata(result)
        console.log(result)
        scollToRef.current.scrollIntoView()
        result.data.forEach(element => {
          if (element.image_path) {
            element.image_path = avatarFormatter({ value: element.image_path });
            element.audio_file_path = avatarFormatteraudio({ value: element.audio_file_path });
          }
        });
      });
  }, []);
  const [dialogOpen, setDialogOpen] = useState(false);
  function handleOpenDialog() {
    setDialogOpen(true);
  }

  function handleCloseDialog() {
    setDialogOpen(false);
  }

  const [imagedisplay, setimagedisplay] = useState("");
  function EditImage(value) {
    setimagedisplay(value)
    // setimagedisplay(avatarFormatter)
    // console.log(imagedisplay)
  }

  const avatarFormatter = ({ value }) => {
    return <img src={"http://35.219.173.78:8080/" + value}  onClick={() => EditImage(value) || handleOpenDialog()} width="80px" height="60px" />;
  };

  function Next() {
    var obj = {};
    var num = pagenumber + 1;
    setpagenumber(num);

    const requestOptions = {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch(`http://192.168.100.188:5000/ima_records_source?page_num=${num}&page_size=10`, requestOptions)
      .then(res => res.json())
      .then(result => {
        // console.log('====================================');
        // console.log("imaaaa", result);
        // console.log('====================================');
        setRowData(result.data)
       
        if (result.page_num == 1) {
          setisDisabled(true)
        } else {
          setisDisabled(false)
        }
        setdata(result)
        scollToRef.current.scrollIntoView()
        // console.log(rowData, "Image live data.......")
        result.data.forEach(element => {
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
    fetch(`http://192.168.100.188:5000/ima_records_source?page_num=${currentValue}&page_size=10`, requestOptions)
      .then(res => res.json())
      .then(result => {
        // console.log('====================================');
        // console.log("imaaaa", result);
        // console.log('====================================');
        setRowData(result.data)
        if (result.page_num == 1) {
          setisDisabled(true)
        } else {
          setisDisabled(false)
        }
        setdata(result)
        scollToRef.current.scrollIntoView()
        // console.log(rowData, "Image live data.......")
        result.data.forEach(element => {
          if (element.image_path) {
            element.image_path = avatarFormatter({ value: element.image_path });
            element.audio_file_path = avatarFormatteraudio({ value: element.audio_file_path });
          }
        });
      });

  }


  return (

    <div>

      <div className='row' style={{ marginBottom: 10, marginLeft: 45 }}>
        <div className='col-md-3' >
          <div style={{ marginLeft: "1%", marginLeft: "6%", width: "140px", padding: "4px", borderRadius: "8px", marginBottom: "15px", backgroundColor: "lightgray" }}>
            <NavLink style={{ fontSize: "15px", fontWeight: '450', textDecoration: "none", color: "black", marginLeft: "7px" }} to="/IMA-Instrctions" type='button'>Instructions - IMA</NavLink>
          </div>
        </div>

        <div className='col-md-8' style={{ marginLeft: 60 }}>
          <div className='row'>
            <div className='col-md-1' style={{ marginLeft: "33%", paddingLeft: 60, }}> <button onClick={previous} disabled={isDisabled} style={{ width: 40, height: 40, background: "gray", borderRadius: 25, color: "white" }}>🡨</button> </div>
            <div className='col-md-2' style={{ borderRadius: 1, fontSize: 13, fontWeight: 450, paddingLeft: 50, marginRight: -60, marginTop: 10, textDecoration: "underline" }}> <p >Pg No:- {data.page_num} </p> </div>
            <div className='col-md-2' style={{ fontSize: 13, fontWeight: 450, marginRight: -60, marginTop: 10, textDecoration: "underline" }}> <p>Page Count:- {data.page_count}</p>  </div>
            <div className='col-md-2' style={{ fontSize: 13, fontWeight: 450, marginRight: -50, marginTop: 10, textDecoration: "underline" }}> <p>Total Pages:- {data.total_pages}</p>  </div>
            <div className='col-md-2' style={{ fontSize: 13, fontWeight: 450, marginRight: -30, marginTop: 10, textDecoration: "underline" }}> <p>Total Records:- {data.total_count}</p>  </div>
            <div className='col-md-1' style={{ fontSize: 13, fontWeight: 450 }}>  <button onClick={Next} style={{ width: 40, height: 40, background: "gray", borderRadius: 25, color: "white" }}>🡪</button></div>
          </div>
        </div>
      </div>

      <StyledEngineProvider injectFirst >
        <div  style={{ paddingRight: "5%", paddingLeft: "5%" }}>
          <Paper  sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table  aria-label="sticky table" ref={scollToRef}>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}>
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
                              <TableCell  key={column.id} align={column.align} style={{ textAlign: column.id ? 'center' : "left" }}>
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
      <Dialog open={dialogOpen} style={{marginLeft:-300}}>
        {/* <h1 >Dialog Title</h1>
                    <p>Dialog contents go here.</p> */}
        <button onClick={handleCloseDialog} style={{ border: "none", background: "white", margin: 10, marginLeft: 300 }}>✖</button>
        <img src={"http://35.219.173.78:8080/" +imagedisplay} width="300px" height="300" style={{marginLeft:10,marginBottom:10}}/>
        
      </Dialog>
    </div>
  );
}

export default Imagesourcedata;

