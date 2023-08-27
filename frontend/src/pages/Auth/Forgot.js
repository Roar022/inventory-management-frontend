import React from "react";
import styles from "./auth.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword, validateEmail } from "../../services/authServices";

const Forgot = () => {
  const [email, setEmail] = React.useState("");
  const handleInputChange = (e)=>{
    setEmail(e.target.value)
  }
  const forgot = async (e) => {
    e.preventDefault();
    
    if (!email) {
      return toast.error("Please enter an email");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    const userData = {
      email,
    };
    await forgotPassword(userData)
    setEmail("")
  };
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Email
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;