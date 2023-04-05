//import library or component
import axios from 'axios' //to mannage API
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MySidebar } from '../components/mySidebar'
import { config, baseURL } from '../config';

function DetailBorrow() {
    let { memberID } = useParams();
    const startDate = new Date()
    const endDate = new Date(new Date().setDate(new Date().getDate() + 7))

    //create state newBorrow to collect new data borrow
    let [newBorrow, setNewBorrow] = useState({
        adminID : JSON.parse(localStorage.getItem('admin')).id,
        memberID : memberID,
        dateOfBorrow : startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate(),
        dateOfReturn : endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate(),
    });

    console.log(newBorrow);

    let [detailBorrow, setDetailBorrow] = useState([])

    //manages the side-effects in functional component
    useEffect(() => {
        
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <nav id="sidebar" className="vh-100 col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <MySidebar />
                </nav>
                <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4 content">
                    <h1>Details of Borrow</h1>
                    <div className='row'>
                        <div className='col'>
                            <div className='card border-info'>
                                <div className='card-header text-white bg-info'>
                                    Borrowing Data
                                </div>
                                <div className='card-body'>
                                    <form>
                                        Admin ID
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={newBorrow.adminID}
                                            readOnly />
                                        Member ID
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={newBorrow.memberID}
                                            readOnly />
                                        Date of Borrow
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={newBorrow.dateOfBorrow}
                                            readOnly />
                                        Date of Return
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={newBorrow.dateOfReturn}
                                            readOnly />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col'>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DetailBorrow