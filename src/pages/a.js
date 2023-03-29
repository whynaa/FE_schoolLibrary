import { useState, useEffect } from 'react';
import { getAllMembers, addMember } from '../API/apiMembers'
import { Container, Table, Button, Modal, Image, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from "react-icons/fa";

function A() {
    const [members, setMembers] = useState([]);
    const [data, setData] = useState([{
      id : '',
      name : '',
      gender : '',
      contact : '',
      address : '',
      photo : null
    }]);
    const [show, setShow] = useState(false);
    const [change, setChange] = useState(false)
    const [action, setAction] = useState('');
    const url = "http://localhost:8000/image/photo/"

    useEffect(() => {
      fetchMember()
    }, []);

    const fetchMember = async () => {
        const data = await getAllMembers();
        setMembers(data);
      };
    
    const handleAdd = () => {
      setShow(true)
      setAction('add')
      setData({
        id: '',
        name: '',
        gender: '',
        contact: '',
        address: '',
        photo: null
      })
    }

    const handleEdit = (item) => {
      setShow(true)
      setAction('edit')
      setData({
        id: item.id,
        name: item.name,
        gender: item.gender,
        contact: item.contact,
        address: item.address,
        photo: item.photo
      })
    }

    const handleDelete = (id) => {
      alert("Are you sure delete this data?")

    }

    const handleClose = () => {
      setShow(false)
      setChange(false)
    }

    const handleSave = async (e) => {
      e.preventDefault()
      setChange(false)
      let form = new FormData()
      form.append("id", data.id)
      form.append("name", data.name)
      form.append("gender", data.gender)
      form.append("contact", data.contact)
      form.append("address", data.address)
      form.append("photo", data.photo)
      
      if (action === "add") {
        const add = addMember(form)
        console.log(add)
        if (add) {
          alert("Add Member Success")
          fetchMember()
        }
        else{
          alert("Add Member Failed")
        }
      }
      else if (action === "edit"){
        const edit = await addMember(form)
        if (edit) {
          alert("Edit Member Success")
        }
        else{
          alert("Edit Member Failed")
        }
      }
    }

    return (
        <Container className="mt-3">
            <h1 className="text-bold text-info">Member</h1>
            <Button variant="success" size="md" className="m-2" onClick={handleAdd}>Add Member</Button>
            <Table striped bordered hover>
              <caption>Member List</caption>
              <thead className='text-center'>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Photo</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {members.map((item, index) => (
                  <tr key={item.id}>
                    <td className='text-center'>{index + 1}</td>
                    <td>{item.name}</td>
                    <td className='text-center'>{item.gender}</td>
                    <td>{item.contact}</td>
                    <td>{item.address}</td>
                    <td className='text-center'><Image rounded src={url + item.photo} style={{ width: 'auto', height: '100px' }} /></td>
                    <td className='text-center'>
                      <Button variant="primary" size="sm" className="m-2" onClick={() => handleEdit(item)}><FaEdit /></Button>
                      <Button variant="danger" size="sm" className="m-2" onClick={() => handleDelete(item.id)}><FaTrash /></Button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Form Member</Modal.Title>
              </Modal.Header>
              <Form onSubmit={e => handleSave(e)}>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" type="text" placeholder="Enter name" value={data.name} onChange={e => setData({...data, name:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select name="gender" value={data.gender} onChange={e => setData({...data, gender:e.target.value})}>
                    <option value="">~~Choose Gender~~</option>
                    <option value="P">Female</option>
                    <option value="L">Male</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="contact">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control name="contact" type="text" placeholder="Enter Contact" value={data.contact} onChange={e => setData({...data, contact:e.target.value})} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control name="address" type="text" placeholder="Enter Address" value={data.address} onChange={e => setData({...data, address:e.target.value})} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="photo">
                  <Form.Label>Photo</Form.Label>
                  <div>
                    <Image rounded src={data.photo !== null ? change ? URL.createObjectURL(data.photo) : url + data.photo : null} value={data.photo} style={{ width: 'auto', height: '100px' }} />
                  </div>
                  <Form.Control name="photo" type="file" onChange={e => { setData({...data, photo:e.target.files[0]}); setChange(true) }} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="info" type="submit" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
              </Form>
            </Modal>
        </Container>
    )
}

export default A