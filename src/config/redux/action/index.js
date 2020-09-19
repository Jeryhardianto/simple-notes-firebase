import firebase from '../../firebase'

export const actionUserName = () => (dispacth) => {
    setTimeout(() => {
        return dispacth({
            type: 'CHANGE_USER',
            value: 'Jery Hardianto'
        })
    }, 5000);
}

export const registerUserAPI = (data) => (dispatch) => {
    dispatch({
        type: 'CHANGE_LOADING',
        value: true
    })
    return (
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(res => {
            // console.log('Success: ', res);
            dispatch({
                type: 'CHANGE_LOADING',
                value: false
            })
            alert('Data berhasil ditambahkan')
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode, errorMessage);
            dispatch({
                type: 'CHANGE_LOADING',
                value: false
            })

            alert(errorMessage)
        })
    )
}