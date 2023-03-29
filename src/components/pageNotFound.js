import { Link } from 'react-router-dom';

function PageNotFound() {
    return(
        <div className='container-fluid'>
            <div className='row justify-content-center text-center my-5'>
                <div className='col md-8'>
                <h1>Oops!</h1>
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <Link to="/">Go back to Home</Link>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound