import React,{useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { useFormik } from 'formik'
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

const UpdateModel = (props) => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    const formik = useFormik({
        initialValues:{
            firstName: props.data.firstName,
            lastName: props.data.lastName,
            email: props.data.email,
            password: props.data.password,
            phone: props.data.phone   
        },validate,
        onSubmit: values =>{
            axios.put(`https://628f4aff0e69410599d9b316.mockapi.io/Register/${props.data.id}`, values)
            .then(res =>{
                props.onHide(false)
                axios.get(`https://628f4aff0e69410599d9b316.mockapi.io/Register/`)
                .then((response) => {
                props.allData(response.data);
                })
            })
            // navigate('/display')
            console.log(values,"values")
            console.log("Hello")
        }
    })

  return (
        <Modal
        show={props.show}
        onHide = {props.onHide}
        centered= {true}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>

          <Modal.Title>Update</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control 
                    type="text"
                    name="firstName"
                    placeholder={props.data.firstName}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control 
                    type="text"
                    name="lastName"
                    placeholder={props.data.lastName}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type="email"
                    name="email"
                    placeholder={props.data.email}
                    value={formik.values.email}
                    onChange={formik.handleChange}></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control 
                    type="number"
                    name="phone"
                    placeholder={props.data.phone}
                    value={formik.values.phone}
                    onChange={formik.handleChange}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Button className='button-submit' type='submit' >Update</Button>
                    <Button className='button-cancle' variant="secondary" onClick={props.onHide}>Close</Button>
                </Form.Group>
            </Form>
        </Modal.Body>

      </Modal>
  )
}

export default UpdateModel