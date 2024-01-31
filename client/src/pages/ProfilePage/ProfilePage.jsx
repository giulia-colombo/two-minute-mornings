import './ProfilePage.css';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import Image from 'react-bootstrap/esm/Image';

function ProfilePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <div className="container">
      <h1>Profile page</h1>

      {isLoggedIn && (
        <div className="ml-lg-auto d-flex justify-content-space-between">
          <Image
            src="https://picsum.photos/id/402/200/300"
            roundedCircle
            style={{ width: 50, height: 50 }}
            alt="profile-pic"
          />

          <h3>Hello, {user && user.name}! 🙂</h3>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
