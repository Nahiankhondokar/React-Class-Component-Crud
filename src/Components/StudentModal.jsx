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

    const { show, handleModalHide, type, dataId, allStudent, stuView, stuEdit, handleStudentUpdate } = this.props;
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

    // Student Delete
    const handleStudentDelete = () => {
      try{

        axios.delete('http://localhost:5050/students/' + dataId)
        .then(res => {
          allStudent();
          handleModalHide();
        });

      }catch(err){
        console.log(err);
      }
    }

    // student update
    const handleFormUpdate = (e) => {
      e.preventDefault();


      try{

        axios.patch(`http://localhost:5050/students/${stuEdit.id}`, stuEdit)
        .then(res => {
          handleModalHide();
        });
      }catch(err){
        console.log(err);
      }

    }


    // Modal show
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
                    }))}></Form.Control>
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
                <img style={{ width : '150px'}} src={ stuView.photo } alt="" />
                <div className="extra">
                  <h3>{ stuView.name }</h3>
                  <h3>{ stuView.email }</h3>
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
              <Button onClick={ handleStudentDelete } className='btn btn-sm' variant='danger'>Delete</Button>
            </Modal.Body>
        </Modal>
        </>
      )
    }else if( type === 'edit'){
      return (
        <>
        <Modal show={ show } onHide={ handleModalHide } centered >
            <Modal.Header>
              <h3 className='m-auto'>Edit Student</h3>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={ handleFormUpdate } method='POST'>
                
                <Form.Group>
                    <Form.Label>Student Name</Form.Label>
                    <Form.Control value={ stuEdit.name } onChange={ (e) => handleStudentUpdate({
                      ...stuEdit,
                      id : stuEdit.id,
                      name : e.target.value
                    }) }></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Student Email</Form.Label>
                    <Form.Control value={ stuEdit.email } onChange={ (e) => handleStudentUpdate({
                      ...stuEdit,
                      id : stuEdit.id,
                      email : e.target.value
                    }) }></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Student Photo</Form.Label>
                    <Form.Control value={ stuEdit.photo } onChange={ (e) => handleStudentUpdate({
                      ...stuEdit,
                      id : stuEdit.id,
                      photo : e.target.value
                    })}></Form.Control>
                </Form.Group>
  
                <Button type='submit' variant='info' className='btn-sm mt-3 text-center'>Add Student</Button>
  
              </Form>
            </Modal.Body>
        </Modal>
        </>
      )
    }
      
  }
}

export default StudentModal;