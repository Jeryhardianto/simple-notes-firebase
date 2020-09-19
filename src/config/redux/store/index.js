//* Export default penggunaannya tidak menggunakan {kurawal}
//* epx : import firebase from '../../../config/firebase'
//* Export -> penggunaannya menggunakan {kurawal} 
//* Exp : import { Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducer'


export const store = createStore(reducer, applyMiddleware(thunk))


