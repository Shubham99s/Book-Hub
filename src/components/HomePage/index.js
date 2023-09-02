import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomePage extends Component {
  state = {topRatedBooks: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBookList()
  }

  getBookList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jsToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jsToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        title: each.title,
      }))
      this.setState({
        topRatedBooks: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-failure" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {topRatedBooks} = this.state
    const settings = {
      dots: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 870,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <Slider {...settings}>
        {topRatedBooks.map(each => (
          <Link className="link" key={each.id} to={`/books/${each.id}`}>
            <div id="top-books">
              <img className="cover" src={each.coverPic} alt={each.title} />
              <h2>{each.title}</h2>
              <p>{each.authorName}</p>
            </div>
          </Link>
        ))}
      </Slider>
    )
  }

  renderFailureView = () => (
    <div className="loader-failure">
      <img
        className="failure-image"
        src="https://res.cloudinary.com/dygfievoq/image/upload/v1692952327/failure_kv2ycz.png"
        alt="failure view"
      />
    </div>
  )

  renderAllView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div id="main">
        <Header />
        <div id="home">
          <div>
            <h1>Find Your Next Favorite Books?</h1>
            <p>
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
          </div>
          <div id="slider-box">
            <div id="heading-box">
              <h2>Top Rated Books</h2>
              <Link to="/shelf">
                <button type="button">Find Books</button>
              </Link>
            </div>
            <div id="slider">{this.renderAllView()}</div>
          </div>
          <div id="footer">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
