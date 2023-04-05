//import library or component
import axios from 'axios' //to mannage API
import { useState, useEffect } from 'react';
import { MySidebar } from '../components/mySidebar'
import { Modal } from "bootstrap"
import { config, baseURL, photoURL } from '../config';

//functional component (Hooks)
function Member() {
    //create state member to collect data member from API
    let [members, setMembers] = useState([]);

    //create state newMember to collect new data member
    let [newMember, setNewMember] = useState([{
        id : '',
        name : '',
        gender : '',
        contact : '',
        address : '',
        photo : null
    }]);

    let [modal, setModal] = useState(null) // mannage modal to show
    let [change, setChange] = useState(false) // mannage photo to show
    let [action, setAction] = useState(''); // mannage action to save

    //manages the side-effects in functional component
    useEffect(() => {
        let modal = new Modal(
            document.getElementById("memberModal")
        )
        setModal(modal) // choose modal to show

        fetchMember()
    }, [])

    const fetchMember = async () => {
        // get data from API using AXIOS
        try{
            const response = await axios.get(baseURL + "/member", config)
            setMembers(response.data.data)
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleAdd = () => {
        setAction('add') // save new member      
        modal.show() // display modal

        //empty form
        setNewMember({
            id : '',
            name : '',
            gender : '',
            contact : '',
            address : '',
            photo : null
        })
    }

    const handleEdit = (item) => {
        setAction('edit') // update old member
        modal.show() // display modal

        //fill form with previous data based on clicked item
        setNewMember({
            id : item.id,
            name : item.name,
            gender : item.gender,
            contact : item.contact,
            address : item.address,
            photo : item.photo
        })
    }
    
    const handleDelete = async (id) => {
        alert("Are you sure delete this data?")
        
        // delete data from API using AXIOS
        try{
            const response = await axios.delete(baseURL + "/member/" + id, config)
            alert(response.data.message)
        } catch (error) {
            console.error(error);
        }
        // refresh member data
        fetchMember()
    }

    const handleSave = async (e) => {
        e.preventDefault() // prevent refresh page after sending form data
        modal.hide() // close modal
        setChange(false) // clear previous update photo status

        //prepare data to save
        let data = new FormData()
        data.append("name", newMember.name)
        data.append("gender", newMember.gender)
        data.append("contact", newMember.contact)
        data.append("address", newMember.address)
        data.append("photo", newMember.photo)

        if (action === "add"){
            // save new data to API using AXIOS
            try{
                const response = await axios.post(baseURL + "/member", data, config)
                alert(response.data.message)
            } catch (error) {
                console.error(error);
            }
        }
        if (action === "edit"){
            // update data to API using AXIOS
            try{
                const response = await axios.put(baseURL + "/member/" + newMember.id, data, config)
                alert(response.data.message)
            } catch (error) {
                console.error(error);
            }
        }
        // refresh member data
        fetchMember()
    }

    const handleClose = () => {
        setChange(false) // clear previous update photo status
        modal.hide() // close modal
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {/* sidebar */}
                <nav id="sidebar" className="vh-100 col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <MySidebar />
                </nav>

                {/* content */}
                <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4 content">
                    {/* title */}
                    <h1>Member List</h1>

                    {/* button add */}
                    <button className='btn btn-success mb-2' onClick={() => handleAdd()}>Add Member</button>

                    {/* table */}
                    <table className="table table-hover">
                        <thead className="table-secondary">
                            <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Address</th>
                            <th scope="col">Photo</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((item, index) => (
                                <tr key={item.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.contact}</td>
                                    <td>{item.address}</td>
                                    <td><img src={photoURL+item.photo} height='50px' alt={item.photo} /></td>
                                    <td>
                                        {/* button edit */}
                                        <button className='btn btn-primary mx-1 text-white' onClick={() => handleEdit(item)}>edit</button>
                                        {/* button delete */}
                                        <button className='btn btn-danger mx-1 text-white' onClick={() => handleDelete(item.id)}>delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>

            {/* create modal form to add or edit member data */}
            <div className="modal" id="memberModal">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h4 className="text-white">Form Member</h4>
                            <button type="button" className="btn-close bg-light" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={e => handleSave(e)}>
                                Name
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    onChange={e => setNewMember({...newMember, name:e.target.value})}
                                    value={newMember.name}
                                    required />
                                
                                Gender
                                <select
                                    className="form-control mb-2"
                                    value={newMember.gender}
                                    onChange={e => setNewMember({...newMember, gender:e.target.value})}
                                    required>
                                    <option value="">{newMember.gender !== '' ? newMember.gender : "~~Choose Gender~~"}</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>

                                Contact
                                <input
                                    type="number"
                                    className="form-control mb-2"
                                    onChange={e => setNewMember({...newMember, contact:e.target.value})}
                                    value={newMember.contact}
                                    required />
                                
                                Address
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    onChange={e => setNewMember({...newMember, address:e.target.value})}
                                    value={newMember.address}
                                    required />

                                Photo <br/>
                                <img src={newMember.photo !== null ? change ? URL.createObjectURL(newMember.photo) : photoURL+newMember.photo : null} height='50px' alt={newMember.photo} />
                                
                                <input
                                    type="file"
                                    className="form-control mb-2"
                                    onChange={e => {setNewMember({...newMember, photo:e.target.files[0]}); setChange(true)}}
                                    />
                                <button className="btn btn-success" type="submit">Save</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Member