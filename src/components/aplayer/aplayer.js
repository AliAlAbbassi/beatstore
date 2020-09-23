import React from 'react';
import ReactAplayer from './react-aplayer';
import './app.css';
import '../../styles/beat.css'

// import create from 'zustand'
// import produce from 'immer'

export const APlayer = ({ beats }) => {



    let apLrcList = {
        theme: '#F57F17',
        lrcType: 3,
        audio: []
    }
    let apFixedLrcList = {
        lrcType: 3,
        fixed: true,
        mini: true,
        audio: []
    }
    beats.map(beat => {
        apLrcList.audio.push({
            name: beat.name,
            artist: beat.artist,
            url: beat.mp3 || beat.wav,
            cover: beat.cover,
            theme: beat.theme
        })
        apFixedLrcList.audio.push({
            name: beat.name,
            artist: beat.artist,
            url: beat.url,
            cover: beat.cover,
            theme: beat.theme
        })
        return null
    })

    return (
        <div>
            <div className='containerBar'>
                <div className='d-flex justify-content-end'>
                    <button className='addtocart' onClick={() => {
                    }}>Add '' to Cart</button>
                </div>
            </div>
            {/* <div className='d-flex justify-content-center'>
            </div> */}

            <div className="landing">
                <div className="aplayer-wrap">
                    {/* example with detailed props */}
                    <ReactAplayer
                        {...apLrcList}
                        onPlay={(ap) => {

                        }}
                    />

                    {/* example of access aplayer instance API */}
                    {/* <span className="footer">
                        {' '}
            click button to try player control {' '}
                    </span>
                    <button onClick={() => this.ap1.toggle()}>toggle()</button> */}
                </div>
                {/* example with deconstructing props */}
                <ReactAplayer {...apFixedLrcList} />

            </div>

        </div >
    );
}





export default APlayer



