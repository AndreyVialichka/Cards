
import styles from "./CheckEmailPage.module.css"
import { Link } from "react-router-dom";


export default function CheckEmailPage() {
    return (
      <div className={styles.form}>
        <label>Check Email </label>
        <div className={styles.email_input}>
          <label>We’ve sent an Email with instructions to example@mail.com </label>
        </div>
        <div className={styles.sign_up}>  
          <Link replace to={`/SignInPage`} >Back To Login</Link>
        </div>
      </div>  
    )
}
