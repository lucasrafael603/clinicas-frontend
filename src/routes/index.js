import React from 'react'
import {Switch, Route} from 'react-router-dom'
import HomeComponent from '../components/index'
import Register from '../components/Register/index'


const Routes = () => {

return (

  <Switch> 
    
    <Route path='/' exact component={HomeComponent} />
    <Route path="/register" component={Register} />

  </Switch>
  )
}

export default Routes