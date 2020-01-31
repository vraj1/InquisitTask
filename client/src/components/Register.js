import React, { Component } from 'react'
import {register} from './APICalls'
import {Link} from 'react-router-dom';

class Register extends Component {
    constructor(){
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email:'',
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
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }
        register(newuser).then(res => {
            console.log(res.status);
            if(!res.data.token){
                this.setState({
                    errors: 'Incomplete form'
                })
                this.props.history.push('/register');
                
                return '';
            }
            this.props.history.push('/login') 
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            <div className="FormCenter">
                
                    <form noValidate className="FormFields" onSubmit={this.onSubmit}>
                        
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="first_name">First Name</label>
                            <input className="FormField__Input" type="text" name="first_name" placeholder="First Name" value={this.state.first_name} onChange={this.onChange}/>
                        </div>

                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="last_name">Last Name</label>
                            <input className="FormField__Input" type="text" name="last_name" placeholder="Last Name" value={this.state.last_name} onChange={this.onChange}/>
                        </div>

                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="email">email</label>
                            <input className="FormField__Input" type="email" name="email" placeholder="youremail@example.com" value={this.state.email} onChange={this.onChange}/>
                        </div>

                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="username">User Name</label>
                            <input className="FormField__Input" id="userNameInput" type="text" name="username" placeholder="example1" value={this.state.username} onChange={this.onChange}/>
                        </div>

                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="password">Password</label>
                            <input className="FormField__Input" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
                        </div>

                        <div className="FormField">
                        <button type="submit" className="FormField__Button">Register</button> <Link to="/login" className="FormField__Link">I'm already member</Link>
                        {this.state.errors ? <div className="FormFieldError">Please fill in the required fields to register</div>: ''}
                        </div>
                    </form>
                

            </div>
        )
    }
}

export default Register