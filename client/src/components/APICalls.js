import axios from 'axios';
//register
export const register = newUser => {
    return axios.post('api/register', newUser, {
        headers: {'Content-type':'application/json'}
    }).then(res=> {
        console.log(res)
        if(!res.ok){
            return(res)
        }
        return(res)
    }).catch(err => {
        console.log(err)
        return(err);
    })
}


//login
export const login = user => {
    return axios.post('api/login',{
        username: user.username,
        password: user.password
    }, {headers: {'Content-type': 'application/json' }}
    ).then(res =>{
        localStorage.setItem('userToken',res.data.token)
        if(!res.data.token){
            console.log(res.data.status)
            return(res.data.error)
        }
        console.log(res.data)
        return res.data
    }).catch(err =>{
        console.log(err)
        return err
    })
}

//getUser profile
export const getProfile = () => {
    return axios.get('api/profile',{
        headers: {Authorization: `Bearer ${localStorage.userToken}`}
    }).then(res =>{
        console.log(res.data)
        return res.data
    }).catch(err => {
        console.log(err)
    })
}

export const getAllUsers = () => {
    return axios.get('api/allUsers',{
        headers: {Authorization: `Bearer ${localStorage.userToken}`}
    }).then(res =>{
        console.log(res.data)
        const data = JSON.stringify(res.data)
        return JSON.parse(data);
    }).catch(err => {
        console.log(err)
    })
}

export const getConnectedUserInfo = user => {
    return axios.post('api/connectedUserInfo',user,{
        headers: {Authorization: `Bearer ${localStorage.userToken}`}
    }).then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
}

export const connectUser = user => {
    return axios.post('api/profile',user,{
        headers: {Authorization: `Bearer ${localStorage.userToken}`}
    }).then(res =>{
        console.log(res.data)
        return res.data
    }).catch(err => {
        console.log(err)
    })
}

export const schedulePhoneCall = callDetails => {
    return axios.post('api/scheduleCall',callDetails,{
        headers: {Authorization: `Bearer ${localStorage.userToken}`}
    }).then(res =>{
        console.log(res.data)
        return res.data
    }).catch(err => {
        console.log(err)
    })
}

export const cancelPhoneCall = userDetails => {
    return axios.post('api/cancelCall',userDetails,{
        headers: {Authorization: `Bearer ${localStorage.userToken}`}
    }).then(res =>{
        console.log(res.data)
        return res.data
    }).catch(err => {
        console.log(err)
        return err
    })
}





