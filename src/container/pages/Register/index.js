import React, {
    Component
} from 'react'
import './Register.scss'
import firebase from '../../../config/firebase'

class Register extends Component {

    state = {
        email: '',
        password: ''
    }
    //!handle change text -> merubah value utk text
    handleChangeText = (e) => {
        // console.log(e.target.id);
        this.setState({
            [e.target.id]: e.target.value

        })
    }

    handleRegisterSubmit = () => {
        console.log('Email :', this.state.email)
        console.log('Password :', this.state.password)

        const { email, password } = this.state;
        console.log('Data Sebelum:', email, password);
        //
        firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
            console.log('Success: ', res);
        })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorCode, errorMessage);
            });
    }

    render() {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title"> Register Page </p>
                    <input className="input" id="email" type="text" placeholder="Email" onChange={this.handleChangeText} />
                    <input className="input" id="password" type="password" placeholder="Password" onChange={this.handleChangeText} />
                    <button className="btn" onClick={this.handleRegisterSubmit}> Register </button>

                </div>
            </div>
        )
    }
}

export default Register;