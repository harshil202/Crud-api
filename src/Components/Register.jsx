import React, {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import './register.css'
import {ToastContainer, toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';



const validate = values =>{

    const errors = {}
    if(!values.firstName){
        errors.firstName='Required'
    }else if(values.firstName.length > 15){
        errors.firstName = "Must be 15 character or less"
    }

    if(!values.lastName){
        errors.lastName = "Required"
    }else if(values.lastName.length > 15){
        errors.lastName= "Must be 15 character or less"
    }

    if(!values.email){
        errors.email = "Required"
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = "Invalid Email"
    }

    if(!values.phone){
        errors.phone = "Required"
    }else if((values.phone.toString().length !=  10)){
        errors.phone = "Invalid Number"
    }

    if(!values.password){
        errors.password="Required"
    }else if(values.password.toString().length < 8){
        errors.password = "Password must be more than 8 Characters"
    }

    
    return errors
}

let data = [

]


const Register = () => {

    var filteredData
    const [data ,  setData] = useState([])
    const navigate = useNavigate()
    let [isUserRegistered, setIsUserRegistered] = useState(false)
    useEffect(() => {
        axios.get(`https://628f4aff0e69410599d9b316.mockapi.io/Register`)
            .then((response) => {
                setData(response.data);
            })
    }, [])

    console.log(data)
    const formik = useFormik({
        initialValues:{
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
            password:'',
        },validate,
        onSubmit: values =>{

            filteredData = data.filter(item => item.email === values.email)
            if(filteredData.length > 0){
                // setIsUserRegistered(true)
                isUserRegistered = true
            }else{
                // setIsUserRegistered(false)
                isUserRegistered = false
            }

            console.log(isUserRegistered)
            
            if(isUserRegistered){
                toast.error("User already exists",{
                    position: toast.POSITION.TOP_RIGHT
                  })
                console.log("in side if")
            }else{
                console.log(formik.values, "ddfvdfbsfbdfb")
                axios.post('https://628f4aff0e69410599d9b316.mockapi.io/Register',formik.values
                )
                navigate('/login')
            }
        }
    })












  return (
    <div>
        <div className='main-container'>
        <div className='registration-header'>

        </div>
        <form action="" onSubmit={formik.handleSubmit} className='form-container'>
        <div className="register-form-container">

       
        
        <h1>Sign Up</h1>
        <div className='inputs'>

        {/* <div>
            <label className="input-label" htmlFor="Profile-image">Profile Image</label>
        </div>
        <input type='file' className='image-button' onChange={uploader}  />
        { url.length >0 ? <img src={url} width={100} height={100} /> : null } */}

        <div>
            <label className="input-label"htmlFor="firstName">FirstName</label>
        </div>

        <input 
        type="firstName"
        name='firstName'
        placeholder='First Name'
        className='form-control'
        onChange={formik.handleChange}
        value={formik.values.firstName}
        onBlur={formik.handleBlur} />
        {(formik.errors.firstName && formik.touched.firstName) ? <div className='error'>{formik.errors.firstName}</div> : null }
    </div>


    <div className='inputs'>
        <div>
            <label className="input-label"htmlFor="lastName">LastName</label>
        </div>

        <input 
        type="lastName"
        name='lastName'
        placeholder='Last Name'
        className='form-control'
        onChange={formik.handleChange}
        value={formik.values.lastName}
        onBlur={formik.handleBlur} />
        {(formik.errors.lastName && formik.touched.lastName) ? <div className='error'>{formik.errors.lastName}</div> : null}
    </div>

    <div className='inputs'>
        <div>
            <label className="input-label"htmlFor="email">Email</label>
        </div>

        <input 
        type="email"
        name='email'
        placeholder='Email'
        className='form-control'
        onChange={formik.handleChange}
        value={formik.values.email}
        onBlur={formik.handleBlur} />
        {(formik.errors.email && formik.touched.email) ? <div className='error'>{formik.errors.email}</div> : null}
    </div>

    <div className='inputs'>
        <div>
            <label className="input-label"htmlFor="phone">Phone</label>
        </div>

        <input 
        type='number'
        name='phone'
        placeholder='Phone'
        className='form-control'
        onChange={formik.handleChange}
        value={formik.values.phone}
        onBlur={formik.handleBlur} />
        {(formik.errors.phone && formik.touched.phone) ? <div className='error'>{formik.errors.phone}</div> : null}
    </div>

    <div className='inputs'>
        <div>
            <label className="input-label"htmlFor="password">Password</label>
        </div>
        <input 
        type="password"
        name='password'
        placeholder='Password'
        className='form-control'
        onChange={formik.handleChange}
        value={formik.values.password}
        onBlur={formik.handleBlur} />
        {(formik.errors.password && formik.touched.password) ? <div className='error'>{formik.errors.password}</div> : null}
    </div>
        <button type='submit' className='btn btn-primary'  >Submit</button>
        </div>

        {/* <input type='file' accept='image/*' onChange={handleChange} /> */}
        {/* <UploadForm uploader = {uploader}/> */}
        {/* <Cropper src={url} /> */}
        </form>

        

        <ToastContainer />
        {/* <ListData /> */}
        {/* <Data data={data} /> */}

        
    </div>
    </div>
  )
}

export default Register