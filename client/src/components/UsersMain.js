import React, { Component } from 'react'
import { getProfile, getAllUsers, connectUser, schedulePhoneCall, getConnectedUserInfo , cancelPhoneCall} from './APICalls'
import './UsersMain.css'
import NavigationBar from './NavigationBar';
import { runInThisContext } from 'vm'
class UsersMain extends Component {
    constructor(){
        super()
        this.state ={
            id: '',
            username:'',
            email: '',
            connected_users: '',
            phone_calls_date: '',
            phone_calls_time:'',
            allUser: [],
            currClickedUser: '',
            phoneCallDateTime: '',
            connectedUserName: '',
        }

        this.connectwithUser = this.connectwithUser.bind(this);
        this.schedulePhoneCall = this.schedulePhoneCall.bind(this);
        this.onChange = this.onChange.bind(this);
        this.cancelPhoneCall = this.cancelPhoneCall.bind(this);
    }

    componentDidMount(){
        getProfile().then(res => {
            this.setState({
                id: res.user.id,
                username: res.user.username,
                email: res.user.email,
                connected_users: res.user.connected_users,
                phone_calls_date: res.user.phone_calls_date,
                phone_calls_time: res.user.phone_calls_time,
            })
            console.log(this.state)
        }).then(dataNeeded => {
            console.log(this.state.connected_users)
            const connectedUser = {
                id: this.state.connected_users
            }
            
            getConnectedUserInfo(connectedUser).then(res => {

                this.setState({
                    connectedUserName: res.currConnectedUser + ' ' + res.currConnectedUserLastName
                });

               
            }).catch(err => {
                console.log(err);
            })
        })
        getAllUsers().then(res =>{
            console.log(res.allUsers.filter(users => users.id != this.state.id));
           
            
            this.setState({
                allUser: res.allUsers.filter(users => users.id != this.state.id)
            })
        }).catch(err => {
            console.log(err)
        })
        
        

    }
    
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    connectwithUser(e){
        e.preventDefault();
        
        const connecttoUser = e.target.value
        if(connecttoUser == this.state.connected_users){
            alert('You are already connected to this user');
            return;
        }
        this.setState({
            currClickedUser: connecttoUser
        })
        const currUser = {
            id: this.state.id,
            connected_user_id: connecttoUser
        }
        connectUser(currUser).then(res => {
            console.log(res);
            this.setState({
                connected_users: connecttoUser
            })
            alert('You are connected!')
        })
    }

    schedulePhoneCall(e){
        e.preventDefault()
        console.log(e.target.dateTime.value)
        const phoneDateTime = e.target.dateTime.value;
        const phoneDate = phoneDateTime.split('T')[0];
        const phoneTime = phoneDateTime.split('T')[1]
        console.log(phoneDateTime.split('T')[0]);
        console.log(phoneDateTime.split('T')[1]);
        const newPhoneCall = {
            id: this.state.id,
            phone_date: phoneDate,
            phone_time: phoneTime
        }

        schedulePhoneCall(newPhoneCall).then(res => {
            console.log(res);
            this.setState({
                phone_calls_date: phoneDate,
                phone_calls_time: phoneTime
            })
            alert('Your phone call has been scheudled!');
        })


    }

    cancelPhoneCall(e){
        e.preventDefault()
        const phoneCallCancel = {
            id: this.state.id,
            connected_user: this.state.connected_users
        }
        cancelPhoneCall(phoneCallCancel).then(res => {
            console.log(res);
            this.setState({
                phone_calls_date: '',
                phone_calls_time: ''
            })
            alert('Your Phone call has been cancelled');
        })

    }

    
    
    render() {
        const showConnections = (
            <div id="connectionsDislpay" className="container">
                <p className="card-text">{'You are connected to ' + this.state.connectedUserName}.</p>
                <p className="card-text">{this.state.phone_calls_date ? 'You have a call at ' + this.state.phone_calls_date + ' ' + 'at ' + this.state.phone_calls_time : 'Scehdule a call by clicking the button below'}</p>
            </div>
        )

        const scheduleNewPhoneCall = (
            <div id="accordion">
            <div id="mainScheduler" className="card">
                <div className="card-header" id="headingTwo">
                    <h5 className="mb-0">
                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        {this.state.phone_calls_date ? 'Edit Date and Time': 'Schedule Phone Call'}
                        </button>
                    </h5>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div className="card-body">
                            <form className="dateTimeForm" noValidate onSubmit={this.schedulePhoneCall}>
                                <label className="dateTimeLabel" htmlFor="datetime-local">Date(yyyy/mm/dd) Time</label>
                                    <input className="dateTimeInput" type="datetime-local" text="Phone Call Date and Time" name="dateTime"/>
                                    
                                    <input className="dateTimeSubmit" type="submit"/>
                            </form>
                    </div>
                </div>
            </div>
            </div>
                
           
        
       )

       const cancelPhoneCall = (
        <button onClick={this.cancelPhoneCall}type="submit" className="btn btn-primary">Cancel Scheduled Call</button>
       )

    return (
            
            <div id="mainContainer" className="container">
                <div id="profileSection" id ="profileCard" className="card text-center">

                    <div className="card-body">
                        <h5 id="mainprofileTitle" className="card-title">{'Welcome ' + this.state.username}</h5>
                        {this.state.connected_users ? showConnections: 'If you wish to connect to someone please choose from below'}
                        {this.state.phone_calls_date ? scheduleNewPhoneCall: scheduleNewPhoneCall}
                        {this.state.phone_calls_date? cancelPhoneCall: ''}
                    </div>

                </div>

                <div className="card-group">
                    <div id="allUsersTable">All Users </div>

                {this.state.allUser.map((item, key) => {
                        return(

                            <div className="card"  key={key}>
                                <div className="card-body text-center" key={key}>
                                    <h5 className="card-title">{item.first_name +  ' ' + item.last_name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{item.username}</h6>
                                    <p className="card-text">
                                        Some quick example text to build on the card title and make up the bulk of the card's content.
                                    </p>
                                    <button onClick={this.connectwithUser} value={item.id} type="submit" className="btn btn-primary">Connect to User</button>
                                    
                                </div>

                            </div>
                        )
                })}
                </div>
            </div> 
        )
    }
}

export default UsersMain