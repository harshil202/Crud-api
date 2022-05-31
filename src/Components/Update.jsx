import React,{useState,useEffect} from 'react'
import { useFormik } from 'formik'
import {useNavigate, useSearchParams,useLocation} from 'react-router-dom'
import axios from 'axios'


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

    return errors

}

function Update(state) {



    const [data, setData] = useState([])
    
    const location = useLocation()
    let tData
    useEffect(()=>{
        const loadData = async () => {
            const response = await axios.get(`https://628f4aff0e69410599d9b316.mockapi.io/Register?id=${id}`)
                    console.log(response.data)
                    setData((response.data));
                    // tData = response.data
    }

    loadData()
    },[])

    console.log(location.state,"vdfvfv")
    const [url] =useSearchParams()
    let id = url.get('id')
    console.log(id)

    let dataForValue = location.state.filter(x => x.id == id)
    console.log(dataForValue,"data for")
    
    
    const navigate = useNavigate()
   
    console.log(data,"data")
  

//   console.log(dataForValue,"dfdfvdfbdfhtg")

//   console.log(dataForValue.firstName,"hhhhh")

console.log(state)
        const formik = useFormik({

            initialValues:{
                firstName: dataForValue[0].firstName,
                lastName: dataForValue[0].lastName,
                email: dataForValue[0].email,
                password: dataForValue[0].password,
                phone: dataForValue[0].phone
                
            },validate,
            onSubmit: values =>{
                axios.put(`https://628f4aff0e69410599d9b316.mockapi.io/Register/${id}`, values).then(res=> {navigate('/display')})
                // navigate('/display')
                console.log(values,"values")
            }
        })
    
  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            <div className='register-form-container'>
                <h1>
                    Update
                </h1>
            <div>
                <label className="input-label" htmlFor="firstName">FirstName</label>
            </div>
            <input
                type='text'
                name="firstName"
                placeHolder="First Name"
                className='form-control'
                onChange={formik.handleChange}
                value={formik.values.firstName} />
                {(formik.errors.firstName && formik.touched.firstName) ? <div className='error'>{formik.errors.firstName}</div> : null }

            <div>
                <label className="input-label" htmlFor="lastName">LastName</label>
            </div>
            <input
                type='text'
                name="lastName"
                placeHolder="First Name"
                className='form-control'
                onChange={formik.handleChange}
                value={formik.values.lastName} />
                {(formik.errors.lastName && formik.touched.lastName) ? <div className='error'>{formik.errors.lastName}</div> : null}
            <div>
                <label className="input-label" htmlFor="email">Email</label>
            </div>
            <input
                type='email'
                name="email"
                placeHolder="First Name"
                className='form-control'
                onChange={formik.handleChange}
                value={formik.values.email} />
                {(formik.errors.email && formik.touched.email) ? <div className='error'>{formik.errors.email}</div> : null}

            <div>
                <label className="input-label" htmlFor="phone">Phone</label>
            </div>
            <input
                type='number'
                name="phone"
                placeHolder="First Name"
                className='form-control'
                onChange={formik.handleChange}
                value={formik.values.phone} />
                {(formik.errors.phone && formik.touched.phone) ? <div className='error'>{formik.errors.phone}</div> : null}
            
            <div>
                <button type='submit' className='btn btn-primary'>Update</button>
            </div>

            </div>
            
            
        </form>
    </div>
  )
}

export default Update