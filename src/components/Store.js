import React, { useState, useEffect } from 'react'
import Beat from './Beat'
import { selectedTrackState, cartBeatState, mountState } from '../atoms'
import { useRecoilState, useSetRecoilState } from 'recoil';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { connect } from 'react-redux'
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";

const overrideLg = css`
  display: block;
  margin-top: 100px;
  margin-left: 670px;
`;

const override = css`
    display: block;
    margin-top: 200px;
    margin-left: 400px;
`;


const Store = ({ auth, beats, status, error, isLoading }) => {
    // const { beats, latestbeats, status } = usePaginatedQuery(['beats', page], fetchBeats)
    const selectedTrack = useRecoilState(selectedTrackState)
    const [unmount] = useRecoilState(mountState)
    const setCart = useSetRecoilState(cartBeatState)

    const [newOptions, setOptions] = useState({
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


    if (beats) {
        console.log(beats)
        beats.map(beat => {
            if (!newOptions.audioLists.some(beat2 => beat2.name === beat.name)) {
                newOptions.audioLists.push({
                    name: beat.name,
                    musicSrc: beat.mp3 || beat.wav,
                    cover: beat.cover,
                    singer: beat.artist
                })
            }
            return null
        })
    }


    useEffect(() => {
        setOptions({ ...newOptions, playIndex: findTrackIndex(selectedTrack[0], newOptions.audioLists) })
    }, [selectedTrack[0]])

    useEffect(() => {
        if (auth.user) {
            setCart(auth.user.data.cart)
        }
    }, [auth.user])


    return (
        <div>
            {status === 'loading' && (
                <div>
                    <div className='hidden lg:block'>
                        <PacmanLoader
                            css={overrideLg}
                            size={60}
                            color={"#ffffff"}
                            loading={isLoading}
                        />
                    </div>
                    <div className='block lg:hidden'>
                        <PacmanLoader
                            css={override}
                            size={60}
                            color={"#ffffff"}
                            loading={isLoading}
                        />
                    </div>
                </div>
            )}

            {status === 'error' && (
                <div style={{ marginTop: '100px' }} className='text-white text-center text-4xl' >
                    Error fetching beats
                </div>
            )}
            {status === 'success' && (
                <div>
                    <div className='container mx-auto justify-center mt-5 mb-3 w-20'>
                        <div className='lg:pr-20 lg:pl-0 pl-16'>
                            <p
                                className='titleStyle text-white text-bold lg:mr-2 text-4xl lg:text-xl'
                            >TITLE</p>
                        </div>
                        <p
                            className='bpmTag hidden lg:block text-5xl lg:text-xl'
                        >BPM</p>

                        <p
                            className='tagsStyle text-white text-4xl lg:text-xl'
                        >TAGS</p>
                    </div>

                    <div>
                        {beats.map(beat => <Beat key={beat.name} beat={beat} />)}
                    </div>

                    {unmount ? false : (
                        <ReactJkMusicPlayer
                            {...newOptions}
                            onPlayIndexChange={(playIndex) => {
                                setOptions({ ...newOptions, playIndex })
                            }}
                        />
                    )}

                    {/* <div>
                        <APlayer beats={beats.beats} />
                    </div> */}

                    {/* <div className='nextprev'>
                        <button
                            onClick={() => setPage(old => Math.max(old - 1, 1))}
                            disabled={page === 1}
                        >Previous page
                    </button>
                        <span>{page}</span>
                        <button
                            onClick={() => setPage(old => (!latestbeats || !latestbeats.next ? old : old + 1))}
                            disabled={!latestbeats || !latestbeats.next}
                        >Next page</button>                    </div> */}
                </div>
            )
            }
        </div >
    )
}

const findTrackIndex = (beat, beatList) => {
    if (!beat) {
        return 0
    }

    for (let i = 0; i < beatList.length; i++) {
        if (beatList[i].musicSrc === beat.mp3 || beatList[i].musicSrc === beat.wav) {
            return i
        }
    }

    console.log(beatList)
    return 0
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Store)
