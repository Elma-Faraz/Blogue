import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="navbar">
      <div className="heading">
        <h1>Blogue</h1>
      </div>
      
        <div className="links">
          <Link to="/">Home</Link>
          {!user ? (
            <Link to="/login">Login</Link>
          ) : (
            <Link to="/createpost">Create Post</Link>
          )}
        </div>

        <div className="user">
          <p>{user?.displayName}</p>
          <img src={user?.photoURL || ""} alt="user" />
        </div>
      </div>
   
  );
};
