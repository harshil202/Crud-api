import {Routes, Route} from 'react-router-dom'
import Register from './Components/Register';
import Login from './Components/Login';
import DisplayData from './Components/DisplayData';
import Update from './Components/Update';
import DataForTable from './Components/DataTable';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/display" element={<DisplayData />} />
        <Route path="/update" element={<Update />} />
        <Route path='/datatable' element={<DataForTable />} />
      </Routes>
    </div>
  );
}


//This is comment
export default App;
