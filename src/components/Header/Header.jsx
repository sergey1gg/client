import { NavLink } from "react-router-dom"
import styles from "./Header.module.css"
const Header=()=>{
    return(
        <div className={styles.header}>
        <div className={styles.tabs}>
          <NavLink to="/"><button className={styles.tab}>Акты</button></NavLink>
          <NavLink to="/directory"><button className={styles.tab}>Справочник</button></NavLink>
          <NavLink to="/users"><button className={styles.tab}>Пользователи</button></NavLink>
        </div>
        
      </div>
    )
}

export default Header