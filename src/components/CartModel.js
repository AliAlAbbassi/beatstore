import React from 'react'
import { useRecoilState } from 'recoil'
import { cartBeatState, isCartModelOpen } from '../atoms'
import store from '../store'
import { updateCart } from '../actions/authActions'
import { connect } from 'react-redux'
import { uniq } from 'lodash'

const CartModel = ({ beat, auth }) => {
    const [cart, setCart] = useRecoilState(cartBeatState)
    const [isOpenCart, setIsOpenCart] = useRecoilState(isCartModelOpen)

    const handleCartModel = () => {
        setIsOpenCart(!isOpenCart)
    }
    const removeItem = () => {
        if (auth.isAuthenticated) {
            let newCart = []
            cart.map(track => {
                if (track.name !== beat.name) {
                    newCart.push(track)
                }
                return null
            })
            store.dispatch(updateCart(uniq(newCart)))
            setCart(uniq(newCart))
            if (cart.length === 1)
                handleCartModel()
        } else {
            let newCart = []
            cart.map(track => {
                if (track.name !== beat.name) {
                    newCart.push(track)
                }
                return null
            })
            localStorage.removeItem('cart')
            localStorage.setItem('cart', JSON.stringify(newCart))
            setCart(newCart)
            if (cart.length === 1)
                handleCartModel()
        }
    }
    return (
        <div>
            <div className='grid grid-cols-3'>
                <img src={beat.cover} className='beatCoverCartModel lg:w-10 lg:object-cover lg:rounded' alt='cover' />
                <div className='beatNameCartModel text-white text-left'>{beat.name}</div>
                <div>
                    <svg onClick={() => removeItem()} className='whiteCrossWhiteModel' xmlns="http://www.w3.org/2000/svg" width="512.001" height="512" viewBox="0 0 512.001 512">
                        <g id="white_cross" data-name="white cross" transform="translate(0 -0.001)">
                            <g id="Group_1" data-name="Group 1">
                                <path id="Path_1" data-name="Path 1" d="M284.286,256,506.143,34.144A20,20,0,0,0,477.858,5.859L256,227.717,34.143,5.859A20,20,0,0,0,5.858,34.144L227.715,256,5.858,477.859a20,20,0,0,0,28.286,28.285L256,284.287,477.857,506.144a20,20,0,0,0,28.286-28.285Z" fill="#fff" />
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(CartModel)