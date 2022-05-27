import axios from 'axios';
import React, { Component } from 'react'
import { Form, Modal, Button } from 'react-bootstrap';

class StudentModal extends Component {
    constructor(props){
        super(props);

        this.state = {
          input : {
            name : '',
            email : '',
            photo : ''
          }
        }
    }



  render() {

    const { show, handleModalHide, type } = this.props;
    const { name, email, photo } = this.state.input;

    // form submit 
    const handleFormSubmit = (e) => {
      e.preventDefault();

      axios.post('http://localhost:5050/students', this.state.input)
      .then(res => {
        this.setState((prevState) => ({
          ...prevState,
          input : {
            ...prevState.input,
            name : '',
            email : '',
            photo : '' 
          }
        }));
        handleModalHide();

      });

    }

    if( type === 'create' ){
      return (
        <>
        <Modal show={ show } onHide={ handleModalHide } centered >
            <Modal.Header>
              <h3 className='m-auto'>Add Student</h3>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={ handleFormSubmit } method='POST'>
                
                <Form.Group>
                    <Form.Label>Student Name</Form.Label>
                    <Form.Control value={ name } onChange={ (e) => this.setState((prevState) => ({
                      ...prevState,
                      input : {
                        ...prevState.input,
                        name : e.target.value
                      }
                    })) }></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Student Email</Form.Label>
                    <Form.Control value={ email } onChange={ (e) => this.setState((prevState) => ({
                      ...prevState,
                      input : {
                        ...prevState.input,
                        email : e.target.value
                      }
                    })) }></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Student Photo</Form.Label>
                    <Form.Control value={ photo } onChange={ (e) => this.setState((prevState) => ({
                      ...prevState,
                      input : {
                        ...prevState.input,
                        photo : e.target.value
                      }
                    })) }></Form.Control>
                </Form.Group>
  
                <Button type='submit' variant='info' className='btn-sm mt-3 text-center'>Add Student</Button>
  
              </Form>
            </Modal.Body>
        </Modal>
        </>
      )
    }else if( type === 'view'){
      return (
        <>
        <Modal show={ show } onHide={ handleModalHide } >
            <Modal.Header>
              <h3 className='m-auto'>Single Student</h3>
            </Modal.Header>
            <Modal.Body>
              <div className="student-info d-flex gap-5">
                <img style={{ width : '150px'}} src="https://billey.thememove.com/wp-content/uploads/2019/08/team-member-01.jpg" alt="" />
                <div className="extra">
                  <h3>Nahian</h3>
                  <h3>Nahian@gmail.com</h3>
                </div>
              </div>
            </Modal.Body>
        </Modal>
        </>
      )
    }else if( type === 'delete'){
      return (
        <>
        <Modal show={ show } onHide={ handleModalHide } centered >
            <Modal.Header>
            
            </Modal.Header>
            <Modal.Body>
            <h3 className='m-auto'> Student Delete ? </h3>
            <hr />
              <Button onClick={ handleModalHide }  className='btn btn-sm' variant='success'>Cancel</Button>&nbsp;
              <Button onClick='' className='btn btn-sm' variant='danger'>Delete</Button>
            </Modal.Body>
        </Modal>
        </>
      )
    }
      
  }
}

export default StudentModal;