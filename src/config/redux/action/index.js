import firebase, {
    database
} from '../../firebase'

export const actionUserName = () => (dispacth) => {
    setTimeout(() => {
        return dispacth({
            type: 'CHANGE_USER',
            value: 'Jery Hardianto'
        })
    }, 5000);
}

//* Register
export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: 'CHANGE_LOADING',
            value: true
        })
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(res => {
                // console.log('Success: ', res);
                dispatch({
                    type: 'CHANGE_LOADING',
                    value: false
                })
                alert('Data berhasil ditambahkan')
                resolve(true)
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
                reject(false)
            })
    })
}



//* Login
export const loginUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: 'CHANGE_LOADING',
            value: true
        })
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(res => {
                // console.log('Success: ', res);
                //diambil dari data kemabilian firebase
                const dataUser = {
                    email: res.user.email,
                    uid: res.user.uid,
                    emailVerifid: res.user.emailVerified,
                    refreshToken: res.user.refreshToken
                }

                dispatch({
                    type: 'CHANGE_LOADING',
                    value: false
                })
                dispatch({
                    type: 'CHANGE_ISLOADING',
                    value: true
                })
                dispatch({
                        type: 'CHANGE_USER',
                        //dataUser diambil dari object yg dikembalikan firebase
                        value: dataUser
                    })
                    // console.log('Succes :', res)

                resolve(dataUser)
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
                dispatch({
                    type: 'CHANGE_LOADING',
                    value: false
                })

                alert(errorMessage)
                reject(false)
            })
    })
}

//Create To API
export const addDataToAPI = (data) => (dispatch) => {
    //.set => menimpah data yang ditambah di database
    database.ref('notes/' + data.userId).push({
        title: data.title,
        content: data.content,
        date: data.date
    })
}

//*GET/mengambil data dari Firebase
export const getDataFromAPI = (userId) => (dispatch) => {
    const urlNotes = database.ref('notes/' + userId);
    return new Promise((resolve, reject) => {
        urlNotes.on('value', function(snapshot) {
            console.log('Get Data', snapshot.val());
            //membuat object menjadi array
            const data = [];
            Object.keys(snapshot.val()).map(key => {
                data.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            });

            dispatch({
                type: 'SET_NOTES',
                value: data
            })
            resolve(snapshot.val())
        });
    })
}