import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import UpdateModel from "./UpdateModel";
import './datatable.css';
import SortIcon from "@mui/icons-material/ArrowDownward";
import Checkbox from "@mui/material/Checkbox";

const DataForTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://628f4aff0e69410599d9b316.mockapi.io/Register/`)
      .then((response) => {
        setData(response.data);
      });
  }, []);

//----------For Model-------------------------------------
  const [show, setShow] = useState(false)
  const [dataForModel , setDataForModel] = useState({})

  const handleShow = (dataPropsForModel) =>{
    setShow(true)
    console.log(show)
    setDataForModel(dataPropsForModel)
  } 
  const handleClose = () => setShow(false)
//---------------------------------------------------------

//----------For Sorting------------------------------------
  const customSort = (rows, selector, direction) => {
    return rows.sort((rowA, rowB) => {
     // use the selector function to resolve your field names by passing the sort comparitors
     const aField = selector(rowA)
     const bField = selector(rowB)
   
     let comparison = 0;
   
     if (aField > bField) {
      comparison = 1;
     } else if (aField < bField) {
      comparison = -1;
     }
   
     return direction === 'desc' ? comparison * -1 : comparison;
    });
   };
//-----------------------------------------------------



const onDelete = (id) =>{
  axios.delete(`https://628f4aff0e69410599d9b316.mockapi.io/Register/${id}`)
  .then(res =>{
    console.log("data deleted Successfully!!!!")
    axios.get(`https://628f4aff0e69410599d9b316.mockapi.io/Register/`)
    .then((response) => {
        setData(response.data);
    })
  })
}

  const columns = [
    {
      
      name: "Firstname",
      selector: (row) => row.firstName,
      sortable: true,
      style:{
        fontSize: "15px"
      }
    },
    {
      
      name: "Lastname",
      selector: (row) => row.lastName,
      sortable: true,
      style:{
        fontSize: "15px"
      }
    },
    {
      
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      style:{
        fontSize: "15px"
      }
    },
    {
      
      name: "Phone",
      selector: (row) => row.phone,
      style:{
        fontSize: "15px"
      }
    },
    {
     
      cell: (row) => <button onClick={() => handleShow(row)}>Edit</button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      
      style:{
        marginLeft:"50px"
      },
      cell: (row) => <button onClick={() =>{
        onDelete(row.id)
      }}>Delete</button>
    }
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };
  
  return (
    <div>
      <DataTable
      title="Users"
      columns={columns} 
      data={data} 
      sortFunction={customSort} 
      pagination 
      selectableRows  
      selectableRowsComponent={Checkbox} 
      selectableRowsComponentProps={selectableRowsComponentProps} />
      {
        show ? <UpdateModel show={show} onHide={handleClose} SortIcon={<SortIcon />} allData={setData} data={dataForModel} /> :null
      }
    </div>
  );
};

export default DataForTable;
