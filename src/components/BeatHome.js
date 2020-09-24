import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import '../styles/beatHome.css'
import './aplayer/app.css'
import Store from '../components/Store'
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { cartBeatState, isCartModelOpen } from '../atoms'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ModalSm from '@material-ui/core/Modal'
import { Link } from 'react-router-dom'
import { uniq, uniqBy } from 'lodash'
import { updateCart } from '../actions/authActions'
import store from '../store'
import { ModalBody, Modal, ModalFooter, Button } from 'react-bootstrap'
import { urlState, mountState } from '../atoms'
import { API } from 'aws-amplify'
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";

const overrideLg = css`
  display: block;
  margin-top: 250px;
  margin-left: 600px;
`;

const override = css`
    display: block;
    margin-top: 500px;
    margin-left: 400px;
`;

const BeatHome = ({ auth }) => {
    const [URL] = useRecoilState(urlState)
    const [unmountRB, setUnmountRb] = useRecoilState(mountState)
    const { id } = useParams()
    const { isError, data, isLoading } = useQuery([id, URL], fetchBeat)
    const [isPlaying, setIsPlaying] = useState(false)
    const [unmount, setMount] = useState(true)
    const [openPhone, setOpenPhone] = useState(false)
    const matches = useMediaQuery('(min-width:1024px)')
    const [isPurchased] = useState(false)
    const [plan, setPlan] = useState('BASIC')
    const [cartBeats, setCartBeatState] = useRecoilState(cartBeatState)
    const setIsCartModelOpen = useSetRecoilState(isCartModelOpen)
    const [audio, setAudio] = useState(null)
    const [audioList, setAudioList] = useState([])
    const [showModelBg, setShowModelBg] = useState(false)
    const [newOptions] = useState({
        audioLists: [],
        theme: 'dark',
        locale: 'en_US',
        defaultPosition: { bottom: 0, left: 0 },
        mode: 'full',
        autoPlay: false,
        playIndex: 0,
        responsive: false,
        showDownload: false
    })


    useEffect(() => {
        if (!unmountRB) {
            setMount(true)
            setIsPlaying(false)
        }
    }, [unmountRB])

    useEffect(() => {
        setUnmountRb(true)
    }, [id])

    // plans styling
    const [basicStyle, setBasicStyle] = useState({ textAlign: 'center', margin: '5px' })
    const [unlimitedStyle, setUnlimitedStyle] = useState({ textAlign: 'center', margin: '5px' })
    const [exclusiveStyle, setExclusiveStyle] = useState({ textAlign: 'center', margin: '5px' })
    const [trackoutStyle, setTrackoutStyle] = useState({ textAlign: 'center', margin: '5px' })
    const [premiumStyle, setPremiumStyle] = useState({ textAlign: 'center', margin: '5px' })


    const handleCart = () => {
        if (auth.isAuthenticated) {
            handleCartBeats()
        } else {
            const cart = [...cartBeats]
            cart.push({ ...data.data, plan, isPurchased })
            localStorage.setItem('cart', JSON.stringify(uniq(cart)))
            setCartBeatState(uniq(cart))
        }
        setShowModelBg(false)
        handleCartModel()
    }

    const handleCartBeats = () => {
        const cart = [...cartBeats]
        cart.push({ ...data.data, plan, isPurchased })
        store.dispatch(updateCart(uniqBy(cart, 'id')))
        setCartBeatState(uniqBy(cart, 'id'))
    }

    const handleCartModel = () => setIsCartModelOpen(true)

    const handlePlay = () => {
        setIsPlaying(!isPlaying)
        audio.play()
    }

    const handleMountState = () => {
        setMount(false)
    }
    const handlePause = () => {
        setIsPlaying(!isPlaying)
        audio.pause()
    }


    useEffect(() => {
        setAudioList([])
        setMount(false)
        if (data) {
            let newList = [{
                name: data.data.name,
                singer: data.data.artist,
                cover: data.data.cover,
                musicSrc: data.data.mp3 || data.data.wav
            }]
            setAudioList(newList)
            handleMountState()
        }
    }, [data])


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

    const handleOpenPhone = () => {
        setOpenPhone(true)
    }
    const handleClosePhone = () => {
        setOpenPhone(false)
    }

    const handleCloseBg = () => setShowModelBg(false)

    if (isLoading && matches) {
        return (
            <PacmanLoader
                css={overrideLg}
                size={90}
                color={"#ffffff"}
                loading={isLoading}
            />
        )
    } else if (!matches && isLoading) {
        return (
            <PacmanLoader
                css={override}
                size={100}
                color={"#ffffff"}
                loading={isLoading}
            />
        )
    }

    if (isError) {
        return (
            <div className='text-white mt-64 text-6xl text-center'>Error Fetching Beats. Try Again Later.</div>
        )
    }

    if (!matches) {

        return (
            <div>
                {data && (
                    <div>
                        <div className='mt-56'>
                            <img
                                className='beatcover m-auto object-cover'
                                src={data.data.cover}
                                alt='beat cover'
                            />
                            {!isPlaying && (
                                <div className='flex justify-center'>
                                    <svg className='play' onClick={handlePlay} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 320.001 320.001" space="preserve">
                                        <path d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288
	c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144
	c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z"/>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                    </svg>
                                    <div className='text-6xl text-white text-center'>{data.data.name}</div>
                                </div>
                            )}

                            {isPlaying && (
                                <div className='flex justify-center'>
                                    <svg className='pause' onClick={handlePause} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 477.867 477.867" space="preserve">
                                        <g>
                                            <g>
                                                <path d="M187.733,0H51.2c-9.426,0-17.067,7.641-17.067,17.067V460.8c0,9.426,7.641,17.067,17.067,17.067h136.533
			c9.426,0,17.067-7.641,17.067-17.067V17.067C204.8,7.641,197.159,0,187.733,0z"/>
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <path d="M426.667,0H290.133c-9.426,0-17.067,7.641-17.067,17.067V460.8c0,9.426,7.641,17.067,17.067,17.067h136.533
			c9.426,0,17.067-7.641,17.067-17.067V17.067C443.733,7.641,436.092,0,426.667,0z"/>
                                            </g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                    </svg>
                                    <div className='text-6xl text-white text-center'>{data.data.name}</div>
                                </div>
                            )}
                        </div>
                        <div className='text-4xl text-white text-center'>CUTHLEHOOP</div>
                        <div className='text-4xl text-white text-center'>Free downloads are for non commercial/non profit only.</div>
                        <div className='flex justify-center mt-10'>
                            <div className='mr-2'>
                                <button className='addToCartBtn text-5xl flex'
                                    onClick={handleOpenPhone}
                                >
                                    <svg className='addToCartLogo' id="Capa_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m472 452c0 11.046-8.954 20-20 20h-20v20c0 11.046-8.954 20-20 20s-20-8.954-20-20v-20h-20c-11.046 0-20-8.954-20-20s8.954-20 20-20h20v-20c0-11.046 8.954-20 20-20s20 8.954 20 20v20h20c11.046 0 20 8.954 20 20zm0-312v192c0 11.046-8.954 20-20 20s-20-8.954-20-20v-172h-40v60c0 11.046-8.954 20-20 20s-20-8.954-20-20v-60h-192v60c0 11.046-8.954 20-20 20s-20-8.954-20-20v-60h-40v312h212c11.046 0 20 8.954 20 20s-8.954 20-20 20h-232c-11.046 0-20-8.954-20-20v-352c0-11.046 8.954-20 20-20h60.946c7.945-67.477 65.477-120 135.054-120s127.109 52.523 135.054 120h60.946c11.046 0 20 8.954 20 20zm-121.341-20c-7.64-45.345-47.176-80-94.659-80s-87.019 34.655-94.659 80z" /></g></svg>
                                    <p className='moneyTextStyle mr-auto hover:text-black text-black'>$19.99</p>
                                </button>
                            </div>
                            <div className='ml-2'>
                                <button className='download text-center'>DOWNLOAD</button>
                            </div>
                        </div>
                        <div className='flex justify-center mt-5 ml-12'>
                            {data.data.tags.map(tag => (
                                <div key={tag}>
                                    <p className='text-5xl text-black text-center mr-3 bg-white border-2 rounded-full p-3'>#{tag} </p>
                                </div>
                            ))}
                        </div>
                        <div className='text-white text-5xl text-center mt-5'>RELATED TRACKS</div>
                        <RelatedBeats />
                        {unmount ? false : (
                            <ReactJkMusicPlayer
                                {...newOptions}
                                audioLists={audioList}
                                getAudioInstance={(audio) => setAudio(audio)}
                                onAudioListsChange={(currentPlayId, audioLists, audioInfo) => {
                                    if (currentPlayId !== '') {
                                        window.location.reload()
                                    }
                                }}
                            />
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
                                            <img src={data.data.cover} className='beatCoverPhone' alt='beat cover'></img>
                                            <div style={{ marginTop: '0px' }}>
                                                <h2 className='beatNamePhone'>{data.data.name}</h2>
                                                <div className='d-flex justify-content-start'>
                                                    {data.data.tags.map(tag => <p key={tag} className='tagStylePhone'>#{tag}</p>)}
                                                </div>
                                                <h5 className='genreHeaderPhone'>Genre:</h5>
                                                <div className='d-flex justify-content-start'>
                                                    {data.data.genre.map(genre => <p key={genre} className='genreStylePhone'>{genre}</p>)}
                                                </div>
                                                <div className='d-flex justify-content-start '>
                                                    <h5 className='bpmHeaderPhone'>BPM: </h5>
                                                    <h5 className='bpmPhone text-white'>{data.data.bpm}</h5>
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
                                                        beat: data.data
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
                    </div>
                )
                }
            </div >
        )
    }
    return (
        <div>
            {data && (
                <div className='mt-32'>
                    <div className='flex justify-center'>
                        <img
                            className='beatcover object-cover'
                            src={data.data.cover}
                            alt='beat cover'
                        />
                        <div>
                            <div className='flex'>
                                {!isPlaying && (
                                    <svg className='play' onClick={handlePlay} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 320.001 320.001" space="preserve">
                                        <path d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288
	c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144
	c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z"/>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                    </svg>
                                )}
                                {isPlaying && (
                                    <svg className='play' onClick={handlePause} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 477.867 477.867" space="preserve">
                                        <g>
                                            <g>
                                                <path d="M187.733,0H51.2c-9.426,0-17.067,7.641-17.067,17.067V460.8c0,9.426,7.641,17.067,17.067,17.067h136.533
			c9.426,0,17.067-7.641,17.067-17.067V17.067C204.8,7.641,197.159,0,187.733,0z"/>
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <path d="M426.667,0H290.133c-9.426,0-17.067,7.641-17.067,17.067V460.8c0,9.426,7.641,17.067,17.067,17.067h136.533
			c9.426,0,17.067-7.641,17.067-17.067V17.067C443.733,7.641,436.092,0,426.667,0z"/>
                                            </g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                    </svg>
                                )}
                                <h2 className='beatNameDesk text-white text-3xl'>{data.data.name}</h2>
                            </div>
                            <p className='artistStyle text-white text-sm font-bold'>CUTHLEHOOP</p>
                            <p className='artistStyle text-white text-sm'>Free downloads are for non commercial/none profit only. You ALWAYS have to credit me in the title of your song.</p>
                            <div className='flex justify-between'>
                                <div className='flex'>
                                    <button onClick={() => setShowModelBg(!showModelBg)} className='addToCartBtn flex'
                                    >
                                        <svg className='addToCartLogo' id="Capa_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m472 452c0 11.046-8.954 20-20 20h-20v20c0 11.046-8.954 20-20 20s-20-8.954-20-20v-20h-20c-11.046 0-20-8.954-20-20s8.954-20 20-20h20v-20c0-11.046 8.954-20 20-20s20 8.954 20 20v20h20c11.046 0 20 8.954 20 20zm0-312v192c0 11.046-8.954 20-20 20s-20-8.954-20-20v-172h-40v60c0 11.046-8.954 20-20 20s-20-8.954-20-20v-60h-192v60c0 11.046-8.954 20-20 20s-20-8.954-20-20v-60h-40v312h212c11.046 0 20 8.954 20 20s-8.954 20-20 20h-232c-11.046 0-20-8.954-20-20v-352c0-11.046 8.954-20 20-20h60.946c7.945-67.477 65.477-120 135.054-120s127.109 52.523 135.054 120h60.946c11.046 0 20 8.954 20 20zm-121.341-20c-7.64-45.345-47.176-80-94.659-80s-87.019 34.655-94.659 80z" /></g></svg>
                                        <p className='moneyTextStyle mr-auto hover:text-black text-black'>$19.99</p>
                                    </button>
                                    <button className='addToCartBtn flex'
                                    >
                                        <svg className='downloadLogo' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
                                            viewBox="0 0 477.867 477.867" space="preserve">
                                            <g>
                                                <g>
                                                    <path d="M409.6,153.6h-85.333c-9.426,0-17.067,7.641-17.067,17.067s7.641,17.067,17.067,17.067H409.6
			c9.426,0,17.067,7.641,17.067,17.067v221.867c0,9.426-7.641,17.067-17.067,17.067H68.267c-9.426,0-17.067-7.641-17.067-17.067
			V204.8c0-9.426,7.641-17.067,17.067-17.067H153.6c9.426,0,17.067-7.641,17.067-17.067S163.026,153.6,153.6,153.6H68.267
			c-28.277,0-51.2,22.923-51.2,51.2v221.867c0,28.277,22.923,51.2,51.2,51.2H409.6c28.277,0,51.2-22.923,51.2-51.2V204.8
			C460.8,176.523,437.877,153.6,409.6,153.6z"/>
                                                </g>
                                            </g>
                                            <g>
                                                <g>
                                                    <path d="M335.947,243.934c-6.614-6.387-17.099-6.387-23.712,0L256,300.134V17.067C256,7.641,248.359,0,238.933,0
			s-17.067,7.641-17.067,17.067v283.068l-56.201-56.201c-6.78-6.548-17.584-6.361-24.132,0.419c-6.388,6.614-6.388,17.1,0,23.713
			l85.333,85.333c6.657,6.673,17.463,6.687,24.136,0.03c0.01-0.01,0.02-0.02,0.031-0.03l85.333-85.333
			C342.915,261.286,342.727,250.482,335.947,243.934z"/>
                                                </g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                        </svg>
                                        <p className='download text-center mr-auto hover:text-black text-black'>DOWNLOAD</p>
                                    </button>
                                </div>
                                <div className='flex' style={{ marginRight: '-217px' }}>
                                    {data.data.tags.map(tag => (
                                        <div key={tag}>
                                            <p className='tagText text-black border bg-white rounded-lg mr-2'>#{tag}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {unmount ? false : (
                            <ReactJkMusicPlayer
                                {...newOptions}
                                audioLists={audioList}
                                getAudioInstance={(audio) => setAudio(audio)}
                                onAudioListsChange={(currentPlayId, audioLists, audioInfo) => {
                                    if (currentPlayId !== '') {
                                        window.location.reload()
                                    }
                                }}
                            />
                        )}
                    </div>
                    <p className='text-white text-center mt-5 text-2xl'>RELATED TRACKS</p>
                    <RelatedBeats />
                    <Modal show={showModelBg} onHide={handleCloseBg}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add to Cart</Modal.Title>
                        </Modal.Header>

                        <ModalBody>
                            <div className='d-flex justify-content-start hidden lg:block'>
                                <img src={data.data.cover} className='imageCrop' alt='beat cover'></img>
                                <div style={{ marginTop: '0px' }}>
                                    <h2 className='beatName'>{data.data.name}</h2>
                                    <div className='d-flex justify-content-start'>
                                        {data.data.tags.map(tag => <p key={tag} className='tagStyle'>#{tag}</p>)}
                                    </div>
                                    <h5 className='genreHeader'>Genre:</h5>
                                    <div className='d-flex justify-content-start'>
                                        {data.data.genre.map(genre => <p key={genre} className='genreStyle'>{genre}</p>)}
                                    </div>
                                    <div className='d-flex justify-content-start '>
                                        <h5 className='bpmHeader'>BPM: </h5>
                                        <h5>{data.data.bpm}</h5>
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
                                            beat: data.data
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
                            <Button variant='secondary' onClick={handleCloseBg}>Close</Button>
                            <Button variant='primary' onClick={handleCart}>Add</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )
            }
        </div >
    )
}

const RelatedBeats = () => {
    const [limit] = useState(10)
    const [URL] = useRecoilState(urlState)
    const { data, status, error } = useQuery([limit, URL], fetchBeatsWLimit)
    return (
        <div>
            {data && (
                <Store beats={data.data} status={status} error={error} />
            )}
        </div>
    )
}

const fetchBeat = async (id, URL) => {
    const res = await API.get('beatstoreapi', `/beatstore/api/beats/${id}`)
    return res
}

// const fetchBeats = async () => {
//     const res = await fetch(`${URL}/beatstore/api/beats`)
//     return res.json()
// }
const fetchBeatsWLimit = async (limit, URL) => {
    const res = await API.get('beatstoreapi', `/beatstore/api/beats/?limit=${limit}`)
    return res
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(BeatHome)