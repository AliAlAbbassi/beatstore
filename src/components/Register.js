import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { register } from '../actions/authActions'
import history from '../history'
import { Alert } from 'react-bootstrap'
import { clearErrors } from '../actions/errorActions'

const Register = ({ isAuthenticated, error, register }) => {
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
    }, [error, isAuthenticated])

    useEffect(() => {
        clearErrors()
    })

    return (
        <div style={{ justifyContent: 'center', color: 'white', marginTop: '100px', display: 'flex' }}>
            <form>
                {msg ? (<Alert variant='danger'>{msg}</Alert>) : null}
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input
                        type="name"
                        className="form-control"
                        id="inputName"
                        aria-describedby="nameHelp"
                        value={nameState}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={emailState}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={passwordState}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Check me out
</label>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
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
                    className="btn btn-primary"
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
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(Register)