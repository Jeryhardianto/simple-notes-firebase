import React, {
    Component
} from 'react'
import './Register.scss'
import firebase from '../../../config/firebase'
import Button from '../../../components/atoms/Button'
import { connect } from 'react-redux'
import { registerUserAPI } from '../../../config/redux/action'

class Register extends Component {

    state = {
        email: '',
        password: '',
        // isLoading: false
    }
    //!handle change text -> merubah value utk text
    handleChangeText = (e) => {
        // console.log(e.target.id);
        this.setState({
            [e.target.id]: e.target.value

        })
    }

    handleRegisterSubmit = async () => {
        // console.log('Email :', this.state.email)
        // console.log('Password :', this.state.password)

        const { email, password } = this.state;
        const res = await this.props.registerAPI({ email, password }).catch(err => err);
        //set menjadi kosong ketika email & password sudah di register
        if (res) {
            this.setState({
                email: '',
                password: ''
            })
        }

        // console.log('Data Sebelum:', email, password);
        //mengubah dulu menjadi true
        // this.setState({
        //     isLoading: true
        // })
         //dalam 5 detik baru kembali ke buttom normal
        // setTimeout(() => {
        //     this.setState({
        //         isLoading: false
        //     })
        //     alert('Terimakasih telah mendaftar silahkan cek email anda untuk verifikasi');
        // }, 3000);
        //

    }

    render() {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title"> Register Page </p>
                    <input className="input" id="email" type="text" placeholder="Email" onChange={this.handleChangeText} value={this.state.email} />
                    <input className="input" id="password" type="password" placeholder="Password" onChange={this.handleChangeText} value={this.state.password} />
                    {/* <button className="btn" onClick={this.handleRegisterSubmit}> Register </button> */}
                    {/* <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.state.isLoading} /> */}
                    <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading} />
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispacth = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispacth)(Register);