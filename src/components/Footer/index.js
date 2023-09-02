import {FaGoogle, FaInstagram, FaYoutube, FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div id="Footer">
    <div>
      <FaGoogle className="react-icons" />
      <FaTwitter className="react-icons" />
      <FaInstagram className="react-icons" />
      <FaYoutube className="react-icons" />
    </div>
    <p className="text">Contact Us</p>
  </div>
)

export default Footer
