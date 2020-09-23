import React, { useState, useEffect } from 'react'
import './aplayer/app.css';
import { useSetRecoilState } from 'recoil';
import { selectedTrackState, mountState, isCartModelOpen } from '../atoms'
import { ModalBody, Modal, ModalFooter, Button } from 'react-bootstrap'
import { cartBeatState } from '../atoms'
import { useRecoilState } from 'recoil'
import '../styles/beat.css'
import { connect } from 'react-redux'
import store from '../store'
import { updateCart, updatePurchasedBeats } from '../actions/authActions'
import { Link } from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ModalSm from '@material-ui/core/Modal'

const Beat = ({ beat, auth }) => {
    const setSelectedTrack = useSetRecoilState(selectedTrackState)
    const [cartBeats, setCartBeatState] = useRecoilState(cartBeatState)
    const [showModel, setShowModel] = useState(false)
    const [plan, setPlan] = useState('BASIC')
    const [isPurchased] = useState(false)
    const setMount = useSetRecoilState(mountState)
    const setIsCartModelOpen = useSetRecoilState(isCartModelOpen)
    const matches = useMediaQuery('(min-width:1024px)')
    const [openPhone, setOpenPhone] = useState(false)

    useEffect(() => {
        if (isPurchased) {
            store.dispatch({ updatePurchasedBeats })
        }
    }, [isPurchased])

    const handleOpenPhone = () => {
        setOpenPhone(true)
    }
    const handleClosePhone = () => {
        setOpenPhone(false)
    }


    const uniq = (a) => {
        var seen = {}
        return a.filter((item) => {
            return seen.hasOwnProperty(item.name) ? false : (seen[item.name] = true);
        })
    }

    useEffect(() => {
        if (auth.user) {
            setCartBeatState(auth.user.data.cart)
        }
        if (!auth.isAuthenticated) {
            if (localStorage.getItem('cart')) {
                setCartBeatState(JSON.parse(localStorage.getItem('cart')))
            } else {
                localStorage.setItem('cart', JSON.stringify(cartBeats))
            }
        }
    }, [auth])

    const handleClose = () => setShowModel(false)
    const handleCart = () => {
        if (auth.isAuthenticated) {
            handleCartBeats()
        } else {
            const cart = [...cartBeats]
            cart.push({ ...beat, plan, isPurchased })
            localStorage.setItem('cart', JSON.stringify(uniq(cart)))
            setCartBeatState(uniq(cart))
        }
        setShowModel(false)
        handleCartModel()
    }

    const handlemountState = () => setMount(false)
    const handleCartModel = () => setIsCartModelOpen(true)

    const handleCartBeats = () => {
        const cart = [...cartBeats]
        cart.push({ ...beat, plan, isPurchased })
        store.dispatch(updateCart(uniq(cart)))
        setCartBeatState(uniq(cart))
    }

    // plans styling
    const [basicStyle, setBasicStyle] = useState({ textAlign: 'center', margin: '5px' })
    const [unlimitedStyle, setUnlimitedStyle] = useState({ textAlign: 'center', margin: '5px' })
    const [exclusiveStyle, setExclusiveStyle] = useState({ textAlign: 'center', margin: '5px' })
    const [trackoutStyle, setTrackoutStyle] = useState({ textAlign: 'center', margin: '5px' })
    const [premiumStyle, setPremiumStyle] = useState({ textAlign: 'center', margin: '5px' })

    // let apLrcList = {
    //     theme: '#F57F17',
    //     lrcType: 3,
    //     audio: []
    // }
    // let apFixedLrcList = {
    //     lrcType: 3,
    //     fixed: true,
    //     mini: true,
    //     audio: []
    // }
    // apLrcList.audio.push({
    //     name: beat.name,
    //     artist: beat.artist,
    //     url: beat.mp3 || beat.wav,
    //     cover: beat.cover,
    //     theme: beat.theme
    // })
    // apFixedLrcList.audio.push({
    //     name: beat.name,
    //     artist: beat.artist,
    //     url: beat.mp3 || beat.wav,
    //     cover: beat.cover,
    //     theme: beat.theme
    // })


    return (
        <div>
            <div className='beatContainer'>
                <div className='grid grid-cols-2 justify-center'>
                    <div className='flex border-b pb-2'>
                        <img src={beat.cover} className='beatCover cursor-pointer' alt='beat cover' onClick={() => {
                            setSelectedTrack(beat)
                            handlemountState()
                        }} />
                        <div className='text-3xl lg:mt-0 lg:pt-0 lg:ml-0 lg:text-xl text-white'>
                            <Link to={`/beatHome/${beat.id}`}>
                                <p className='beatNameWhite text-3xl lg:text-xl hover:text-white hover:underline'>
                                    {beat.name}
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 border-b pb-2'>
                        <div className='grid grid-cols-2 lg:ml-20'>
                            <div className='hidden lg:block lg:mr-0 lg:ml-20 lg:mt-3 text-white text-3xl'>
                                <p className='bpmStyle'>{beat.bpm} </p>
                            </div>
                            <div className='flex lg:ml-12'>
                                {beat.tags.map((tag) => <div className='tagStyles' key={tag}><p
                                    key={tag}
                                    className='tagActualStyle bg-white text-black rounded-lg border'
                                >#{tag} </p></div>)}
                            </div>
                        </div>
                        <div className='buttonSM'>
                            <div className='lg:ml-20'>
                                <div className='lg:ml-20'>
                                    <button className='buttonCartBeat'
                                        onClick={() => {
                                            setShowModel(true)
                                            handleOpenPhone()
                                        }}>
                                        <div className='flex justify-center'>
                                            <svg className='addToCartCartCart' id="Capa_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m472 452c0 11.046-8.954 20-20 20h-20v20c0 11.046-8.954 20-20 20s-20-8.954-20-20v-20h-20c-11.046 0-20-8.954-20-20s8.954-20 20-20h20v-20c0-11.046 8.954-20 20-20s20 8.954 20 20v20h20c11.046 0 20 8.954 20 20zm0-312v192c0 11.046-8.954 20-20 20s-20-8.954-20-20v-172h-40v60c0 11.046-8.954 20-20 20s-20-8.954-20-20v-60h-192v60c0 11.046-8.954 20-20 20s-20-8.954-20-20v-60h-40v312h212c11.046 0 20 8.954 20 20s-8.954 20-20 20h-232c-11.046 0-20-8.954-20-20v-352c0-11.046 8.954-20 20-20h60.946c7.945-67.477 65.477-120 135.054-120s127.109 52.523 135.054 120h60.946c11.046 0 20 8.954 20 20zm-121.341-20c-7.64-45.345-47.176-80-94.659-80s-87.019 34.655-94.659 80z" /></g></svg>
                                            <p style={{ color: 'black' }} className='textMoneyStyle text-xl sm:text-3xl lg:text-xl'> $19.99</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {matches && (
                <Modal show={showModel} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add to Cart</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <div className='d-flex justify-content-start hidden lg:block'>
                            <img src={beat.cover} className='imageCrop' alt='beat cover'></img>
                            <div style={{ marginTop: '0px' }}>
                                <h2 className='beatName'>{beat.name}</h2>
                                <div className='d-flex justify-content-start'>
                                    {beat.tags.map(tag => <p key={tag} className='tagStyle'>#{tag}</p>)}
                                </div>
                                <h5 className='genreHeader'>Genre:</h5>
                                <div className='d-flex justify-content-start'>
                                    {beat.genre.map(genre => <p key={genre} className='genreStyle'>{genre}</p>)}
                                </div>
                                <div className='d-flex justify-content-start '>
                                    <h5 className='bpmHeader'>BPM: </h5>
                                    <h5>{beat.bpm}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3" style={{ marginTop: '10px' }}>
                            <div className='card' onClick={() => {
                                setPlan('BASIC')
                                setBasicStyle({ textAlign: 'center', margin: '5px', backgroundColor: 'rgb(0, 98, 204)' })
                                setPremiumStyle({ textAlign: 'center', margin: '5px' })
                                setExclusiveStyle({ textAlign: 'center', margin: '5px' })
                                setTrackoutStyle({ textAlign: 'center', margin: '5px' })
                                setUnlimitedStyle({ textAlign: 'center', margin: '5px' })
                            }} style={basicStyle} >
                                <h4 style={{ fontSize: '1.25rem', marginTop: '10px' }}>BASIC</h4>
                                <h3 style={{ fontSize: '1.5rem', marginTop: '10px', marginBottom: '10px' }}>$19.99</h3>
                                <p>MP3</p>
                            </div>
                            <div className='card' onClick={() => {
                                setPlan('PREMIUM')
                                setPremiumStyle({ textAlign: 'center', margin: '5px', backgroundColor: 'rgb(0, 98, 204)' })
                                setBasicStyle({ textAlign: 'center', margin: '5px' })
                                setExclusiveStyle({ textAlign: 'center', margin: '5px' })
                                setTrackoutStyle({ textAlign: 'center', margin: '5px' })
                            }} style={premiumStyle}>
                                <h4 style={{ fontSize: '1.25rem', marginTop: '10px' }}>PREMIUM</h4>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', marginTop: '10px' }}>$29.99</h3>
                                <p>MP3 & WAV</p>
                            </div>
                            <div className='card' onClick={() => {
                                setPlan('TRACKOUT')
                                setTrackoutStyle({ textAlign: 'center', margin: '5px', backgroundColor: 'rgb(0, 98, 204)' })
                                setBasicStyle({ textAlign: 'center', margin: '5px' })
                                setUnlimitedStyle({ textAlign: 'center', margin: '5px' })
                                setPremiumStyle({ textAlign: 'center', margin: '5px' })
                            }} style={trackoutStyle}>
                                <h4 style={{ fontSize: '1.25rem', marginTop: '10px' }}>TRACKOUT</h4>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', marginTop: '10px' }}>$75</h3>
                                <p style={{ fontSize: '0.8rem' }}>MP3, WAV, & TRACK STEMS</p>
                            </div>
                            <div className='card' onClick={() => {
                                setPlan('UNLIMITED')
                                setUnlimitedStyle({ textAlign: 'center', margin: '5px', backgroundColor: 'rgb(0, 98, 204)' })
                                setExclusiveStyle({ textAlign: 'center', margin: '5px' })
                                setPremiumStyle({ textAlign: 'center', margin: '5px' })
                                setBasicStyle({ textAlign: 'center', margin: '5px' })
                                setTrackoutStyle({ textAlign: 'center', margin: '5px' })
                            }} style={unlimitedStyle}>
                                <h4 style={{ fontSize: '1.25rem' }}>UNLIMITED</h4>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', marginTop: '10px' }}>$99.99</h3>
                                <p>MP3, WAV, & TRACK STEMS</p>
                            </div>
                            <Link
                                to={{
                                    pathname: '/makeanoffer',
                                    state: {
                                        beat: beat
                                    }
                                }}
                            >
                                <div className='card' onClick={() => {
                                    setPlan('EXCLUSIVE')
                                    setExclusiveStyle({ textAlign: 'center', margin: '5px', backgroundColor: 'rgb(0, 98, 204)' })
                                    setBasicStyle({ textAlign: 'center', margin: '5px' })
                                    setPremiumStyle({ textAlign: 'center', margin: '5px' })
                                    setUnlimitedStyle({ textAlign: 'center', margin: '5px' })
                                    setTrackoutStyle({ textAlign: 'center', margin: '5px' })
                                }} style={exclusiveStyle}>
                                    <h4 style={{ fontSize: '1.25rem' }}>EXCLUSIVE</h4>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', marginTop: '10px' }}>MAKE AN OFFER</h3>
                                    <p>MP3, WAV, & TRACK STEMS</p>
                                </div>
                            </Link>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='secondary' onClick={handleClose}>Close</Button>
                        <Button variant='primary' onClick={handleCart}>Add</Button>
                    </ModalFooter>
                </Modal>
            )}

            {!matches && (
                <div>
                    <ModalSm
                        open={openPhone}
                        onClose={handleClosePhone}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        className=''
                        style={{ top: '17%' }}
                    >
                        <div>
                            <div className='d-flex justify-content-center'>
                                <img src={beat.cover} className='beatCoverPhone' alt='beat cover'></img>
                                <div style={{ marginTop: '0px' }}>
                                    <h2 className='beatNamePhone'>{beat.name}</h2>
                                    <div className='d-flex justify-content-start'>
                                        {beat.tags.map(tag => <p key={tag} className='tagStylePhone'>#{tag}</p>)}
                                    </div>
                                    <h5 className='genreHeaderPhone'>Genre:</h5>
                                    <div className='d-flex justify-content-start'>
                                        {beat.genre.map(genre => <p key={genre} className='genreStylePhone'>{genre}</p>)}
                                    </div>
                                    <div className='d-flex justify-content-start '>
                                        <h5 className='bpmHeaderPhone'>BPM: </h5>
                                        <h5 className='bpmPhone text-white'>{beat.bpm}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 justify-content-center w-full absolute" style={{ marginTop: '10px' }}>
                                <div className='card m-2 p-3 bg-black bg-opacity-75' onClick={() => {
                                    setPlan('BASIC')
                                    setBasicStyle({ textAlign: 'center', margin: '5px', backgroundColor: 'rgb(0, 98, 204)' })
                                    setPremiumStyle({ textAlign: 'center', margin: '5px' })
                                    setExclusiveStyle({ textAlign: 'center', margin: '5px' })
                                    setTrackoutStyle({ textAlign: 'center', margin: '5px' })
                                    setUnlimitedStyle({ textAlign: 'center', margin: '5px' })
                                }} style={basicStyle} >
                                    <h4 className='text-white' style={{ fontSize: '3.4rem', marginTop: '10px' }}>BASIC</h4>
                                    <h3 className='text-white' style={{ fontSize: '3rem', marginTop: '10px', marginBottom: '10px' }}>$19.99</h3>
                                    <p className='text-white' style={{ fontSize: '2.3rem' }}>MP3</p>
                                </div>
                                <div className='card m-2 p-3 bg-black bg-opacity-75' onClick={() => {
                                    setPlan('PREMIUM')
                                    setPremiumStyle({ textAlign: 'center', margin: '5px', backgroundColor: 'rgb(0, 98, 204)' })
                                    setBasicStyle({ textAlign: 'center', margin: '5px' })
                                    setExclusiveStyle({ textAlign: 'center', margin: '5px' })
                                    setTrackoutStyle({ textAlign: 'center', margin: '5px' })
                                }} style={premiumStyle}>
                                    <h4 className='text-white' style={{ fontSize: '3.4rem', marginTop: '10px' }}>PREMIUM</h4>
                                    <h3 className='text-white' style={{ fontSize: '3rem', marginBottom: '10px', marginTop: '10px' }}>$29.99</h3>
                                    <p className='text-white' style={{ fontSize: '2.3rem' }}>MP3 & WAV</p>
                                </div>
                                <div className='card m-2 p-3 bg-black bg-opacity-75' onClick={() => {
                                    setPlan('TRACKOUT')
                                    setTrackoutStyle({ textAlign: 'center', margin: '5px', backgroundColor: 'rgb(0, 98, 204)' })
                                    setBasicStyle({ textAlign: 'center', margin: '5px' })
                                    setUnlimitedStyle({ textAlign: 'center', margin: '5px' })
                                    setPremiumStyle({ textAlign: 'center', margin: '5px' })
                                }} style={trackoutStyle}>
                                    <h4 className='text-white' style={{ fontSize: '3.4rem', marginTop: '10px' }}>TRACKOUT</h4>
                                    <h3 className='text-white' style={{ fontSize: '3rem', marginBottom: '10px', marginTop: '10px' }}>$75</h3>
                                    <p className='text-white' style={{ fontSize: '2.3rem' }}>MP3, WAV, & TRACK STEMS</p>
                                </div>
                                <div className='card m-2 p-3 bg-black bg-opacity-75' onClick={() => {
                                    setPlan('UNLIMITED')
                                    setUnlimitedStyle({ textAlign: 'center', margin: '5px', backgroundColor: 'rgb(0, 98, 204)' })
                                    setExclusiveStyle({ textAlign: 'center', margin: '5px' })
                                    setPremiumStyle({ textAlign: 'center', margin: '5px' })
                                    setBasicStyle({ textAlign: 'center', margin: '5px' })
                                    setTrackoutStyle({ textAlign: 'center', margin: '5px' })
                                }} style={unlimitedStyle}>
                                    <h4 className='text-white' style={{ fontSize: '3.4rem' }}>UNLIMITED</h4>
                                    <h3 className='text-white' style={{ fontSize: '3rem', marginBottom: '10px', marginTop: '10px' }}>$99.99</h3>
                                    <p className='text-white' style={{ fontSize: '2.3rem' }}>MP3, WAV, & TRACK STEMS</p>
                                </div>
                                <Link
                                    to={{
                                        pathname: '/makeanoffer',
                                        state: {
                                            beat: beat
                                        }
                                    }}
                                >
                                    <div className='card m-2 p-3 bg-black bg-opacity-75' onClick={() => {
                                        setPlan('EXCLUSIVE')
                                        setExclusiveStyle({ textAlign: 'center', margin: '5px', backgroundColor: 'rgb(0, 98, 204)' })
                                        setBasicStyle({ textAlign: 'center', margin: '5px' })
                                        setPremiumStyle({ textAlign: 'center', margin: '5px' })
                                        setUnlimitedStyle({ textAlign: 'center', margin: '5px' })
                                        setTrackoutStyle({ textAlign: 'center', margin: '5px' })
                                    }} style={exclusiveStyle}>
                                        <h4 className='text-white' style={{ fontSize: '3.4rem' }}>EXCLUSIVE</h4>
                                        <h3 className='text-white' style={{ fontSize: '3rem', marginBottom: '10px', marginTop: '10px' }}>MAKE AN OFFER</h3>
                                        <p className='text-white' style={{ fontSize: '2.3rem' }}>MP3, WAV, & TRACK STEMS</p>
                                    </div>
                                </Link>
                            </div>
                            <div className='absolute flex justify-center w-full' style={{ top: '70%' }}>
                                <button
                                    className='text-white text-5xl bg-black bg-opacity-75 rounded-full'
                                    onClick={handleClosePhone}
                                >Close</button>
                                <button
                                    className='text-white text-5xl rounded-full w-1/2 bg-black bg-opacity-75'
                                    onClick={() => {
                                        handleCart()
                                        handleClosePhone()
                                    }}
                                >Add</button>
                            </div>
                        </div>
                    </ModalSm>
                </div>
            )}
        </div >
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Beat)