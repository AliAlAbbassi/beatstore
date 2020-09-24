import React, { useState, useEffect } from 'react'
import Store from '../components/Store'
import { useInfiniteQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { termState } from '../atoms'
import lunr from 'lunr'
import { urlState } from '../atoms'
import Footer from '../components/Footer'
import Amplify, { API } from 'aws-amplify'
import awsExports from '../aws-exports'

Amplify.configure(awsExports)

const Beatstore = () => {
    const [term, setTerm] = useRecoilState(termState)
    const [URL] = useRecoilState(urlState)
    const {
        status,
        data,
        error
    } = useInfiniteQuery(URL, fetchBeats, {
        getFetchMore: (lastGroup, allGroups) => lastGroup.nextCursor,
    })
    const [beats, setBeats] = useState([])

    const index = lunr(function () {
        this.field('name')
        this.field('beatTagsSEO')
        this.ref('id')
        this.b(1)
        if (data) {
            data[0].data.map(beat => {
                this.add(beat)
                return null
            })
        }
    })

    // const [store, setStore] = useState([])
    // useEffect(() => {
    //     if (data) {
    //         setStore(data[0].data)
    //     }
    // }, [data])

    // useEffect(() => {
    //     console.log(store)
    // }, [store])

    // const [query, setQuery] = useState(null)
    // const results = useLunr(query, index, store)


    // useEffect(() => {
    //     console.log(results)
    // }, [results])

    const handleSearchChange = (e) => {
        setTerm(e.target.value)
    }

    useEffect(() => {
        const handleSearch = (term) => {
            let results = []
            const searchResults = index.search(`${term}~1`)
            searchResults.map(res => {
                data[0].data.map(beat => {
                    if (beat.id === res.ref) {
                        results.push(beat)
                    }
                    return null
                })
                return null
            })
            return results
        }
        if (data) {
            setBeats(data[0].data)
            console.log(data[0].data)
        }
        if (term !== '') {
            setBeats(handleSearch(term))
        }
        if (term === '') {
            if (data) {
                setBeats(data[0].data)
            }
        }
    }, [data, term])

    return (
        <div className='beatStoreContainer'>
            <h1 style={{ color: 'white' }} className='text-6xl lg:text-3xl font-semibold text-center mt-20 lg:mt-16'>BEATS</h1>
            <div className='grid justify-center'>
                <section className="" style={{ width: '800px' }}>
                    <div className="container mx-auto py-8">
                        <input value={term} onChange={handleSearchChange} className="w-full h-16 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg text-black text-center" type="search" placeholder="What type of track are you looking for?">
                        </input>
                    </div>
                </section>
            </div>
            <Store beats={beats} status={status} error={error} />
        </div>
    )
}

const fetchBeats = async (URL) => {
    const res = await API.get(`/beatstore/api/beats`)
    return res.json()
}


export default Beatstore