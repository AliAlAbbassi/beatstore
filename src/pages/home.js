import React, { useState, useEffect } from 'react'
import Store from '../components/Store'
import { useRecoilState } from 'recoil'
import { useQuery } from 'react-query'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Pricing from '../components/Pricing'
import history from '../history'
import { termState } from '../atoms'
import ContactMe from '../components/ContactMe'
import { connect } from 'react-redux'
import { urlState } from '../atoms'
import Footer from '../components/Footer'
import { API } from 'aws-amplify'

const Home = ({ auth }) => {
    // const setMount = useSetRecoilState(mountState)
    const [limit] = useState(10)
    const [URL] = useRecoilState(urlState)
    const { data, status, isLoading } = useQuery([limit, URL], fetchBeatsWLimit)
    const [beats, setBeats] = useState([])
    const [term, setTerm] = useRecoilState(termState)


    useEffect(() => {
        if (data) {
            setBeats(data.data)
        }
        if (term !== '') {
            setBeats(handleSearch(term))
        }
        if (term === '') {
            if (data) {
                setBeats(data.data)
            }
        }
        if (!auth.user && auth.isAuthenticated) {
            window.location.reload(false)
        }
    }, [data, term, auth])

    const handleSearch = (term) => {
        // const nameResults = searchEngine(data.data, `@name:${term}`)
        // const results = appendAndRemoveDuplicates(typeBeatResults, nameResults)
        return ''
    }
    const handleSearchChange = (e) => {
        setTerm(e.target.value)
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            history.push('/beatstore')
        }
    }
    return (
        <div className='homeContainer'>
            <section className="searchBar">
                <div className="container mx-auto py-8">
                    <input onChange={handleSearchChange} value={term} onKeyDown={handleKeyDown} className="w-full h-16 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg" type="search" placeholder="What type of track are you looking for?">
                    </input>
                </div>
            </section>
            <div className='hardestProducer'>
                <h1 className='text-5xl text-left mb-3'>CUTHLEHOOP BEATS</h1>
                <p className='text-gray-300 text-xl ml-1'>Hardest hiphop producer in the game. Also, likes samurai and anime lol</p>
            </div>
            <img alt='background' src='/samurai bg.svg' className='homePage' />
            <div className='storeContainer'>
                <h1 style={{ color: 'white' }} className=' text-6xl lg:text-3xl font-semibold font-body text-center mt-20 lg:mt-16'>BEATS</h1>
                {beats && (
                    <Store beats={beats} status={status} isLoading={isLoading} />
                )}
            </div>
            <div className='grid justify-center'>
                <div className='mt-2 lg:mt-0'>
                    <Link className='no-underline hover:no-underline hover:text-black text-black ' to='/beatstore'>
                        <Button className='buttonBrowseAllTracks'>
                            <p className='text-4xl lg:text-lg'>
                                Browse All Tracks
                            </p>
                        </Button>
                    </Link>
                </div>
            </div>
            <Pricing />
            <ContactMe />
            <Footer />
        </div >
    )
}

const fetchBeatsWLimit = async (limit, URL) => {
    const res = await API.get('beatstoreapi', `/beatstore/api/beats/?limit=${limit}`)
    return res
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Home)