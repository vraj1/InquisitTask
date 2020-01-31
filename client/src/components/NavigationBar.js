import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
class Home extends Component {
    logOut(e){
        e.preventDefault();
        localStorage.removeItem('userToken');
        this.props.history.push('/');
    } 
    render() {
        
        const signUpLinks = (
        
            <ul className="navbar-nav justify-content-centre">
                <li className="nav-item">
                    <Link to ="/login" className="nav-link"> Login </Link> 
                </li>
                <li className="nav-item">
                    <Link to ="/register" className="nav-link"> Register </Link> 
                </li>
            </ul>
        )

        const signedInLink = (
            <ul className="navbar-nav justify-content-centre">
                <li className="nav-item">
                    <Link to ="/profile" className="nav-link"> My Profile </Link> 
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">Logout</a> 
                </li>
            </ul>
        )

        return (
        <nav className="navbar navbar-expand-md">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-md-center" id="navbarText">
              <ul className="navbar-nav">
                <li className="nav-item">
                 <Link to ="/" className="nav-link"> Home </Link>
                </li>  
              </ul>
              {localStorage.userToken ? signedInLink: signUpLinks}
            </div>
        </nav>
        )
    }
}

export default withRouter(Home)