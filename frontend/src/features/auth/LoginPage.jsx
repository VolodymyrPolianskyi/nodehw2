import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getToken, loginUser } from "./authSlice";

export default function LoginPage(){
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getToken())
    },[dispatch])

    const token = useSelector(state => state.auth.token)
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(loginUser({ email: formData.email, password: formData.password }));
        navigate('/')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    }

    if(token)return<div className="main"><h1>You are already logged in</h1><Link to="/">Back</Link> </div>

    return(
        <div className="main">
            <form onSubmit={handleSubmit} className='form'>
                <div className='auth-label'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='auth-label'>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='options'>
                    <button type="submit" className='link'>Log In</button>
                    <div className="another-value">
                        <p>Dont have account? - </p>
                        <Link to={'/register'}>Sign up</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}