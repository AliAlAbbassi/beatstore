import React from 'react'
import { useForm } from 'react-hook-form'

const ContactMe = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const onSubmit = data => console.log(data)
    console.log(watch('example'))
    return (
        <div className='container justify-center mt-10 lg:mt-5 mb-5' style={{ maxWidth: '800px' }}>
            <form className="w-full mt-20 mb-10" onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-center text-6xl lg:text-5xl mb-5'>Contact Me</h1>
                <div className='lg:flex'>
                    <div className="w-full lg:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-white lg:text-xs text-4xl font-bold mb-2 text-left"
                            htmlFor="grid-first-name"
                        >
                            First Name
      </label>
                        <input
                            className="appearance-none block w-full h-24 lg:h-12 text-3xl lg:text-lg bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            placeholder="Jane"
                            name='nameRequired'
                            ref={register({ required: true })}
                        />
                        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                        {errors.nameRequired && <span className=' text-red-700 px-4 py-3 rounded relative'>Name is required</span>}
                    </div>
                    <div className="w-full lg:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-white lg:text-xs text-4xl font-bold mb-2 text-left"
                            htmlFor="grid-last-name"
                        >
                            Email
      </label>
                        <input
                            className="appearance-none block text-3xl lg:text-lg w-full h-24 lg:h-12 bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="email"
                            type="email"
                            placeholder="Jane@example.com"
                            name='emailRequired'
                            ref={register({ required: true })}
                        />
                        {errors.emailRequired && <span className=' text-red-700 px-4 py-3 rounded relative'>Email is required</span>}
                    </div>
                </div>
                <div className="flex flex-wrap mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-white lg:text-xs text-4xl font-bold mb-2 text-left"
                            htmlFor="grid-password"
                        >
                            Subject
      </label>
                        <input
                            className="appearance-none text-3xl lg:text-lg block w-full h-24 lg:h-12 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="text"
                            type="text"
                            name='subjectRequired'
                            ref={register({ required: true })}
                        />
                        {errors.subjectRequired && <span className='text-red-700 px-4 py-3 rounded relative'>Subject is required</span>}
                        {/* <p className="text-white text-xs italic">
                            Some tips - as long as needed
      </p> */}
                    </div>
                </div>
                <div className="flex flex-wrap mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-white lg:text-xs text-4xl font-bold mb-2 text-left"
                            htmlFor="grid-password"
                        >
                            Message
      </label>
                        <textarea
                            className="no-resize appearance-none block w-full lg:h-32 text-3xl lg:text-lg bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                            id="message"
                            defaultValue={""}
                            name='messageRequired'
                            ref={register({ required: true })}
                        />
                        {errors.messageRequired && <span className=' text-red-700 px-4 py-3 rounded relative'>Message is required</span>}
                        {/* <p className="text-white text-xs italic">
                            Re-size can be disabled by set by resize-none / resize-y / resize-x /
                            resize
      </p> */}
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="lg:w-1/3">
                        <button
                            className="shadow focus:shadow-outline focus:outline-none text-black rounded w-40 h-20 lg:h-12 text-center ml-3 lg:ml-0 lg:mr-20 lg:text-xl text-3xl"
                            type="submit"
                            style={{ backgroundColor: 'rgb(255, 162, 0)' }}
                        >
                            SEND
      </button>
                    </div>
                    <div className="md:w-2/3" />
                </div>
            </form>
        </div >
    )
}

export default ContactMe