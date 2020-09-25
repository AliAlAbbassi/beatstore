import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { register } from '../actions/authActions'
import history from '../history'
import { Alert } from 'react-bootstrap'
import { clearErrors } from '../actions/errorActions'

const Register = ({ isAuthenticated, error, register, auth }) => {
    const [nameState, setName] = useState('')
    const [emailState, setEmail] = useState('')
    const [passwordState, setPassword] = useState('')
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        // Check for register error
        if (error.id === 'REGISTER_FAIL') {
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
        clearErrors()
    })

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
        <div className='text-white ml-auto mr-auto mt-64 lg:mt-32 w-3/4 lg:w-1/3'>
            <form>
                {msg ? (<Alert variant='danger'>{msg}</Alert>) : null}
                <div className="form-group">
                    <label className='text-5xl lg:text-xl' htmlFor="exampleInputEmail1">Name</label>
                    <input
                        type="name"
                        className="form-control pt-10 pb-10 lg:pt-0 lg:pb-0 w-full text-4xl lg:text-xl"
                        id="inputName"
                        aria-describedby="nameHelp"
                        value={nameState}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className='text-5xl lg:text-xl' htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control pt-10 pb-10 text-4xl lg:text-xl lg:pb-0 lg:pt-0"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={emailState}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <small id="emailHelp" className="form-text text-muted text-3xl lg:text-lg">
                        We'll never share your email with anyone else.
</small>
                </div>
                <div className="form-group">
                    <label className='text-5xl lg:text-xl' htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control pb-10 pt-10 text-4xl lg:text-xl lg:pb-0 lg:pt-0"
                        id="exampleInputPassword1"
                        value={passwordState}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {/* <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Check me out
</label>
                </div> */}
                <button
                    type="submit"
                    className="btn btn-primary mr-2 text-4xl lg:text-xl"
                    onClick={(e) => {
                        register({
                            name: nameState,
                            email: emailState,
                            password: passwordState
                        })
                        history.push('/login')
                    }}>
                    Submit
</button>
                <button
                    type="submit"
                    className="btn btn-primary ml-2 text-4xl lg:text-xl"
                    onClick={() => {
                        history.push('/login')
                    }}>
                    Already have an account?
</button>
            </form>

        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(Register)