import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { connect } from 'react-redux'
import Transition from './Transition'
import CartModel from './CartModel'
import { useRecoilState } from 'recoil'
import { isCartModelOpen, cartBeatState } from '../atoms'

const NavBar = ({ auth }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCart, setIsOpenCart] = useRecoilState(isCartModelOpen)
    const [cart] = useRecoilState(cartBeatState)
    const [navStyle, setNavStyle] = useState('mt-5 text-2xl ml-4')
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        if (isMenuOpen) {
            setNavStyle('mt-5 text-2xl ml-4 lg:hidden')
        } else {
            setNavStyle('mt-5 text-2xl ml-4 hidden')
        }
    }, [isMenuOpen])

    return (
        <div>
            <nav style={{ backgroundColor: 'rgb(53, 47, 53)' }} className="navBAR">
                <div className="flex flex-no-shrink items-stretch h-0 justify-between">
                    <div
                        className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark text-2xl hover:no-underline">
                        <Link to='/' className='text-white no-underline hover:no-underline'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={500} height={200} viewBox="0 0 500 200">
                                <defs>
                                    <style dangerouslySetInnerHTML={{ __html: "\n      .cls-1 {\n        font-size: 20px;\n        fill: #fff;\n        font-family: Bugfast;\n      }\n    " }} />
                                </defs>
                                <text id="CUTHLEHOOP" className="cls-1" transform="translate(0 122.661) scale(1.346)">CUTHLEHOOP</text>
                            </svg>
                        </Link>
                    </div>
                    <div className="flex lg:hidden cursor-pointer relative lg:w-12 lg:h-12 w-20 h-20 p-4 mr-10" style={{ marginTop: '-20px' }}>
                        {cart && (
                            <div >
                                {cart.length === 0 && (
                                    <div>
                                        <svg className='addToCart' onClick={() => setIsOpenCart(!isOpenCart)} xmlns="http://www.w3.org/2000/svg" width="432" height="512" viewBox="0 0 432 512">
                                            <g id="add-to-cart-white" transform="translate(-40)">
                                                <path id="Path_1" data-name="Path 1" d="M472,452a20,20,0,0,1-20,20H432v20a20,20,0,0,1-40,0V472H372a20,20,0,0,1,0-40h20V412a20,20,0,0,1,40,0v20h20A20,20,0,0,1,472,452Zm0-312V332a20,20,0,0,1-40,0V160H392v60a20,20,0,0,1-40,0V160H160v60a20,20,0,0,1-40,0V160H80V472H292a20,20,0,0,1,0,40H60a20,20,0,0,1-20-20V140a20,20,0,0,1,20-20h60.946C128.891,52.523,186.423,0,256,0S383.109,52.523,391.054,120H452A20,20,0,0,1,472,140ZM350.659,120a96,96,0,0,0-189.318,0Z" fill="#fff" />
                                            </g>
                                        </svg>
                                    </div>
                                )}
                                {cart.length > 0 && (
                                    <div>
                                        <svg className='addToCart' onClick={() => setIsOpenCart(!isOpenCart)} xmlns="http://www.w3.org/2000/svg" width="432" height="512" viewBox="0 0 432 512">
                                            <g id="add-to-cart-white" transform="translate(-40)">
                                                <path id="Path_1" data-name="Path 1" d="M472,452a20,20,0,0,1-20,20H432v20a20,20,0,0,1-40,0V472H372a20,20,0,0,1,0-40h20V412a20,20,0,0,1,40,0v20h20A20,20,0,0,1,472,452Zm0-312V332a20,20,0,0,1-40,0V160H392v60a20,20,0,0,1-40,0V160H160v60a20,20,0,0,1-40,0V160H80V472H292a20,20,0,0,1,0,40H60a20,20,0,0,1-20-20V140a20,20,0,0,1,20-20h60.946C128.891,52.523,186.423,0,256,0S383.109,52.523,391.054,120H452A20,20,0,0,1,472,140ZM350.659,120a96,96,0,0,0-189.318,0Z" fill="#fff" />
                                            </g>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        )}
                        {!isMenuOpen && (
                            <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <svg viewBox="0 0 20 20" fill="currentColor" className="text-white w-20 h-20 lg:w-64 lg:h-64"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                            </div>
                        )}
                        {isMenuOpen && (
                            <div>
                                <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className='whiteCross' xmlns="http://www.w3.org/2000/svg" width="512.001" height="512" viewBox="0 0 512.001 512">
                                    <g id="white_cross" data-name="white cross" transform="translate(0 -0.001)">
                                        <g id="Group_1" data-name="Group 1">
                                            <path id="Path_1" data-name="Path 1" d="M284.286,256,506.143,34.144A20,20,0,0,0,477.858,5.859L256,227.717,34.143,5.859A20,20,0,0,0,5.858,34.144L227.715,256,5.858,477.859a20,20,0,0,0,28.286,28.285L256,284.287,477.857,506.144a20,20,0,0,0,28.286-28.285Z" fill="#fff" />
                                        </g>
                                    </g>
                                </svg>
                            </div>

                        )}
                        <div className='ml-1 hidden'>
                            <svg className="col-start-2 fill-current text-white w-16 h-16 lg:w-12 lg:h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" /></svg>
                        </div>
                    </div>
                    <Transition
                        show={isOpenCart}
                        enter='transition ease-out duration-100'
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                        className='block lg:hidden'
                    >
                        <div className="block lg:hidden origin-top-right absolute right-0 mr-5 mt-5 rounded-md shadow-lg" id='cartModal'>
                            <div className="rounded-md bg-black bg-opacity-75 shadow-xs mt-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {cart && (
                                        <div className='block px-4 py-2 col-start-2 text-center' role="menuitem" >
                                            {cart.map(beat => <CartModel key={beat.name} beat={beat} />)}
                                            {cart.length > 0 && (
                                                <button className='hover:bg-current mt-3' style={{ width: '400px', height: '90px', backgroundColor: 'rgb(255, 162, 0)', padding: '10px', marginTop: '5px' }}> <Link to='/cart' className='no-underline hover:no-underline text-black hover:text-black text-4xl' onClick={() => setIsOpenCart(false)}>Proceed to checkout</Link></button>
                                            )}
                                            {cart.length === 0 && (
                                                <div className='text-center text-white text-5xl'>Cart is Empty</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>

                <div className={navStyle}>
                    <div className="">
                        <div className="Relative py-2 px-2 leading-normal text-white no-underline hover:bg-grey-dark"><Link to='/beatstore' onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-white no-underline hover:no-underline text-5xl lg:text-xl'>BEATS</Link></div>
                        <div className="Relative py-2 px-2 leading-normal text-white no-underline hover:bg-grey-dark"><Link to='/mybeats' onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-white no-underline hover:no-underline text-5xl lg:text-xl'>PURCHASED BEATS</Link></div>
                        <div className="relative inline-block text-left">
                            <div>
                                <span className="rounded-md">
                                    <button onClick={() => {
                                        setIsMenuOpen(!isMenuOpen)
                                        setIsOpen(!isOpen)
                                    }} type="button" className="relative py-2 px-2 leading-normal text-white no-underline items-center mt-1 transition ease-in-out duration-150" id="options-menu" aria-haspopup="true" aria-expanded="true">
                                        <form>
                                            {auth.isAuthenticated && (
                                                <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="block text-white text-xl" >
                                                    <Logout />
                                                </div>
                                            )}
                                            {!auth.isAuthenticated && (
                                                <Link to='/login' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                                    <p className="block text-white text-5xl lg:text-xl focus:outline-none focus:bg-gray-100 focus:text-gray-900" >SIGN IN</p>
                                                </Link>
                                            )}
                                        </form>
                                    </button>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="hidden lg:block md:flex md:items-stretch md:flex-no-shrink md:flex-grow">
                    <div className="hidden lg:flex md:justify-end ml-auto">
                        <div href="#" className="flex-no-grow flex-no-shrink lg:text-right relative py-2 px-2 mt-1  leading-normal text-white no-underline flex items-center hover:bg-grey-dark"><Link to='/beatstore' className='text-white no-underline hover:no-underline hidden lg:block lg:text-right'>BEATS</Link></div>
                        <div>
                            <div href="#" onClick={() => setIsOpenCart(!isOpenCart)} className="flex-no-grow flex-no-shrink relative flex py-2 px-2 mt-1 leading-normal text-white no-underline items-center hover:bg-grey-dark lg:text-right" id="options-menu" aria-haspopup="true" aria-expanded="true">
                                {cart && (
                                    <div className='hidden lg:block'>
                                        {cart.length > 0 && (
                                            <div>CART({cart.length})</div>
                                        )}
                                        {cart.length === 0 && (
                                            <div>CART</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <Transition
                            show={isOpenCart}
                            enter='transition ease-out duration-100'
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                            className='hidden lg:block'
                        >
                            <div className="hidden lg:block origin-top-right absolute right-0 mt-5 mr-5 w-56 rounded-md shadow-lg" id='cartModal'>
                                <div className="rounded-md bg-black bg-opacity-75 shadow-xs">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        {cart && (
                                            <div className='block px-4 py-2 col-start-2 text-center' role="menuitem" >
                                                {cart.map(beat => <CartModel key={beat.name} beat={beat} />)}
                                                {cart.length > 0 && (
                                                    <button className='hover:bg-current' style={{ backgroundColor: 'rgb(255, 162, 0)', padding: '10px', marginTop: '5px', marginBottom: '0px' }}> <Link to='/cart' className='no-underline hover:no-underline text-black hover:text-black' onClick={() => setIsOpenCart(false)}>Proceed to checkout</Link></button>
                                                )}
                                                {cart.length === 0 && (
                                                    <div className='text-center'>Cart is Empty</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Transition>
                        <div className="relative inline-block">
                            <div>
                                <span className="rounded-md  hidden lg:block">
                                    <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex-no-grow flex-no-shrink relative py-2 px-2 leading-normal text-white no-underline flex items-center mt-1 transition ease-in-out duration-150" id="options-menu" aria-haspopup="true" aria-expanded="true">
                                        ACCOUNT
        <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </span>
                            </div>

                            <Transition
                                show={isOpen}
                                enter='transition ease-out duration-100'
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                                className='hidden lg:block'
                            >
                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
                                    <div className="rounded-md bg-white shadow-xs">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <Link to='/mybeats' className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">My Beats</Link>
                                            <Link to='/contactme' className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Support</Link>
                                            <Link to='/Pricing' className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Pricing</Link>
                                            <form>
                                                {auth.isAuthenticated && (
                                                    <button className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" >
                                                        <Logout />
                                                    </button>
                                                )}
                                                {!auth.isAuthenticated && (
                                                    <Link to='/login'>
                                                        <button className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" >Sign in</button>
                                                    </Link>
                                                )}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>

                    </div>
                </div>

            </nav >
            {
                auth.isAuthenticated && (
                    <div></div>
                )
            }

            {
                !localStorage.getItem('token') && (
                    <div></div>
                )
            }

        </div >

    )
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps, {})(NavBar)
