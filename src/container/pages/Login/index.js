import React, {
    Component
} from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/atoms/Button'
import { loginUserAPI } from '../../../config/redux/action'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleLoginSubmit = async () => {
        const { email, password } = this.state;
        //*mendirect halaman
        const { history } = this.props;
        const res = await this.props.loginAPI({ email, password }).catch(err => err);
        if (res) {
            console.log('Login Success:', res);
            //membuat/menyimpan local storage -> untuk menyimpan data login user
            //JSON.stringify -> merubah object menjadi string
            localStorage.setItem('userData', JSON.stringify(res))
            this.setState({
                email: '',
                password: ''
            })
            //!mendirect ke dashboard
            history.push('/');
        } else {
            console.log('Login Failed');
        }
    }
    //*

    render() {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title"> Login Page </p>
                    <input className="input" id="email" type="text" placeholder="Email" onChange={this.handleChangeText} value={this.state.email} />

                    <input className="input" id="password" type="password" placeholder="Password" onChange={this.handleChangeText} value={this.state.password} />

                    {/* <button className="btn" onClick={this.handleRegisterSubmit}> Register </button> */}
                    {/* <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.state.isLoading} /> */}
                    <Button title="Login" onClick={this.handleLoginSubmit} loading={this.props.isLoading} />

                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispacth = (dispacth) => ({
    loginAPI: (data) => dispacth(loginUserAPI(data))
})


export default connect(reduxState, reduxDispacth)(Login);