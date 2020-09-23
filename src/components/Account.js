import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import { useRecoilState } from 'recoil'
import { isRegisteredState } from '../atoms'

const Account = () => {
    const [isRegistered, setRegister] = useRecoilState(isRegisteredState)
    return (
        <div style={{ justifyContent: 'center', color: 'white', marginTop: '100px', display: 'flex' }}>
            <div>
                {isRegistered === true && (
                    <div><Login /></div>
                )}
                {isRegistered === false && (
                    <div><Register /></div>
                )}
            </div>
        </div >
    )
}



export default Account