import { atom } from 'recoil'

export const cartBeatState = atom({
    key: 'cartBeatState',
    default: []
})

export const isSignedIn = atom({
    key: 'loginState',
    default: false
})

export const isRegisteredState = atom({
    key: 'registerState',
    default: false
})

export const selectedTrackState = atom({
    key: 'options',
    default: {}
})

export const mountState = atom({
    key: 'mountState',
    default: true
})

export const isCartModelOpen = atom({
    key: 'isCartModelOpen',
    default: false
})
export const termState = atom({
    key: 'term',
    default: ''
})

export const urlState = atom({
    key: 'url',
    default: 'http://beatstore-api-dev.us-west-2.elasticbeanstalk.com'
})
