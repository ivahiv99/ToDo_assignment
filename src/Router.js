import React, {Component} from 'react';
import { Switch, Route , Redirect } from 'react-router-dom';
import LogIn from './components/Authorithation/LogIn';
import SingUp from './components/Authorithation/SingUp';
import App from './App';


class Router extends Component{
    render(){
        return(
          <Switch>
              <ForAuthorized    isAuthorized={this.props.isAuthorized}  path='/home'   component={App}/>
              <ForUnauthorized  isAuthorized={this.props.isAuthorized}  path='/logIn'  component={LogIn}/>
              <ForUnauthorized  isAuthorized={this.props.isAuthorized}  path='/signUp' component={SingUp}/>
              <OtherRoutes isAuthorized={this.props.isAuthorized} />
          </Switch>
        );
    }
}

class OtherRoutes extends Router{
    render() {
        // console.log(` higher order component: this.state.isAuthenticated = ${this.props.isAuthorized}`);
        return this.props.isAuthorized
            ? <Redirect to='/home'/> //hack
            : <Redirect to='/signUp'/>
            ;
    }
}

class ForAuthorized extends Router{
    render() {
        // console.log(` higher order component: this.state.isAuthenticated = ${this.props.isAuthorized}`);
        return this.props.isAuthorized
            ? <Route path='/home' component={App} test={'hello there'}/> //hack
            : <Redirect to='/signUp'/>
        ;
    }
}
class ForUnauthorized extends Router{
    render() {
        const path = this.props.path;
        const  component = this.props.component;
        // console.log(` higher order component: this.state.isAuthenticated = ${this.props.isAuthorized}`);
        return this.props.isAuthorized
            ? <Redirect to='/home'/> //hack
            : <Route path={path} component={component} />
            ;
    }
}

export default Router;