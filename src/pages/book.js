//import library or component
import axios from 'axios' //to mannage API
import { useState, useEffect } from 'react';
import { MySidebar } from '../components/mySidebar'
import { Modal } from "bootstrap"
import { config, baseURL, coverURL } from '../config';

//functional component (Hooks)
function Book() {
    //create state book to collect data book from API
    let [books, setBooks] = useState([]);

    //create state newBook to collect new data book
    let [newBook, setNewBook] = useState([{
        id : '',
        isbn : '',
        title : '',
        author : '',
        publisher : '',
        category : '',
        stock : 0,
        cover : null
    }]);

    let [search, setSearch] = useState('') // collect search data
    let [modal, setModal] = useState(null) // mannage modal to show
    let [change, setChange] = useState(false) // mannage cover to show
    let [action, setAction] = useState(''); // mannage action to save

    //manages the side-effects in functional component
    useEffect(() => {
        let modal = new Modal(
            document.getElementById("bookModal")
        )
        setModal(modal) // choose modal to show

        fetchBook()
    }, [])

    const fetchBook = async () => {
        // get data from API using AXIOS
        try{
            const response = await axios.get(baseURL + "/book", config)
            setBooks(response.data.data)
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleSearch = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post(baseURL + "/book/find",{"keyword" : search}, config)
            setBooks(response.data.data)
        } catch (error) {
            console.error(error);
        }
    }

    const handleAdd = () => {
        setAction('add') // save new book      
        modal.show() // display modal

        //empty form
        setNewBook({
            id : '',
            isbn : '',
            title : '',
            author : '',
            publisher : '',
            category : '',
            stock : 0,
            cover : null
        })
    }

    const handleEdit = (item) => {
        setAction('edit') // update old book
        modal.show() // display modal

        //fill form with previous data based on clicked item
        setNewBook({
            id : item.id,
            isbn : item.isbn,
            title : item.title,
            author : item.author,
            publisher : item.publisher,
            category : item.category,
            stock : item.stock,
            cover : item.cover
        })
    }
    
    const handleDelete = async (id) => {
        alert("Are you sure delete this data?")
        
        // delete data from API using AXIOS
        try{
            const response = await axios.delete(baseURL + "/book/" + id, config)
            alert(response.data.message)
        } catch (error) {
            console.error(error);
        }
        // refresh book data
        fetchBook()
    }

    const handleSave = async (e) => {
        e.preventDefault() // prevent refresh page after sending form data
        modal.hide() // close modal
        setChange(false) // clear previous update cover status

        //prepare data to save
        let data = new FormData()
        data.append("isbn", newBook.isbn)
        data.append("title", newBook.title)
        data.append("author", newBook.author)
        data.append("publisher", newBook.publisher)
        data.append("category", newBook.category)
        data.append("stock", newBook.stock)
        data.append("cover", newBook.cover)

        if (action === "add"){
            // save new data to API using AXIOS
            try{
                const response = await axios.post(baseURL + "/book", data, config)
                alert(response.data.message)
            } catch (error) {
                console.error(error);
            }
        }
        if (action === "edit"){
            // update data to API using AXIOS
            try{
                const response = await axios.put(baseURL + "/book/" + newBook.id, data, config)
                alert(response.data.message)
            } catch (error) {
                console.error(error);
            }
        }
        // refresh book data
        fetchBook()
    }

    const handleClose = () => {
        setChange(false) // clear previous update cover status
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
                    <h1>Book List</h1>

                    <div className='d-flex justify-content-between align-items-center'>
                        {/* button add */}
                        <button className='btn btn-success mb-2' onClick={() => handleAdd()}>Add Book</button>
                        {/* search form*/}
                        <form onSubmit={e => handleSearch(e)}>
                            <input type="text" className="form-control mb-3" value={search} onChange={e => setSearch(e.target.value)} placeholder="search..." />
                        </form>
                    </div>

                    {/* table */}
                    <table className="table table-responsive table-hover">
                        <thead className="table-secondary">
                            <tr>
                            <th scope="col">No</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Publisher</th>
                            <th scope="col">Category</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Cover</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((item, index) => (
                                <tr key={item.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.isbn}</td>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{item.publisher}</td>
                                    <td>{item.category}</td>
                                    <td>{item.stock}</td>
                                    <td><img src={coverURL+item.cover} height='50px' alt={item.cover} /></td>
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

            {/* create modal form to add or edit book data */}
            <div className="modal" id="bookModal">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header bg-primary">
                            <h4 className="text-white">Form Book</h4>
                            <button type="button" className="btn-close bg-light" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={e => handleSave(e)}>
                                ISBN
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    onChange={e => setNewBook({...newBook, isbn:e.target.value})}
                                    value={newBook.isbn}
                                    required />

                                Title
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    onChange={e => setNewBook({...newBook, title:e.target.value})}
                                    value={newBook.title}
                                    required />
                                
                                Author
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    onChange={e => setNewBook({...newBook, author:e.target.value})}
                                    value={newBook.author}
                                    required />
                                    
                                Publisher
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    onChange={e => setNewBook({...newBook, publisher:e.target.value})}
                                    value={newBook.publisher}
                                    required />

                                Category
                                <select
                                    className="form-control mb-2"
                                    value={newBook.category}
                                    onChange={e => setNewBook({...newBook, category:e.target.value})}
                                    required>
                                    <option value=''>{newBook.category !== '' ? newBook.category : "~~Choose Category~~"}</option>
                                    <option value="Novel">Novel</option>
                                    <option value="Komik">Komik</option>
                                    <option value="Study">Study</option>
                                </select>

                                Stock
                                <input
                                    type="number"
                                    className="form-control mb-2"
                                    onChange={e => setNewBook({...newBook, stock:e.target.value})}
                                    value={newBook.stock}
                                    required />

                                Cover <br/>
                                <img src={newBook.cover !== null ? change ? URL.createObjectURL(newBook.cover) : coverURL+newBook.cover : null} height='50px' alt={newBook.cover} />
                                
                                <input
                                    type="file"
                                    className="form-control mb-2"
                                    onChange={e => {setNewBook({...newBook, cover:e.target.files[0]}); setChange(true)}}
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

export default Book