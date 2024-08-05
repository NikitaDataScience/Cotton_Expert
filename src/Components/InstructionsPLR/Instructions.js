import React, { useState, useEffect, useRef } from 'react';
import '../InstructionsPLR/Instructions.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledEngineProvider } from '@mui/material/styles';
import Header from '../Header/Header';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const columns = [
  { id: 'id', label: 'ID', minWidth: 80, },
  { id: 'brand_name', label: 'Brand Name', minWidth: 170 },
  { id: 'instruction', label: 'Instruction', minWidth: 170 },

];


function Home() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [rowData, setRowData] = useState([]);
  const [data, setdata] = useState([]);
  const [pagenumber, setpagenumber] = useState(1);
  const [isDisabled, setisDisabled] = useState(false);
  const scollToRef = useRef();
  useEffect(() => {
    var obj = {};
   
    const requestOptions = {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch('http://192.168.100.188:5000/plr_source_instructions', requestOptions)
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
    fetch(`http://192.168.100.188:5000/plr_source_instructions?page_num=${num}&page_size=10`, requestOptions)
      .then(res => res.json())
      .then(result => {
        // console.log('====================================');
        // console.log("imaaaa", result);
        // console.log('====================================');
        setRowData(result.data)
        setdata(result)
        scollToRef.current.scrollIntoView()
        // console.log(rowData, "Image live data.......")

      });
  }

  function previous() {
    var obj = {};
    const currentValue = pagenumber - 1;
    if (currentValue <= 0) {
      setisDisabled(true);
    } else {
      setpagenumber(currentValue);
      const requestOptions = {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      };
      fetch(`http://192.168.100.188:5000/plr_source_instructions?page_num=${currentValue}&page_size=10`, requestOptions)
        .then(res => res.json())
        .then(result => {
          // console.log('====================================');
          // console.log("imaaaa", result);
          // console.log('====================================');
          setRowData(result.data)
        setdata(result)
          scollToRef.current.scrollIntoView()
          // console.log(rowData, "Image live data.......")

        });
    }
  }

  

  return (
    <div>
      <Header />
      <div style={{ paddingRight: "5%", paddingLeft: "5%", paddingTop: "3%", }}>
        <div style={{
          textAlign: "center", marginBottom: "20px", fontSize: "20px", fontWeight: "550",
          textDecoration: "underline"
        }}>Instructions-PLR</div>
        <div className='row' style={{ marginBottom: 10 }}>
          
          <div className='col-md-2'> <button style={{
            marginLeft: "32%",
            width: 60, background: "gray", color: 'white', borderRadius: 2
          }}  > <a href='/sourcedata' style={{ color: "white", textDecoration: "none", }}>🡨 Back </a> </button></div>
           <div className='col-md-9' style={{ marginBottom: 10,marginLeft:100 }}>
          <div className='row'>
            <div className='col-md-1' style={{marginLeft:"34%",paddingLeft:60,}}> <button onClick={previous} disabled={isDisabled} style={{ width: 40, height: 40, background: "gray", borderRadius: 25, color: "white" }}>🡨</button> </div>
            <div className='col-md-2' style={{borderRadius:1,fontSize:13,fontWeight:450,paddingLeft:30,marginRight:-90,marginTop:10,textDecoration:"underline"}}> <p >Pg No:- {data.page_num} </p> </div>
            <div className='col-md-2' style={{fontSize:13,fontWeight:450,marginRight:-70,marginTop:10,textDecoration:"underline"}}> <p>Page Count:- {data.page_count}</p>  </div>
            <div className='col-md-2' style={{fontSize:13,fontWeight:450,marginRight:-50,marginTop:10,textDecoration:"underline"}}> <p>Total Pages:- {data.total_pages}</p>  </div>
            <div className='col-md-2' style={{fontSize:13,fontWeight:450,marginRight:-30,marginTop:10,textDecoration:"underline"}}> <p>Total Records:- {data.total_count}</p>  </div>
            <div className='col-md-1' style={{fontSize:13,fontWeight:450}}>  <button onClick={Next} style={{ width: 40, height: 40, background: "gray", borderRadius: 25, color: "white" }}>🡪</button></div>
          </div>

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

