import { useState, useEffect } from 'react';
import { getAllMembers, addMember } from '../API/apiMembers'
import { Container, Table, Button, Modal, Image, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from "react-icons/fa";

function B() {
    const [members, setMembers] = useState([]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [photo, setPhoto] = useState(null);
    const [action, setAction] = useState('');
    const url = "http://localhost:8000/image/photo/"

    useEffect(() => {
      fetchMember()
    }, []);

    const fetchMember = async () => {
        const data = await getAllMembers();
        setMembers(data);
      };
    
    const addMember = () => {
      setShow(true)
      setAction('add')
      setId('')
      setName('')
      setGender('')
      setContact('')
      setAddress('')
      setPhoto(null)
    }

    const editMember = (item) => {
      setShow(true)
      setAction('edit')
      setId(item.id)
      setName(item.name)
      setGender(item.gender)
      setContact(item.contact)
      setAddress(item.address)
      setPhoto(item.photo)
    }

    const deleteMember = (id) => {
      alert("Are you sure delete this data?")
    }

    const handleClose = () => {
      setShow(false)
    }

    const handleSave = async (e) => {
      e.preventDefault()
      let form = new FormData()
      form.append("id", {id})
      form.append("name", {name})
      form.append("gender", {gender})
      form.append("contact", {contact})
      form.append("address", {address})
      form.append("photo", {photo})
      
      if ({action} === "add") {
        const add = await addMember()
      }


    }

    return (
        <Container className="mt-3">
            <h1 className="text-bold text-info">Member</h1>
            <Button variant="success" size="md" className="m-2" onClick={addMember}>Add Member</Button>
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
                      <Button variant="primary" size="sm" className="m-2" onClick={() => editMember(item)}><FaEdit /></Button>
                      <Button variant="danger" size="sm" className="m-2" onClick={() => deleteMember(item.id)}><FaTrash /></Button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Form Member</Modal.Title>
              </Modal.Header>
              <Form onSubmit={e => this.handleSave(e)}>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select name="gender" value={gender} onChange={e => setGender(e.target.value)}>
                    <option value="P">Perempuan</option>
                    <option value="L">Laki-Laki</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="contact">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control name="contact" type="text" placeholder="Enter Contact" value={contact} onChange={e => setContact(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control name="address" type="text" placeholder="Enter Address" value={address} onChange={e => setAddress(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="photo">
                  <Form.Label>Photo</Form.Label>
                  <div>
                    <Image rounded src={url + photo} value={photo} style={{ width: 'auto', height: '100px' }} />
                  </div>
                  <Form.Control name="photo" type="file" onChange={e => setPhoto(e.target.files[0])} />
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

export default B