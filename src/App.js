import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import Profil from "./pages/profil"
import Member from "./pages/member"
import Book from "./pages/book"
import Borrow from "./pages/borrow"
import DetailBorrow from "./pages/detailBorrow";
import History from "./pages/history"
import MyNavbar from './components/myNavbar'
import PageNotFound from './components/pageNotFound';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '*' && <MyNavbar />}
      <Routes>
        <Route path="login" element={ <Login />} />
        <Route path="/" element={ <Dashboard /> } />
        <Route path="profil" element={ <Profil /> } />
        <Route path="member" element={ <Member /> } />
        <Route path="book" element={ <Book /> } />
        <Route path="borrow" element={ <Borrow /> } />
        <Route path="borrow/:memberID" element={ <DetailBorrow /> } />
        <Route path="history" element={ <History /> } />
        <Route path="*" element={ <PageNotFound />} />
      </Routes>
    </>
  )
}

export default App