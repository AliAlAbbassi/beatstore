import React, { useState, useEffect } from 'react'
import { cartBeatState } from '../atoms'
import { useRecoilState } from 'recoil'
import '../styles/cart.css'
import { connect } from 'react-redux'
import CartBeat from '../components/CartBeat'
import { updateCart } from '../actions/authActions'
import { Link } from 'react-router-dom'
import { logout } from '../actions/authActions';
import '../styles/checkbox.scss'
import { Coupons } from '../Coupons'
import { uniqBy } from 'lodash'
import store from '../store'
import _ from 'lodash'
import Footer from '../components/Footer'

const Cart = ({ auth, logout }) => {
    const [cart, setCart] = useRecoilState(cartBeatState)
    const [gross, setGross] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [total, setTotal] = useState(0)
    const [checked, setCheckState] = useState(false)
    const [Coupon, setCoupon] = useState('')


    useEffect(() => {
        if (auth.user) {
            setCart(auth.user.data.cart)
        }
        if (!auth.isAuthenticated) {
            if (localStorage.getItem('cart')) {
                setCart(JSON.parse(localStorage.getItem('cart')))
            } else {
                localStorage.setItem('cart', JSON.stringify(cart))
            }
        }
    }, [auth])

    const handleCouponEntry = (e) => {
        if (e.key === 'Enter') {
            Coupons.map(Copon => {
                if (Copon === Coupon) {
                    setDiscount(gross * 0.2)
                }
                return null
            })
            setCoupon('')
            setCheckState(!checked)
        }
    }



    useEffect(() => {
        if (cart) {
            let valueArr = cart.map((item) => {
                return item.name
            })
            let isDupe = valueArr.some((item, i) => {
                return valueArr.indexOf(item) !== i
            })
            if (isDupe.length > 0) {
                setCart(_.uniqBy(cart, 'id'))
            }
        }

    }, [cart, setCart])

    useEffect(() => {
        if (auth.user) {
            if (localStorage.getItem('cart')) {
                let newCart = []
                newCart = [...JSON.parse(localStorage.getItem('cart'))]
                newCart = [...newCart, ...auth.user.data.cart]
                setCart(_.uniqBy(newCart, 'id'))
                store.dispatch(updateCart(uniqBy(newCart, 'id')))
            } else {
                setCart(auth.user.data.cart)
            }
            console.log(cart)
            if (cart.length > 0) {
                console.log(cart)
                let total = 0
                cart.map(beat => {
                    if (beat.plan === 'BASIC') {
                        total += 19.99
                    } else if (beat.plan === 'PREMIUM') {
                        total += 29.99
                    } else if (beat.plan === 'TRACKOUT') {
                        total += 75
                    } else if (beat.plan === 'UNLIMITED') {
                        total += 99.99
                    }
                    return null
                })
                setGross(Math.round(total))
            }
            setTotal(Math.round(gross - discount))
        }
        if (!auth.isAuthenticated) {
            if (cart) {
                let total = 0
                cart.map(beat => {
                    if (beat.plan === 'BASIC') {
                        total += 19.99
                    } else if (beat.plan === 'PREMIUM') {
                        total += 29.99
                    } else if (beat.plan === 'TRACKOUT') {
                        total += 75
                    } else if (beat.plan === 'UNLIMITED') {
                        total += 99.99
                    }
                    return null
                })
                setGross(Math.round(total))
            }
            setTotal(Math.round(gross - discount))
        }
    }, [auth, cart])

    useEffect(() => {
        if (cart.length > 0) {
            console.log(cart)
            let total = 0
            cart.map(beat => {
                if (beat.plan === 'BASIC') {
                    total += 19.99
                } else if (beat.plan === 'PREMIUM') {
                    total += 29.99
                } else if (beat.plan === 'TRACKOUT') {
                    total += 75
                } else if (beat.plan === 'UNLIMITED') {
                    total += 99.99
                }
                return null
            })
            setGross(Math.round(total))
        }
        setTotal(Math.round(gross - discount))
    }, [cart])

    useEffect(() => {
        if (!cart) {
            setCart([])
        }
    })


    return (
        <div>
            <div>
                <div>
                    {auth.isAuthenticated && (
                        <div className='cartContainer'>
                            {cart.length > 0 && (
                                <div>
                                    <h1 className='text-6xl lg:text-4xl text-left'>Cart Review</h1>
                                    <div className='flex mt-10'>
                                        <p className='productStyle'>PRODUCT</p>
                                        <p className='priceStyle'>PRICE</p>
                                    </div>
                                    <div className='lg:grid lg:grid-cols-2 lg:justify-center'>
                                        <div>
                                            {cart.map(beat => <CartBeat key={beat.id} beat={beat} />)}
                                        </div>
                                        <div className='payBitch'>
                                            <div className='border text-white lg:mt-5 rounded-lg'>
                                                <div className='flex ml-4'>
                                                    <div className="grid">
                                                        <label className="checkbox path mt-4 lg:mt-0">
                                                            <input type="checkbox" onClick={(e) => setCheckState(!checked)} />
                                                            <svg className='' viewBox="0 0 20 20">
                                                                <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186" />
                                                            </svg>
                                                        </label>
                                                    </div>
                                                    <p className='couponCodeTextAuth'>I have a Coupon Code</p>
                                                </div>
                                                {checked && (
                                                    <input value={Coupon} onKeyPress={handleCouponEntry} onChange={(e) => setCoupon(e.target.value)} placeholder='Got a Coupon Code?' className='appearance-none block ml-4 lg:h-12 h-20 w-50 text-4xl lg:text-xl bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type=' text' />
                                                )}
                                                <div className='flex justify-between ml-4 mr-4'>
                                                    <p className='text-5xl lg:text-xl'>Gross</p>
                                                    <p className='text-5xl lg:text-xl'>${gross}</p>
                                                </div>
                                                <div className='flex justify-between ml-4 mr-4'>
                                                    <p className='text-5xl lg:text-xl'>Discount</p>
                                                    <p className='text-5xl lg:text-xl'>-${discount}</p>
                                                </div>
                                                <div className='flex justify-between ml-4 mr-4 text-2xl mt-4 border-t-2'>
                                                    <p className='text-6xl lg:text-2xl'>Total</p>
                                                    <p className='text-6xl lg:text-2xl'>${total}</p>
                                                </div>
                                                {auth && (
                                                    <p className='lg:text-sm text-3xl text-center mt-2'>Your are checking out as @{auth.user.data.name}. Not you? <p className='text-left text-sm leading-5 underline text-white hover:text-white' onClick={logout}>Sign Out</p></p>
                                                )}
                                                <div className='grid justify-center'>
                                                    <button className='payButton text-3xl lg:text-xl hover:text-black'>PAY VIA CREDIT CARD</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {cart.length === 0 && (
                                <div>
                                    <p className='text-white mt-16 text-center lg:text-4xl text-6xl'>Cart is Empty</p>
                                    <Link to='/' className='text-white text-center mt-1'><p className='lg:text-lg text-5xl'>Go Back</p></Link>
                                </div>)}
                        </div>
                    )}
                    {!auth.isAuthenticated && (
                        <div className='cartContainer'>
                            {cart.length > 0 && (
                                <div className='w-screen grid justify-center'>
                                    <h1 className='text-6xl lg:text-4xl text-left'>Cart Review</h1>
                                    <div className='flex mt-10'>
                                        <p className='productStyle'>PRODUCT</p>
                                        <p className='priceStyle'>PRICE</p>
                                    </div>
                                    <div className='lg:grid lg:grid-cols-2 lg:justify-center'>
                                        <div>
                                            {cart.map(beat => <CartBeat key={beat.name} beat={beat} />)}
                                        </div>
                                        <div className='payBitch'>
                                            <div className='border-2 lg:border text-white lg:mt-5 rounded-lg'>
                                                <div className='flex ml-4 mt-3'>
                                                    <div className="grid">
                                                        <label className="checkbox path checkboxStyle">
                                                            <input type="checkbox" className='mt-1 lg:mt-0' onClick={(e) => setCheckState(!checked)} />
                                                            <svg viewBox="0 0 21 21">
                                                                <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186" />
                                                            </svg>
                                                        </label>
                                                    </div>
                                                    <p className='lg:ml-2 lg:mb-3 lg:text-lg text-4xl'>I have a Coupon Code</p>
                                                </div>
                                                {checked && (
                                                    <input value={Coupon} onKeyPress={handleCouponEntry} onChange={(e) => setCoupon(e.target.value)} placeholder='Got a Coupon Code?' className='appearance-none block ml-4 h-10 w-50 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type=' text' />
                                                )}
                                                <div className='flex justify-between ml-4 mr-4'>
                                                    <p className='text-4xl lg:text-2xl'>Gross</p>
                                                    <p className='text-4xl lg:text-2xl'>${gross}</p>
                                                </div>
                                                <div className='flex justify-between ml-4 mr-4'>
                                                    <p className='text-4xl lg:text-2xl'>Discount</p>
                                                    <p className='text-4xl lg:text-2xl'>-${discount}</p>
                                                </div>
                                                <div className='flex justify-between ml-4 mr-4 text-2xl mt-5 border-t-2'>
                                                    <p className='text-5xl lg:text-3xl'>Total</p>
                                                    <p className='text-5xl lg:text-3xl'>${total}</p>
                                                </div>
                                                <div className='grid justify-center'>
                                                    <Link to='/login'>
                                                        <button className='payButton'>
                                                            <p className='text-center text-4xl lg:text-xl' style={{ marginTop: '-3px' }}>
                                                                SIGN IN
</p>
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {cart.length === 0 && (
                                <div>
                                    <p className='text-white mt-16 text-center lg:text-4xl text-6xl'>Cart is Empty</p>
                                    <Link to='/' className='text-white text-center mt-1'><p className='lg:text-lg text-5xl'>Go Back</p></Link>
                                </div>)}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div >
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Cart)