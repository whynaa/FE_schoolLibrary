import { MySidebar } from '../components/mySidebar'

function History() {
    return (
        <div className="container-fluid">
            <div className="row">
                <nav id="sidebar" className="vh-100 col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <MySidebar />
                </nav>
                <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4 content">
                    <h1>History</h1>
                </main>
            </div>
        </div>
    )
}

export default History