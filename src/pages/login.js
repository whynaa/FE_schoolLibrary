import { useState } from 'react' //untuk membuat state
import { useNavigate } from 'react-router-dom'; //untuk meredirect halaman
import axios from 'axios'; //untuk mengakses API

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data=
        {
            username: username,
            password: password
        }
        axios.post('http://localhost:8000/auth', data)
        .then(response => {
            if (response.data.logged) {
                alert("Login Success")
                // jika berhasil login, simpan data login ke localStorage
                localStorage.setItem('logged', response.data.logged);
                localStorage.setItem('admin', JSON.stringify(response.data.data));
                localStorage.setItem('token', response.data.token);
                // dilanjutkan navigasi ke halaman dashboard
                history('/dashboard');
            }else{
                alert("Login Failed, Please check your username dan password")
            }
            
        })
        .catch(error => {
            console.log(error);
        })
      };

    return (
        <>
        <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className='container'>
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="border border-3 border-primary"></div>
                    <div className="card bg-white shadow-lg">
                    <div className="card-body p-5">
                        <form onSubmit={handleSubmit} className="mb-3 mt-md-4">
                        <h2 className="fw-bold mb-2 text-uppercase ">School Library</h2>
                        <p className=" mb-5">Please enter your username and password!</p>
                        <div className="mb-3">
                            <label for="username" className="form-label">Username</label>
                            <input type="text" className="form-control" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label for="password" className="form-label ">Password</label>
                            <input type="password" className="form-control" name="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-outline-primary" type="submit">Login</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Login