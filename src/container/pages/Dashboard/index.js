import React, {
    Component, Fragment
} from 'react'
import { connect } from 'react-redux';
import { addDataToAPI, getDataFromAPI } from '../../../config/redux/action';
import './Dashboard.scss'

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        date: ''
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
        const { title, content } = this.state;
        const { saveNotes } = this.props;

        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            //merupakan id user
            userId: userData.uid
        }
        saveNotes(data)
        // this.props.saveNotes(data) = saveNotes()
        console.log(data)
    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }
    render() {
        const { title, content, date } = this.state;
        const { notes } = this.props;
        console.log('notes :', notes);
        return (
            <div className="container">
                <div className="input-form">
                    <input className="input-title" type="text" placeholder="title" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                    <textarea className="input-content" placeholder="conten" value={content} onChange={(e) => this.onInputChange(e, 'content')}>

                    </textarea>
                    <button className="save-button" onClick={this.handleSaveNotes}> Simpan</button>
                </div>
                <hr />
                {/* Looping nilai  */}
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    return (
                                        <div className="card-content" key={note.id} >
                                            <p className="title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="content">{note.data.content}</p>
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
    getNotes: (data) => dispatch(getDataFromAPI(data))
})

export default connect(reduxState, reduxDispatch)(Dashboard);