import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import history from '../history'
import { Alert } from 'react-bootstrap'
import { clearErrors } from '../actions/errorActions'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Login = ({ auth, error, clearErrors, login }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState(null)
    const { errors } = useForm()

    useEffect(() => {
        // Check for login error
        if (error.id === 'LOGIN_FAIL') {
            setMsg(error.msg.error);
            console.log(error.msg.error)
        } else {
            setMsg(null);
        }
        // if (registerState) {
        //     if (isAuthenticated) {
        //         history.push('/login')
        //     }
        // }
    }, [error, auth.isAuthenticated])

    useEffect(() => {
        if (auth.isAuthenticated) {
            clearErrors()
            history.push('/cart')
            if (!auth.user && auth.isAuthenticated) {
                window.location.reload(false)
            }
        }
    }, [auth, clearErrors])


    return (
        <div className="flex justify-center mt-64 text-white">
            <form className='w-4/5'>
                {msg ? (<Alert variant='danger'>{msg}</Alert>) : null}
                <div className="form-group">
                    <label className='text-6xl lg:text-3xl' htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        name='emailRequired'
                        className="form-control h-20 lg:h-10 text-3xl lg:text-xl"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => {
                            console.log(email)
                            setEmail(e.target.value)
                        }}
                    />
                    {errors.emailRequired && 'Email is required!'}
                    <small id="emailHelp" className="form-text text-muted text-3xl lg:text-xl">
                        We'll never share your email with anyone else.
            </small>
                </div>
                <div className="form-group">
                    <label className='text-6xl lg:text-3xl' htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        name='passwordRequired'
                        className="form-control h-20 lg:h-10 text-3xl lg:text-xl"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.passwordRequired && 'Password is required'}
                </div>
                {/* <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Check me out
            </label>
                </div> */}
                <button
                    type="submit"
                    className="btn text-4xl lg:text-xl hover:underline p-3 mt-10 mr-3 text-black"
                    style={{ backgroundColor: '#ff9500' }}
                    onClick={(e) => {
                        e.preventDefault()
                        login({ email, password })
                        if (msg === '') {
                            history.push('/cart')
                        }
                    }}
                >
                    Submit
          </button>
                <button type="submit" className="btn btn-secondary text-4xl lg:text-xl p-3 mt-10 text-black">
                    <Link to='/register' className='hover:text-white'>
                        Register
                    </Link>
                </button>
            </form >
        </div >
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(Login)