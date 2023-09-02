import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {bookDetail: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    this.getBookDetails()
  }

  getBookDetails = async () => {
    const {match} = this.props
    const {id} = match.params

    const jsToken = Cookie.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jsToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.book_details.id,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        aboutBook: data.book_details.about_book,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
        aboutAuthor: data.book_details.about_author,
      }
      this.setState({
        bookDetail: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
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
    const {bookDetail} = this.state
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookDetail

    return (
      <div id="book-details">
        <div id="new-top">
          <img src={coverPic} alt={title} />
          <div>
            <h1>{title}</h1>
            <p className="name">{authorName}</p>
            <p>
              Avg Rating <BsFillStarFill fill="#FBBF24" />
              {rating}
            </p>
            <p>
              Status: <span>{readStatus}</span>
            </p>
          </div>
        </div>
        <hr />
        <h2>About Author</h2>
        <p>{aboutAuthor}</p>
        <h2>About Book</h2>
        <p>{aboutBook}</p>
      </div>
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
    return (
      <div id="main">
        <Header />
        <div id="full-view">
          {this.renderAllView()}
          <Footer />
        </div>
      </div>
    )
  }
}

export default BookDetails
