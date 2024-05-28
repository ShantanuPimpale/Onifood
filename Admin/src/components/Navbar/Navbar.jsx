import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div>
        <div className="Navbar">
            <img className='logo' src={assets.logo1} alt="" />
            <h1>Onifood-Admin Panel</h1>
            <img className='profile' src={assets.profile_image} alt="" />
        </div>
    </div>
  )
}

export default Navbar