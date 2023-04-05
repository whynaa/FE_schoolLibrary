import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaBook, FaBoxes, FaListAlt } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

export const MySidebar = () => {
    let location = useLocation();
    return(
        <div className="position-sticky">
            <ul className="nav flex-column sticky-top">
            <li className="nav-item">
                <Link className={location.pathname === "/" ? "nav-link active" : "nav-link text-dark"} aria-current="page" to="/">
                    <FaHome /> Dashboard
                </Link>
            </li>
            <li className="nav-item">
                <Link className={location.pathname === "/member" ? "nav-link active" : "nav-link text-dark"} to="/member">
                    <FaUsers /> Member
                </Link>
            </li>
            <li className="nav-item">
                <Link className={location.pathname === "/book" ? "nav-link active" : "nav-link text-dark"} to="/book">
                    <FaBook /> Book
                </Link>
            </li>
            <li className="nav-item">
                <Link className={location.pathname === "/borrow" ? "nav-link active" : "nav-link text-dark"} to="/borrow">
                    <FaBoxes /> Borrow
                </Link>
            </li>
            <li className="nav-item">
                <Link className={location.pathname === "/history" ? "nav-link active" : "nav-link text-dark"} to="/history">
                    <FaListAlt /> History
                </Link>
            </li>
            </ul>
        </div>
    )
}