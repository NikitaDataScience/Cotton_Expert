import React, { useState, useEffect,useRef } from 'react';
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

function Voicesourcedata() {
  const columns = [
    { id: 'id', label: 'ID', minWidth: 80, },
    { id: 'language', label: 'Language', minWidth: 170 },
    { id: 'question', label: 'Question', minWidth: 170 },
    { id: 'answer', label: 'Answer', }
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const scollToRef = useRef();
  const [data, setdata] = useState([]);
  const [paginationdata, setpaginationdata] = useState([]);
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
    fetch('http://192.168.100.188:5000/va_records_source', requestOptions)
      .then(res => res.json())
      .then(result => {
        // console.log('====================================');
        // console.log("Va source", result);
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
  function submit() {
    var obj = {};
    var num = pagenumber + 1;
    setpagenumber(num);

    // obj["Page_num"] = count
    const requestOptions = {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch(`http://192.168.100.188:5000/va_records_source?page_num=${num}&page_size=10`, requestOptions)
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
      fetch(`http://192.168.100.188:5000/va_records_source?page_num=${currentValue}&page_size=10`, requestOptions)
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
        });
  }



  return (
    <div>
      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-8' style={{ marginBottom: 10 }}>
          <div className='row'>
            <div className='col-md-1' style={{marginLeft:"30%",paddingLeft:60,}}> <button onClick={previous} disabled={isDisabled} style={{ width: 40, height: 40, background: "gray", borderRadius: 25, color: "white" }}>🡨</button> </div>
            <div className='col-md-2' style={{borderRadius:1,fontSize:14,fontWeight:450,paddingLeft:40,marginRight:-50,marginTop:10,textDecoration:"underline"}}> <p >Page No:- {data.page_num} </p> </div>
            <div className='col-md-2' style={{fontSize:14,fontWeight:450,marginRight:-80,marginTop:10,textDecoration:"underline"}}> <p>Pg Count:- {data.page_count}</p>  </div>
            <div className='col-md-2' style={{fontSize:14,fontWeight:450,marginRight:-60,marginTop:10,textDecoration:"underline"}}> <p>Total Pages:- {data.total_pages}</p>  </div>
            <div className='col-md-2' style={{fontSize:14,fontWeight:450,marginRight:-30,marginTop:10,textDecoration:"underline"}}> <p>Total Records:- {data.total_count}</p>  </div>
            <div className='col-md-1' style={{fontSize:14,fontWeight:450}}>  <button onClick={submit} style={{ width: 40, height: 40, background: "gray", borderRadius: 25, color: "white" }}>🡪</button></div>
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
  );
}


export default Voicesourcedata;

