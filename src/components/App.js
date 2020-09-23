import React, { useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import home from '../pages/home'
import Beatstore from '../pages/beatstore'
import cart from '../pages/Cart'
import NavBar from '../components/NavBar'
import MyBeats from '../components/MyBeats'
import history from '../history'
import { ReactQueryDevtools } from 'react-query-devtools'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'
import '../styles/index.css'
import { RecoilRoot } from 'recoil'
import { Provider } from 'react-redux'
import store from '../store'
import { loadUser } from '../actions/authActions'
import Register from './Register'
import Login from './Login'
import MakeAnOffer from './MakeAnOffer'
import Pricing from './Pricing'
import ContactMe from './ContactMe'
import BeatHome from './BeatHome'
import awsExports from '../aws-exports'
import Amplify from 'aws-amplify'

Amplify.configure(awsExports)

const App = () => {
    useEffect(() => {
        if (localStorage.getItem('token'))
            store.dispatch(loadUser())
    }, [])
    return (
        <RecoilRoot>
            <Provider store={store}>
                <Router history={history}>
                    <div>
                        <NavBar />
                        <Switch>
                            <Route path='/' exact component={home} />
                            <Route path='/beatstore' exact component={Beatstore} />
                            <Route path='/cart' exact component={cart} />
                            <Route path='/register' exact component={Register} />
                            <Route path='/login' exact component={Login} />
                            <Route path='/makeanoffer' exact component={MakeAnOffer} />
                            <Route path='/pricing' exact component={Pricing} />
                            <Route path='/contactme' exact component={ContactMe} />
                            <Route path='/beatHome/:id' exact component={BeatHome} />
                            <Route path='/mybeats' exact component={MyBeats} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </RecoilRoot>
    )
}


export default App