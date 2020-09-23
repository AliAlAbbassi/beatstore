import React, { useState, useEffect } from 'react'
import { usePaginatedQuery } from 'react-query'
import APlayer from '../components/aplayer/aplayer'
import Beat from './Beat'
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { render } from 'node-sass';
import { Button } from 'react-bootstrap';


class Store extends React.PureComponent {
    constructor(props) {
        super(props)
        this.audio = {}
    }

    state = {
        unmount: false,
        params: {
            ...options,
            getAudioInstance: (audio) => {
                this.audio = audio
            },
        },
    }

    // if(beats) {
    //     beats.map(beat => {
    //         newOptions.audioLists.push({
    //             name: beat.name,
    //             musicSrc: beat.mp3 || beat.wav,
    //             cover: beat.cover,
    //             singer: beat.artist
    //         })
    //     })
    // }

    unmountPlayer = () => {
        this.setState({ unmount: true })
    }

    changePlayIndex = () => {
        this.updateParams({
            playIndex: createRandomNum(0, this.state.params.audioLists.length - 1),
        })
    }

    updateParams = (params) => {
        const data = {
            ...this.state.params,
            ...params,
        }
        this.setState({
            params: data,
        })
    }

    // useEffect(() => {
    //     if (instance) {
    //         instance.load()
    //     }
    //     setOptions({
    //         audioLists: [],
    //         theme: 'dark',
    //         locale: 'en_US',
    //         defaultPosition: { top: 0, left: 0 },
    //         mode: 'full',
    //         autoPlay: false,
    //         playIndex: 0
    //     })

    //     // setOptions({ ...newOptions, playIndex: findTrackIndex(selectedTrack[0], newOptions.audioLists) })
    //     newOptions.playIndex = findTrackIndex(selectedTrack[0], newOptions.audioLists)
    //     console.log(selectedTrack[0])
    //     console.log(findTrackIndex(selectedTrack[0], newOptions.audioLists))
    //     console.log(newOptions.audioLists)
    //     console.log(newOptions.playIndex)

    // }, [selectedTrack[0]])

    render() {
        return (
            <div>
                {status === 'loading' && (
                    <div style={{ marginTop: '100px', color: 'white', justifyContent: 'center' }}>Loading data...</div>
                )}

                {status === 'error' && (
                    <div style={{ marginTop: '100px' }}>Error fetching data</div>
                )}

                {status === 'success' && (
                    <div>
                        <div style={{ marginTop: '50px' }} className='grid grid-cols-8'>
                            <p style={{
                                color: 'white',
                                fontStyle: 'bold',
                                marginLeft: '70px'
                            }}
                                className='col-start-3'
                            >TITLE</p>
                            <p style={{
                                color: 'white',
                                fontStyle: 'bold',
                                marginLeft: '10px'
                            }}
                                className='col-start-5'
                            >BPM</p>

                            <p style={{
                                color: 'white',
                                fontStyle: 'bold',
                                marginLeft: '-85px'
                            }}
                                className='col-start-6 col-end-6'
                            >TAGS</p>
                        </div>
                        <div>
                            {beats.data.map(beat => <Beat key={beat.name} beat={beat} />)}
                        </div>

                        <ReactJkMusicPlayer
                            {...newOptions}
                            getAudioInstance={(instance) => setInstance(instance)}
                            onPlayIndexChange={(playIndex) => {
                                // setOptions({ ...newOptions, playIndex })
                                console.log(playIndex)
                            }}
                        />

                        <Button onClick={() => {
                            this.audio.updatePlayIndex(1)
                        }} >update play index</Button>

                        {/* <div>
                            <APlayer beats={resolvedData.data} />
                        </div> */}

                        {/* <div className='nextprev'>
                            <button
                                onClick={() => setPage(old => Math.max(old - 1, 1))}
                                disabled={page === 1}
                            >Previous page
                        </button>
                            <span>{page}</span>
                            <button
                                onClick={() => setPage(old => (!latestData || !latestData.next ? old : old + 1))}
                                disabled={!latestData || !latestData.next}
                            >Next page</button>
                        </div> */}
                    </div>
                )
                }
            </div >
        )
    }
}

const options = {
    audioLists: [],
    theme: 'dark',
    locale: 'en_US',
    defaultPosition: { top: 0, left: 0 },
    mode: 'full',
    autoPlay: false,
    playIndex: 0,
    getAudioInstance(audio) {
        console.log('audio instance', audio)
    },
    onAudioPlayTrackChange(currentPlayId, audioLists, audioInfo) {
        console.log(
            'audio play track change:',
            currentPlayId,
            audioLists,
            audioInfo,
        )
    }
}



function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
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

export default Store