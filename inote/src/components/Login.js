import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:'',password:''});

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        });
        const json = await response.json();
        
        if(json.success){
            //save authtoken and redirect
            localStorage.setItem('token',json.authToken);
            
            props.showAlert('Logged in successfully','success')
            navigate('/');

        }
        else{
            props.showAlert('Invalid credentials','danger')
        }
    }

    return (
        <div>
            <h2 className='my-4'>Login to continue to iNote</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} name='email' id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
