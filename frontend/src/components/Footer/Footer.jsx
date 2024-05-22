import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="content-left">
          <img className='logo' src={assets.footerlogo} alt="" />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique necessitatibus quae cupiditate veritatis vel, itaque blanditiis labore animi, sint, enim minima optio consequuntur. Ratione praesentium architecto atque earum asperiores ullam!</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-222-656-656</li>
            <li>contact@onifood.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copy-right'>Copyrght 2024 &copy; OniFood.com - All Right Reserved. </p>
    </div>
  )
}

export default Footer