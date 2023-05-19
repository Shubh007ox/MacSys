import { useContext} from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from './store/auth';
import classes from "./navBar.module.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  }
  return (
    <div className={classes.navbar}>
        <div className={classes['navbar-brand']}>Macto Sys AssisgMent</div>
      <nav className={classes.navbar}>
        <ul>
        {!isLoggedIn && (<li>
            <NavLink to='/' className={classes['navbar-brand']}>REgister</NavLink>
          </li>)}
          {isLoggedIn && (<li>
            <NavLink to='/Dash' className={classes['navbar-brand']}>Dashboard</NavLink>
          </li>)}
          <NavLink to={"/"}>
          {isLoggedIn && (<li>
            <button onClick={logoutHandler}>Logout</button>
          </li>)}
          </NavLink>
        </ul>
      </nav>
      </div>
  );
};

export default MainNavigation;
