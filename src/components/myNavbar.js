import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function MyNavbar() {
    const [user, setUser] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        //if user is not logged in, redirect to the login page
        if (!localStorage.getItem('logged')){
            navigate('login')
        }
        else{
            setUser(JSON.parse(localStorage.getItem('admin')).name)
        }
    }, [navigate])
    
    const handleLogout = () => {
        //delete data from localStorage
        localStorage.removeItem('logged')
        localStorage.removeItem('admin')
        localStorage.removeItem('token')
        //redirect to the login page
        (navigate('login'))
    }

    return(
        <>
        <nav className="navbar navbar-light bg-light p-3">
            <div className="d-flex col-12 col-md-3 col-lg-2 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between">
                <Link className="navbar-brand" to="/">School Library</Link>
                <button className="navbar-toggler d-md-none collapsed mb-3" type="button" data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="col-12 col-md-5 col-lg-8 d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
                <div className="dropdown">
                    <button className="btn btn-primary text-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                        Hello, {user}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><Link className="dropdown-item" onClick={handleLogout}>Logout</Link></li>
                        <li><Link className="dropdown-item" to="/profil">Profil</Link></li>
                    </ul>
                    </div>
            </div>
        </nav>
        </>
    )
}

export default MyNavbar