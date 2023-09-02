import {Component} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import Bookshelves from './components/Bookshelves'
import BookDetails from './components/BookDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Context from './Context/Context'
import './App.css'

class App extends Component {
  state = {menuId: 'HOME'}

  onChangeMenuId = id => {
    this.setState({menuId: id})
  }

  render() {
    const {menuId} = this.state

    return (
      <Context.Provider value={{menuId, onChangeMenuId: this.onChangeMenuId}}>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={HomePage} />
          <ProtectedRoute exact path="/shelf" component={Bookshelves} />
          <ProtectedRoute exact path="/books/:id" component={BookDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </Context.Provider>
    )
  }
}
export default App
