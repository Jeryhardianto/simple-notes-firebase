import React, {
    Component, Fragment
} from 'react'
import { connect } from 'react-redux';
import { addDataToAPI, getDataFromAPI, UpdateDataAPI, deleteDataAPI } from '../../../config/redux/action';
import './Dashboard.scss'
import SweetAlert from 'sweetalert-react';


class Dashboard extends Component {

    state = {
        title: '',
        content: '',
        date: '',
        textButton: 'SIMPAN',
        noteId: ''
    }

    //memanggil local storage -> untuk menyimpan data login user
    // componentDidMount() {
    //     const userData = localStorage.getItem('userData')
    //JSON.parse => string merubah menjadi object
    //     console.log('Dashboard :', JSON.parse(userData))
    // }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.props.getNotes(userData.uid)
    }

    handleSaveNotes = () => {
        const { title, content, textButton, noteId } = this.state;
        const { saveNotes, updateNotes } = this.props;

        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            //merupakan id user
            userId: userData.uid
        }
        //ketika nilai text buttonnya simpan -> simpan klw tidak tampilkan update
        if (textButton === 'SIMPAN') {
            saveNotes(data)
        } else {
            data.noteId = noteId
            updateNotes(data)

        }
        // this.props.saveNotes(data) = saveNotes()
        console.log(data)
    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    updateNotes = (note) => {
        console.log(note);
        this.setState({
            title: note.data.title,
            content: note.data.content,
            textButton: 'UPDATE',
            noteId: note.id
        })
    }
    cancleUpdate = () => {
        this.setState({
            title: '',
            content: '',
            textButton: 'SIMPAN'
        })
    }

    deleteNote = (e, note) => {
        //fungsinya utk menstop fitur card utk update sehingga yg jalan kan adalah button delete
        e.stopPropagation()
        const { deleteNote } = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId: userData.uid,
            noteId: note.id
        }
        deleteNote(data)
    }


    render() {
        const { title, content, textButton } = this.state;
        const { notes } = this.props;
        const { updateNotes, cancleUpdate, deleteNote } = this;

        console.log('notes :', notes);

        return (
            <div className="container">
                <div className="input-form">
                    <input className="input-title" type="text" placeholder="title" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                    <textarea className="input-content" placeholder="conten" value={content} onChange={(e) => this.onInputChange(e, 'content')}>

                    </textarea>

                    <div className="action-wrapper">
                        {/* tombol cancle hanya muncul pada saat update data */}
                        {
                            textButton === 'UPDATE' ? (
                                <button className="save-button cancle" onClick={this.handleSaveNotes} onClick={cancleUpdate} > CANCLE</button>
                            ) : <div />
                        }
                        <button className="save-button" onClick={this.handleSaveNotes}> {textButton}</button>
                        {/* <button className="save-button" onClick={() => this.setState({ show: true })}> {textButton}</button> */}
                    </div>
                </div>
                <hr />
                <div>
                    {/* 
                    <button onClick={() => this.setState({ show: true })}>Alert</button> */}
                    {/* <SweetAlert
                        show={this.state.show}
                        title="Demo"
                        text="SweetAlert in React"
                        onConfirm={() => this.setState({ show: false })}
                    /> */}
                </div>
                {/* Looping nilai  */}
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    return (
                                        <div className="card-content" key={note.id} onClick={() => updateNotes(note)} >
                                            <p className="title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="content">{note.data.content}</p>
                                            <div className="delete-btn" onClick={(e) => deleteNote(e, note)}>x</div>

                                        </div>

                                    )
                                })
                            }
                        </Fragment>

                    ) : null
                }
            </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(UpdateDataAPI(data)),
    deleteNote: (data) => dispatch(deleteDataAPI(data))
})

export default connect(reduxState, reduxDispatch)(Dashboard);