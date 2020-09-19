import React, {
    Component
} from 'react'
import { connect } from 'react-redux';
import { actionUserName } from '../../../config/redux/action';

class Login extends Component {
    changeUser = () => {
        this.props.changeUserName()
    }
    render() {
        return (
            <div>
                <p> Login Page {this.props.userName} </p>
                {/* <button> Go to Register </button> */}
                <button onClick={this.changeUser}> Change User </button>
                <button> Go to Dashboard </button>
            </div>
        )
    }
}

const reduxState = (state) => ({
    popupProps: state.popup,
    userName: state.user
})

const reduxDispacth = (dispacth) => ({
    changeUserName: () => dispacth(actionUserName())
})


export default connect(reduxState, reduxDispacth)(Login);