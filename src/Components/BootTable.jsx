import React,{useState, useEffect} from 'react'
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const BootTable = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
        .get(`https://628f4aff0e69410599d9b316.mockapi.io/Register/`)
        .then((response) => {
            setData(response.data);
        });
    }, []);

    const columns = [
        {
            dataField:"id",
            text:"Id"
        },
        {
            dataField: "firstName",
            text:"Firstname",
        },
        {
            dataField: "lastName",
            text:"Lastname"
        },
        {
            dataField: "email",
            text:"Email"
        },
        {
            dataField: "phone",
            text:"Phone"
        }
    ]



  return (
    <div>
        <BootstrapTable keyField='id' columns={columns} data={data} />
    </div>
  )
}

export default BootTable