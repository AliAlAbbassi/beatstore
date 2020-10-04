import React, { useState } from 'react'
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../styles/pricing.css'
import Mp3Lease from './Mp3Lease'
import WavLease from './WavLease'
import TrackoutLease from './TrackoutLease'
import ExclusiveLease from './ExclusiveLease'
import getMp3Lease from '../License Handling/Mp3Lease'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useMediaQuery } from '@material-ui/core';
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Pricing = () => {
    const [showModelBasic, setShowModelBasic] = useState(false)
    const [showModelPremium, setShowModelPremium] = useState(false)
    const [showModelTrackout, setShowModelTrackout] = useState(false)
    const [showModelUnlimited, setShowModelUnlimited] = useState(false)
    const [showModelExclusive, setShowModelExclusive] = useState(false)

    const handleOpenBasic = (scrollType) => {
        setShowModelBasic(true)
        getMp3Lease()
    }
    const handleOpenPremium = (scrollType) => {
        setShowModelPremium(true)
    }
    const handleOpenTrackout = (scrollType) => {
        setShowModelTrackout(true)
    }
    const handleOpenUnlimited = (scrollType) => {
        setShowModelUnlimited(true)
    }
    const handleOpenExclusive = (scrollType) => {
        setShowModelExclusive(true)
    }

    const handleCloseBasic = () => setShowModelBasic(false)
    const handleClosePremium = () => setShowModelPremium(false)
    const handleCloseTrackout = () => setShowModelTrackout(false)
    const handleCloseUnlimited = () => setShowModelUnlimited(false)
    const hanldeCloseExclusive = () => setShowModelExclusive(false)


    const [scroll] = useState('paper');

    // const descriptionElementBasicRef = useRef(null);
    // const descriptionElementPremiumRef = useRef(null);
    // const descriptionElementTrackoutRef = useRef(null);
    // const descriptionElementUnlimitedRef = useRef(null);
    // const descriptionElementExclusiveRef = useRef(null);

    // useEffect(() => {
    //     if (handleOpenBasic) {
    //         const { current: descriptionElement } = descriptionElementBasicRef
    //         if (descriptionElement !== null) {
    //             descriptionElement.focus()
    //         }
    //     }
    //     if (handleOpenPremium) {
    //         const { current: descriptionElement } = descriptionElementPremiumRef
    //         if (descriptionElement !== null) {
    //             descriptionElement.focus()
    //         }
    //     }
    //     if (handleOpenTrackout) {
    //         const { current: descriptionElement } = descriptionElementTrackoutRef
    //         if (descriptionElement !== null) {
    //             descriptionElement.focus()
    //         }
    //     }
    //     if (handleOpenUnlimited) {
    //         const { current: descriptionElement } = descriptionElementUnlimitedRef
    //         if (descriptionElement !== null) {
    //             descriptionElement.focus()
    //         }
    //     }
    //     if (handleOpenExclusive) {
    //         const { current: descriptionElement } = descriptionElementExclusiveRef
    //         if (descriptionElement !== null) {
    //             descriptionElement.focus()
    //         }
    //     }
    // }, [handleOpenBasic, handleOpenExclusive, handleOpenPremium, handleOpenTrackout, handleOpenUnlimited])

    const theme = useTheme()
    const fullscreen = useMediaQuery(theme.breakpoints.down('1024px'))

    return (
        <div className="mb-20 mt-20" style={{ marginBottom: '150px' }}>
            <h1 className='lg:text-4xl text-6xl mt-20 mb-2 text-center'>PRICING</h1>
            <div className='hidden lg:flex lg:justify-center'>
                <div className="grid grid-cols-5">
                    <div className="packages" style={{ height: '90%' }}>
                        <p className='text-3xl mt-2 text-center'>MP3</p>
                        <h2 className="text-3xl text-gray text-center mt-1">$19.99</h2>
                        <ul className="text-left mt-3">
                            <li className="mt-2">-Standrad MP3 Lease</li>
                            <li className='mt-2'>-2,000 Unit Cap</li>
                            <li className='mt-2'>-1 Commercial Use Only</li>
                            <li className='mt-2'>-50,000 Stream Cap</li>
                        </ul>
                        <button className="button button3" onClick={handleOpenBasic} style={{ color: 'black', fontSize: '20px' }}>
                            READ LICENSE
      </button>
                    </div>
                    <div className="packages" style={{ height: '90%' }}>
                        <p className='text-3xl text-center mt-2'>WAV</p>
                        <h2 className="text-3xl text-gray text-center mt-1">$29.99</h2>
                        <ul className="text-left mt-3">
                            <li className="mt-2">-High Quality WAV Lease</li>
                            <li className='mt-2'>-5,000 Unit Cap</li>
                            <li className='mt-2'>-2 Commercial Use Only</li>
                            <li className='mt-2'>-100,000 Stream Cap</li>
                        </ul>
                        <button href="#" className="button button3" onClick={handleOpenPremium} style={{ color: 'black', fontSize: '20px' }}>
                            READ LICENSE
      </button>
                    </div>
                    <div className="packages" style={{ height: '90%' }}>
                        <p className='text-3xl mt-2 text-center'>TRACKOUT</p>
                        <h2 className="text-3xl text-gray text-center mt-1">$75</h2>
                        <ul className="text-left mt-3">
                            <li className="mt-2">-Lease with Trackouts / Stems</li>
                            <li className='mt-2'>-7,000 Unit Cap</li>
                            <li className='mt-2'>-3 Commercial Use Only</li>
                            <li className='mt-2'>-250,000 Stream Cap</li>
                        </ul>
                        <button className="button button3" onClick={handleOpenTrackout} style={{ color: 'black', fontSize: '20px' }}>
                            READ LICENSE
      </button>
                    </div>
                    <div className="packages" style={{ height: '90%' }}>
                        <p className='text-3xl mt-2 text-center'>UNLIMITED</p>
                        <h2 className="text-3xl text-gray text-center mt-1">$99.99</h2>
                        <ul className="text-left mt-3">
                            <li className="mt-2">-Unlimited Unit Cap</li>
                            <li className='mt-2'>-Unlimited Commercial Use</li>
                            <li className='mt-2'>-Unlimited Stream Cap</li>
                            <li className='mt-2'>-Stems + WAV + MP3 File</li>
                        </ul>
                        <button className="button button3" onClick={handleOpenUnlimited} style={{ color: 'black', fontSize: '20px' }}>
                            READ LICENSE
      </button>
                    </div>
                    <div className="packages" style={{ height: '90%' }}>
                        <p className='text-3xl mt-2 text-center'>Exclusive</p>
                        <h2 className="text-3xl text-gray text-center mt-1">MAKE AN OFFER</h2>
                        <ul className="text-left mt-3" style={{ marginBottom: '95px' }}>
                            <li className="mt-2">Exclusive Rights</li>
                        </ul>
                        <button className="button button3" onClick={handleOpenExclusive} style={{ color: 'black', fontSize: '20px' }}>
                            READ LICENSE
      </button>
                    </div>
                </div>
            </div>
            <Swiper
                pagination={{ clickable: true }}
                navigation
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className='block lg:hidden mt-2'
            >
                <SwiperSlide className='flex justify-center'>
                    <div className="packages" style={{ height: '80%' }}>
                        <h1 className='text-6xl mt-4' style={{ fontSize: '80px' }}>MP3 LEASE</h1>
                        <h2 className="text-6xl text-gray" style={{ fontSize: '60px' }}>$29.99</h2>
                        <ul className="text-left text-4xl mt-3">
                            <li className="mt-2">-Standrad MP3 Lease</li>
                            <li className='mt-2'>-2,000 Unit Cap</li>
                            <li className='mt-2'>-1 Commercial Use Only</li>
                            <li className='mt-2'>-50,000 Stream Cap</li>
                        </ul>
                        <button className="button button3 text-center" onClick={handleOpenBasic} style={{ color: 'black', fontSize: '30px' }}>
                            <p className='textSwipeReadLicense'>
                                READ LICENSE
</p>
                        </button>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='flex justify-center'>
                    <div className="packages" style={{ height: '80%' }}>
                        <h1 className='text-6xl mt-4' style={{ fontSize: '80px' }}>WAV LEASE</h1>
                        <h2 className="text-6xl text-gray" style={{ fontSize: '60px' }}>$49.99</h2>
                        <ul className="text-left mt-3 text-4xl">
                            <li className="mt-2">-High Quality WAV Lease</li>
                            <li className='mt-2'>-5,000 Unit Cap</li>
                            <li className='mt-2'>-2 Commercial Use Only</li>
                            <li className='mt-2'>-100,000 Stream Cap</li>
                        </ul>
                        <button href="#" className="button button3 text-center" onClick={handleClosePremium} style={{ color: 'black', fontSize: '30px' }}>
                            <p className='textSwipeReadLicense'>
                                READ LICENSE
</p>
                        </button>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='flex justify-center'>
                    <div className="packages" style={{ height: '90%' }}>
                        <h1 className='text-6xl mt-4' style={{ fontSize: '80px' }}>TRACKOUT LEASE</h1>
                        <h2 className="text-6xl text-gray" style={{ fontSize: '60px' }}>$75</h2>
                        <ul className="text-left mt-3 text-4xl">
                            <li className="mt-2">-Lease with Trackouts / Stems</li>
                            <li className='mt-2'>-7,000 Unit Cap</li>
                            <li className='mt-2'>-3 Commercial Use Only</li>
                            <li className='mt-2'>-250,000 Stream Cap</li>
                        </ul>
                        <button className="button button3 text-center" onClick={handleCloseTrackout} style={{ color: 'black', fontSize: '30px' }}>
                            <p className='textSwipeReadLicense'>
                                READ LICENSE
</p>
                        </button>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='flex justify-center'>
                    <div className="packages" style={{ height: '90%' }}>
                        <h1 className='text-6xl mt-4'>UNLIMITED LEASE</h1>
                        <h2 className="text-6xl text-gray" style={{ fontSize: '60px' }}>$99.99</h2>
                        <ul className="text-left mt-3 text-4xl">
                            <li className="mt-2">-Unlimited Unit Cap</li>
                            <li className='mt-2'>-Unlimited Commercial Use</li>
                            <li className='mt-2'>-Unlimited Stream Cap</li>
                            <li className='mt-2'>-Stems + WAV + MP3 File</li>
                        </ul>
                        <button href="#" className="button button3 text-center" onClick={handleCloseUnlimited} style={{ color: 'black', fontSize: '30px' }}>
                            <p className='textSwipeReadLicense'>
                                READ LICENSE
</p>
                        </button>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='flex justify-center'>
                    <div className="packages" style={{ height: '55%' }}>
                        <h1 className='text-6xl mt-4'>Exclusive</h1>
                        <h2 className="text-6xl text-gray" style={{ fontSize: '60px' }}>MAKE AN OFFER</h2>
                        <ul className="text-left mt-3 text-3xl">
                            <li className="mt-2">Exclusive Rights</li>
                        </ul>
                        <button className="button button3 text-center" onClick={hanldeCloseExclusive} style={{ color: 'black', fontSize: '30px' }}>
                            <p className='textSwipeReadLicense'>
                                READ LICENSE
</p>
                        </button>
                    </div>
                </SwiperSlide>
            </Swiper>

            <Dialog
                open={showModelBasic}
                onClose={handleCloseBasic}
                scroll={scroll}
                fullscreen={fullscreen}
            >
                <DialogTitle id='scroll-dialog-title'>License Preview</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <Mp3Lease />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseBasic} color="primary">
                        Cancel
          </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showModelPremium}
                onClose={handleClosePremium}
                scroll={scroll}
                fullscreen={fullscreen}
            >
                <DialogTitle id='scroll-dialog-title'>License Preview</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <WavLease />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePremium} color="primary">
                        Cancel
          </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showModelTrackout}
                onClose={handleCloseTrackout}
                scroll={scroll}
                fullscreen={fullscreen}
            >
                <DialogTitle id='scroll-dialog-title'>License Preview</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <TrackoutLease />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseTrackout} color="primary">
                        Cancel
          </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={showModelUnlimited}
                onClose={handleCloseUnlimited}
                scroll={scroll}
                fullscreen={fullscreen}
            >
                <DialogTitle id='scroll-dialog-title'>License Preview</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <TrackoutLease />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUnlimited} color="primary">
                        Cancel
          </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={showModelExclusive}
                onClose={hanldeCloseExclusive}
                scroll={scroll}
                fullscreen={fullscreen}
            >
                <DialogTitle id='scroll-dialog-title'>License Preview</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <ExclusiveLease />
                </DialogContent>
                <DialogActions>
                    <Button onClick={hanldeCloseExclusive} color="primary">
                        Cancel
          </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default Pricing