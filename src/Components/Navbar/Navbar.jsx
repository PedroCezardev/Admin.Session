import style from "./Navbar.module.css"
import navlogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className={style.navbar}>
        <img src={navlogo} alt="" className={style.navLogo} />
        <img src={navProfile} alt="" className={style.navProfile} />
    </div>
  )
}

export default Navbar