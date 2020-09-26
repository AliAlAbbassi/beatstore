import React, { useEffect, useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useForm } from "react-hook-form"

const MakeAnOffer = ({ location }) => {
    const { state } = location
    useEffect(() => {
        console.log(location)
    })
    const matches = useMediaQuery('(min-width:1024px)');

    const [beat] = useState(state.beat)

    const { register, handleSubmit } = useForm()
    const onSubmit = data => console.log(data)

    if (matches) {
        return (
            <div className='grid justify-center mt-5'>
                <h1 className='text-left lg:text-3xl mt-24'>Create a New Offer</h1>
                <div className='text-white lg:flex w-full'>
                    <div>
                        <div className='flex'>
                            <img src={beat.cover} className='object-cover cursor-pointer w-20 h-20 rounded mt-4' alt='beat cover' />
                            <p className='text-white mt-5 ml-3 text-xl'>{beat.name}</p>
                        </div>

                        <form className='flex' onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex'>
                                <div className='mr-3'>
                                    <p className='text-sm mt-4 mb-1'>SELECT A LICENSE</p>
                                    <div className="inline-block relative w-64">
                                        <select name='license' ref={register} className="block appearance-none w-full bg-black bg-opacity-75 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                            <option value='Exclusive'>Exclusive (MP3, WAV and TRACK STEMS)</option>
                                            <option value='Unlimited'>Unlimited Lease (MP3, WAV and TRACK STEMS)</option>
                                            <option value='WAV Trackouts'>WAV Trackouts Lease (MP3, WAV and TRACK STEMS)</option>
                                            <option value='WAV'>Master WAV Lease (MP3 and WAV)</option>
                                            <option value='MP3'>MP3 Lease (MP3)</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className='text-sm mt-4 mb-1'>PUBLISHING PERCENT</p>
                                    <div className="inline-block relative w-64">
                                        <select name='publishing' ref={register({ required: true })} className="block appearance-none w-full bg-black bg-opacity-75 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                            <option value='50'>Default 50%</option>
                                            <option value='100'>100%</option>
                                            <option value='95'>95%</option>
                                            <option value='90'>90%</option>
                                            <option value='85'>85%</option>
                                            <option value='80'>80%</option>
                                            <option value='75'>75%</option>
                                            <option value='70'>70%</option>
                                            <option value='65'>65%</option>
                                            <option value='60'>60%</option>
                                            <option value='55'>55%</option>
                                            <option value='50'>50%</option>
                                            <option value='45'>45%</option>
                                            <option value='40'>40%</option>
                                            <option value='35'>35%</option>
                                            <option value='30'>30%</option>
                                            <option value='25'>25%</option>
                                            <option value='20'>20%</option>
                                            <option value='15'>15%</option>
                                            <option value='10'>10%</option>
                                            <option value='5'>5%</option>
                                            <option value='0'>0%</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='border rounded ml-5 mt-2'>
                        <div className='m-3'>
                            <p className='text-sm'>AUTO-EXPIRE THIS OFFER</p>
                            <div className="inline-block relative w-64">
                                <select name='expireDate' ref={register({ required: true })} className="block appearance-none w-full bg-black bg-opacity-75 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                    <option value='3'>3 Days from Today</option>
                                    <option value='7'>7 Days from Today</option>
                                    <option value='14'>14 Days from Today</option>
                                    <option value='21'>21 Days from Today</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>

                            <p className='text-sm mt-2'>OFFER AMOUNT</p>
                            <input name='offerAmount' ref={register({ min: 200 })} className='shadow appearance-none border rounded w-full text-gray-500 mb-2 leading-tight focus:outline-none focus:shadow-outline pb-2' />
                            <div className='grid justify-center'>
                                <p className='text-xs'>Required minimum offer amount is $200.00</p>
                                <button type='submit' className='buttonSendOffer text-black hover:text-black text-center w-3/4 pt-1 pb-1'>SEND OFFER</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='grid w-10/12 m-auto'>
            <p className='text-white text-6xl mt-64 text-left'>Create a New Offer</p>
            <div className='mt-5 flex'>
                <img src={beat.cover} className='object-cover cursor-pointer w-48 h-48 rounded-lg' alt='beat cover' />
                <p className='text-white text-5xl ml-3 mt-5'>{beat.name}</p>
            </div>
            <div>
                <p className='text-white text-5xl mt-5 mb-2'>SELECT A LICENSE</p>
                <div className="inline-block relative text-white w-full">
                    <select name='license' ref={register({ required: true })} className="block appearance-none w-full bg-black bg-opacity-75 border border-gray-400 hover:border-gray-500 text-4xl pb-4 pt-4 px-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value='Exclusive'>Exclusive (MP3, WAV and TRACK STEMS)</option>
                        <option value='Unlimited'>Unlimited Lease (MP3, WAV and TRACK STEMS)</option>
                        <option value='WAV Trackouts'>WAV Trackouts Lease (MP3, WAV and TRACK STEMS)</option>
                        <option value='WAV'>Master WAV Lease (MP3 and WAV)</option>
                        <option value='MP3'>MP3 Lease (MP3)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            </div>
            <div>
                <p className='text-white text-5xl mt-5'>PUBLISHING PERCENT</p>
                <div className="inline-block relative w-full">
                    <select name='publishing' ref={register({ required: true })} className="block appearance-none text-white text-4xl w-full bg-black bg-opacity-75 border border-gray-400 hover:border-gray-500 px-2 pt-4 pb-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value='50'>Default 50%</option>
                        <option value='100'>100%</option>
                        <option value='95'>95%</option>
                        <option value='90'>90%</option>
                        <option value='85'>85%</option>
                        <option value='80'>80%</option>
                        <option value='75'>75%</option>
                        <option value='70'>70%</option>
                        <option value='65'>65%</option>
                        <option value='60'>60%</option>
                        <option value='55'>55%</option>
                        <option value='50'>50%</option>
                        <option value='45'>45%</option>
                        <option value='40'>40%</option>
                        <option value='35'>35%</option>
                        <option value='30'>30%</option>
                        <option value='25'>25%</option>
                        <option value='20'>20%</option>
                        <option value='15'>15%</option>
                        <option value='10'>10%</option>
                        <option value='5'>5%</option>
                        <option value='0'>0%</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            </div>

            <div className='border rounded mt-5'>
                <div className='m-3'>
                    <p className='text-5xl text-white'>AUTO-EXPIRE THIS OFFER</p>
                    <div className="inline-block relative w-full">
                        <select name='expireDate' ref={register({ required: true })} className="block appearance-none w-full text-4xl text-white bg-black bg-opacity-75 border border-gray-400 hover:border-gray-500 px-4 pt-4 pb-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option value='3'>3 Days from Today</option>
                            <option value='7'>7 Days from Today</option>
                            <option value='14'>14 Days from Today</option>
                            <option value='21'>21 Days from Today</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>

                    <p className='text-5xl text-white mt-3 mb-2'>OFFER AMOUNT</p>
                    <input name='offerAmount' ref={register({ min: 200 })} className='shadow appearance-none border rounded text-4xl w-full text-black mb-2 leading-tight focus:outline-none focus:shadow-outline pb-3 pt-3' />
                    <div className='grid justify-center'>
                        <p className='text-2xl text-white'>Required minimum offer amount is $200.00</p>
                        <button type='submit' className='buttonSendOffer text-black hover:text-black text-center text-5xl w-3/4 pt-2 pb-2'>SEND OFFER</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default MakeAnOffer