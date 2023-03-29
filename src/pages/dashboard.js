import { useState, useEffect } from 'react';
import { getAdmin } from '../API/apiAdmin'
import { getMember } from '../API/apiMembers'
import { getBook } from '../API/apiBooks'
import { getBorrow } from '../API/apiBorrows'
import { Card } from '../components/card'
import { MySidebar } from '../components/mySidebar'

function Dashboard() {
    const [admins, setAdmins] = useState(0);
    const [members, setMembers] = useState(0);
    const [books, setBooks] = useState(0);
    const [borrows, setBorrows] = useState(0);

    useEffect(() => {
        fetchAdmin()
        fetchMember()
        fetchBook()
        fetchBorrow()
    }, []);

    const fetchAdmin = async () => {
        const data = await getAdmin();
        setAdmins(data.length);
    };
        
    const fetchMember = async () => {
        const data = await getMember();
        setMembers(data.length);
    };
        
    const fetchBook = async () => {
        const data = await getBook();
        setBooks(data.length);
    };
        
    const fetchBorrow = async () => {
        const data = await getBorrow();
        setBorrows(data.length);
    };

    return(
        <>
        <div className="container-fluid">
            <div className="row">
                <nav id="sidebar" className="vh-100 col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <MySidebar />
                </nav>
                <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4 content">
                    <h1>Dashboard</h1>
                    <div className="row my-4">
                        <Card title={"Admin"} count={admins} colour={"info"} />
                        <Card title={"Member"} count={members} colour={"success"} />
                        <Card title={"Book"} count={books} colour={"warning"} />
                        <Card title={"Borrow"} count={borrows} colour={"danger"} />
                    </div>
                </main>
            </div>
        </div>
        </>
    ) 
}

export default Dashboard