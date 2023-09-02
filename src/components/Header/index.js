import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {FaTh} from 'react-icons/fa'
import Context from '../../Context/Context'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <Context.Consumer>
      {value => {
        const {menuId, onChangeMenuId} = value
        return (
          <nav id="navbar">
            <Link className="link" to="/">
              <img
                src="https://res.cloudinary.com/dygfievoq/image/upload/v1692782021/bookHubLogo_i1wws4.png"
                alt="website logo"
              />
            </Link>
            <ul>
              <li
                onClick={() => {
                  onChangeMenuId('HOME')
                }}
              >
                <Link className="link" to="/">
                  <p className={menuId === 'HOME' ? 'active' : 'inactive'}>
                    Home
                  </p>
                </Link>
              </li>
              <li
                onClick={() => {
                  onChangeMenuId('SHELF')
                }}
              >
                <Link className="link" to="/shelf">
                  <p className={menuId === 'SHELF' ? 'active' : 'inactive'}>
                    Bookshelves
                  </p>
                </Link>
              </li>
              <li>
                <button type="button" onClick={onLogout}>
                  Logout
                </button>
              </li>
            </ul>
            <div id="menu-button">
              <Popup
                trigger={
                  <button type="button">
                    <FaTh />
                  </button>
                }
                position="bottom right"
                nested
              >
                <div id="popup-menu">
                  <ul>
                    <li
                      onClick={() => {
                        onChangeMenuId('HOME')
                      }}
                    >
                      <Link className="link" to="/">
                        <p
                          className={menuId === 'HOME' ? 'active' : 'inactive'}
                        >
                          Home
                        </p>
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        onChangeMenuId('SHELF')
                      }}
                    >
                      <Link className="link" to="/shelf">
                        <p
                          className={menuId === 'SHELF' ? 'active' : 'inactive'}
                        >
                          Bookshelves
                        </p>
                      </Link>
                    </li>
                    <li>
                      <button type="button" onClick={onLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </Popup>
            </div>
          </nav>
        )
      }}
    </Context.Consumer>
  )
}

export default withRouter(Header)
