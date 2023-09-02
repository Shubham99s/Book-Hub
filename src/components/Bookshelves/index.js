import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    search: '',
    status: bookshelvesList[0].value,
    bookList: [],
  }

  componentDidMount() {
    this.getBookList()
  }

  getBookList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {search, status} = this.state

    const jsToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${status}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jsToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        readStatus: each.read_status,
        rating: each.rating,
        coverPic: each.cover_pic,
        title: each.title,
      }))
      this.setState({
        bookList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSearch = event => {
    this.setState({search: event.target.value})
  }

  onStatusChange = event => {
    this.setState({status: event.target.value}, this.getBookList)
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <img
      src="https://res.cloudinary.com/dygfievoq/image/upload/v1692952327/failure_kv2ycz.png"
      alt="failure view"
    />
  )

  renderSuccessView = () => {
    const {bookList, search} = this.state
    const listStatus = bookList.length > 0

    return (
      <>
        {listStatus ? (
          <ul>
            {bookList.map(each => (
              <Link className="link" key={each.id} to={`/books/${each.id}`}>
                <li>
                  <img src={each.coverPic} alt={each.title} />
                  <div id="details">
                    <h2>{each.title}</h2>
                    <p className="name">{each.authorName}</p>
                    <p className="rating-status">
                      Avg Rating <BsFillStarFill className="star" />{' '}
                      {each.rating}
                    </p>
                    <p className="rating-status">
                      Status: <span>{each.readStatus}</span>
                    </p>
                  </div>
                </li>
              </Link>
            ))}
            <div id="bottom-2">
              <Footer />
            </div>
          </ul>
        ) : (
          <div id="no-result">
            <img
              src="https://res.cloudinary.com/dygfievoq/image/upload/v1693293051/Asset_1_1_lnyqtl.png"
              alt="no books"
            />
            <p>Your search for {search} did not find any matches.</p>
          </div>
        )}
      </>
    )
  }

  renderAllView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    const {search, status} = this.state

    return (
      <div id="main">
        <Header className="header" />
        <div id="bookShelf">
          <div id="shelf">
            <div id="top">
              <h2>Bookshelves</h2>
              {bookshelvesList.map(each => (
                <button
                  className={status === each.value ? 'active' : 'inactive'}
                  key={each.id}
                  type="button"
                  value={each.value}
                  onClick={this.onStatusChange}
                >
                  {each.label}
                </button>
              ))}
            </div>
            <div id="bottom">
              <Footer />
            </div>
          </div>
          <div id="books-section">
            <div id="top-section">
              <h2>All Books</h2>
              <div id="search-box">
                <input
                  placeholder="Search"
                  type="search"
                  value={search}
                  onChange={this.onSearch}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      this.getBookList()
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    this.getBookList()
                  }}
                >
                  <BsSearch />
                </button>
              </div>
            </div>
            <div id="shelf-2">
              <h2>Bookshelves</h2>
              <div>
                {bookshelvesList.map(each => (
                  <button
                    className={
                      status === each.value
                        ? 'active-button'
                        : 'inactive-button'
                    }
                    key={each.id}
                    type="button"
                    value={each.value}
                    onClick={this.onStatusChange}
                  >
                    {each.label}
                  </button>
                ))}
              </div>
            </div>
            <div id="books">{this.renderAllView()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelves
