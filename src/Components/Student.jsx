import axios from 'axios';
import React, { Component } from 'react'
import { Card, Table, Button, Container, Row, Col } from 'react-bootstrap';
import StudentModal from './StudentModal';


class Student extends Component {

  // Modal manage state
  state = {
    modal : {
      status : false,
      type  : ''
    }, 
    alert : {
      status : false,
      msg : '',
      type : ''
    }, 
    students : []
  }


  // componentDidMount(){

  //   axios.get('http://localhost:5050/students')
  //   .then(res => {
  //     this.setState((prevState) => ({
  //       ...prevState,
  //       students : res.data
  //     }));
  //   });

  // };

   
  render() {

    // state distructure
    const { status, type } = this.state.modal;
    const { students } = this.state;

    // Modal show
    const handleModalShow = (e) => {
        e.preventDefault();

        this.setState({
          ...this.state,
          modal : {
            status : true,
            type  : "create"
          }
        });
    }

    // Modal Hide
    const handleModalHide = () => {
      this.setState({
        ...this.state,
        modal : {
          status : false
        }
      });
    }


    // Modal View
    const handleView = (id) => {
      this.setState({
        ...this.state,
        modal : {
          status : true,
          type : 'view'
        }
      });
    }

  // Modal Delete
  const handleDelete = (id) => {
    this.setState({
      ...this.state,
      modal : {
        status : true,
        type : 'delete'
      }
    });
  }


  // Get All Student 
  const GetAllStudent = () => {

    axios.get('http://localhost:5050/students')
    .then(res => {
      this.setState((prevState) => ({
        ...prevState,
        students : res.data
      }));
    });

  }
  GetAllStudent();



    return (
      <>
  
        <StudentModal show={ status } type={ type } handleModalHide={ handleModalHide } />

        <section className="student my-5">
        <Container>
          <Row>
            <Col md={ 9 } className='m-auto'>
            
              <a href='#' className='btn btn-info btn-sm mb-2' variant='info' onClick={ (e) => handleModalShow(e) }>Add Product</a>
              <Card>
                <Card.Header>
                  <h4 className='text-center'>All Student</h4>
                </Card.Header>
                <Card.Body className='student-table shadow'>
                    <Table>
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Photo</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
        
                        {
                          students.map((data, index) => 
                          <tr>
                            <td>{ index + 1 }</td>
                            <td>{ data.name }</td>
                            <td>{ data.email }</td>
                            <td><img style={{ width : '40px', height : '40px'}} src={ data.photo } alt="" /></td>
                            <td>
                            <Button onClick={ () => handleView(2) } className='btn-sm' variant='info'>View</Button>&nbsp;
                            <Button onClick='' className='btn-sm' variant='warning'>Edit</Button>&nbsp;
                            <Button onClick={ () => handleDelete(2) } className='btn-sm' variant='danger'>Delete</Button>
                            </td>
                          </tr>
                          )
                        }
                         
                      
        
                      </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        </section>

      </>
    )
  }
}

export default Student;