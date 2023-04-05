//import library or component
import axios from 'axios' //to mannage API
import { useState } from 'react';
import { MySidebar } from '../components/mySidebar'
import { config, baseURL } from '../config';
import { useNavigate } from 'react-router-dom';

function Borrow() {
    const navigate = useNavigate()
    let [search, setSearch] = useState('')
    let [member, setMember] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post(baseURL + "/member/find",{"keyword" : search}, config)
            setMember(response.data.data)
        } catch (error) {
            console.error(error);
        }
    }

    const handleSelect = async (id) => {
        try{
            const response = await axios.get(baseURL + "/borrow/" + id, config)
            console.log(id)
            console.log(response.data.data)
            if(response.data.data.length !== 0){
                alert("Masih ada buku yang sedang dipinjam, silakan mengembalikan buku sebelum meminjam kembali")
                navigate('history')
            } else{
                alert("Tidak ada buku yang sedang dipinjam, klik untuk melanjutkan")
                navigate('/borrow/' + id)
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    const ListMember = () => {
        return( 
            <table className="table table-responsive table-hover">
                <thead className="table-secondary">
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {member.map((item, index) => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td><button className='btn btn-primary mx-1 text-white' onClick={() => handleSelect(item.id)}>select</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <nav id="sidebar" className="vh-100 col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <MySidebar />
                </nav>
                <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4 content">
                    <h1>Borrow</h1>

                    <form onSubmit={e => handleSearch(e)}>
                        <input type="text" className="form-control mb-3" value={search} onChange={e => setSearch(e.target.value)} placeholder="search member..." />
                    </form>
                    {
                        member !== '' ?
                        <ListMember/>
                        : ''
                    }
                </main>
            </div>
        </div>
    )
}

export default Borrow