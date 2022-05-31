import React, {useState, useEffect} from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'

const validate = values =>{
    const errors = {}
  
    if(!values.email){
      errors.email="Required"
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email="Invalid Email"
    }
  
    if(!values.password){
      errors.password="Required"
    }else if(values.password.toString().length< 8){
      errors.password = "Password must be more than 8 Characters"
    }
  
    return errors

  }

const Login = () => {

    const [data ,  setData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`https://628f4aff0e69410599d9b316.mockapi.io/Register`)
            .then((response) => {
                setData(response.data);
            })
        axios.get(`https://628f4aff0e69410599d9b316.mockapi.io/Register`)
            .then((response) => {
                setData(response.data);
            })
    }, [])



    const formik = useFormik({
        initialValues:{
          email:'',
          password:'',
        },validate,
        onSubmit: values =>{
    
              var filteredData = data.filter(x=> x.email == values.email && x.password == values.password)
              if(filteredData.length > 0){
                console.log("Login Successful")
                navigate('/datatable')
              }else{
                toast.error("Invalid UserName or Password",{
                              position: toast.POSITION.TOP_RIGHT
                            })
              }
        }
      })


  return (
    <div>
        <form action="" onSubmit={formik.handleSubmit}>
        <div className='login-form-container'>
        <h1>Login</h1>
        <div>
          <label htmlFor="email" className='email-label'>Email</label>
        </div>
        <input 
          type="email"
          name='email'
          className='form-control'
          onChange={formik.handleChange}
          value={formik.values.email} />
          {(formik.errors.email && formik.touched.email) ? <div className='error'>{formik.errors.email}</div> : null}
        
        <div>
          <label htmlFor="password" className='password-label'>Password</label>
        </div>
        <input
          type='password'
          name='password'
          className='form-control'
          onChange={formik.handleChange}
          value={formik.values.password} />
          {(formik.errors.password && formik.touched.password) ? <div className='error'>{formik.errors.password}</div> : null}

          

  
   <button type='submit' to='/display' className='btn btn-primary' >Submit</button> 
  

<ToastContainer limit={2} autoClose={3000} />

{/* <Outlet /> */}
        </div>
        
              
      </form>

      {/* <Data /> */}
    </div>
  )
}

export default Login