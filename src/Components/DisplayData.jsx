import React,{useState} from 'react'
import { useEffect } from 'react'
import {useTable, usePagination} from 'react-table'
import {useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import UpdateModel from './UpdateModel'
import './display.css'
import ReactPaginate from 'react-paginate'




function Table({ columns, data }) {

  
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setHiddenColumns,
    state
  } = useTable({
    columns, 
    data,
    initialState: {pageIndex : 2}
  }, usePagination)

  const { pageIndex, pageSize } = state;
    // Render the UI for your table

    
    return (
      <>
      
      <table {...getTableProps()} className='table'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className='table-heading' {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={row.id}>{console.log(row.id)}
                {row.cells.map(cell => {
                  //console.log(row.original.email)
                  return( 
  
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  )
                       
                })}
                
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 6, 7].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>


      </div>
      </>
    )
  }

function DisplayData() {

  var temp = 0
   
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const [show, setShow] = useState(false)
  const [dataForModel , setDataForModel] = useState({})

    useEffect(()=>{

        axios.get(`https://628f4aff0e69410599d9b316.mockapi.io/Register/`)
        .then((response) => {
            setData(response.data);
        })

    },[])

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
    
    console.log(show)

    const handleShow = (dataPropsForModel) =>{
      setShow(true)
      console.log(show)
      setDataForModel(dataPropsForModel)
    } 
    const handleClose = () => setShow(false)

const handleClick = (id) =>{
  console.log(id)
}


const columns = React.useMemo(
  () =>[
    {
      Header: "Login Successful!",
      columns: [
        {
          Header: 'FirstName',
          accessor: 'firstName'
        },
        {
          Header:'LastName',
          accessor:'lastName'
        },
        {
          Header:'Email',
          accessor:'email'
        },
        {
          Header:'Phone',
          accessor:'phone'
        },
        {
          Header: "Edit",
          accessor:"Edit",
          Cell: cell =>(
            <button className='' onClick={() =>
              handleShow(cell.row.original)
              // navigate(`/update?id=${cell.row.original.id}`, {state:data} )
            } >Edit{console.log(data)}</button>
          )
        },
        {
          Header:"Delete",
          accessor:"Delete",
          Cell:cell=>(
            <button onClick={() => onDelete(cell.row.original.id)}>Delete</button>
          )
        }
      ]
    }
  ]
)

console.log(show)

  return (
    <div>

     <Table columns={columns} data={data} />
     
      {
        show ? <UpdateModel show={show} onHide={handleClose} allData={setData} data={dataForModel} /> :null
      }

    </div>
  )
}

export default DisplayData