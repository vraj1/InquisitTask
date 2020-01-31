import React, { Component } from 'react'
import {login} from './APICalls'
import { Link } from 'react-router-dom';
import './Login.css';
class Login extends Component {
    constructor(){
        super()
        this.state = {
            username:'',
            password:'',
            errors:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit =this.onSubmit.bind(this)
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e){
        e.preventDefault()

        const newuser = {
            username: this.state.username,
            password: this.state.password
        }
        login(newuser).then(res => {
            console.log(res);
            if(!res.token){
                console.log(res.data);
                this.setState({
                    errors: 'Login Credentials inncorrect'
                })
                this.props.history.push('/login')
                return '';
            }
            
            this.props.history.push('/profile');
        }).catch(err => {
            alert(err);
            this.props.history.push('/login')
        })
    }
    render() {
        return (
            <div className="FormCenter">
                
                    <form className="FormFields" noValidate onSubmit={this.onSubmit}>
                        
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="username">User Name</label>
                            <input className="FormField__Input" type="text" name="username" placeholder="example1" value={this.state.username} onChange={this.onChange}/>
                        </div>

                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="password">Password</label>
                            <input className="FormField__Input" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
                        </div>

                        <div className="FormField"> 
                            <button type="submit" className="FormField__Button mr-20">Login</button><Link to="/register" className="FormField__Link">Create an account</Link>
                            {this.state.errors ? <div className="FormFieldError">Username or Password inccorect</div>: ''}
                        </div>
                       
                    </form>
                

            </div>
        )
    }
}

export default Login