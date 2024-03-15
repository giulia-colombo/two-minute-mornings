import './ProfilePage.css';
import { AuthContext } from '../../context/auth.context';
import { useContext, useState } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/esm/Image';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import AdviceDisplay from '../../components/AdviceDisplay/AdviceDisplay';
import ActivityDisplay from '../../components/ActivityDisplay/ActivityDisplay';
import QuoteDisplay from '../../components/QuoteDisplay/QuoteDisplay';
import { Link, useNavigate } from 'react-router-dom';

function ProfilePage() {
  const { user } = useContext(AuthContext);

  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleDeleteUser = async user => {
    try {
      const response = await axios.delete(`/api/users/${user._id}`);
      console.log(`User deleted successfully: `, response.data);
      //TO DO make all page blurry except for successMessage
      setSuccessMessage(
        `User deleted successfully. Redirecting to home page in 5 seconds.`
      );
    } catch (err) {
      console.error(`Error deleting user: `, err);
      setError(`Error deleting user. Try again later or contact the admin.`);
    }
  };

  let navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center">
      <Image
        className="my-4"
        src="https://picsum.photos/id/402/200/300"
        roundedCircle
        style={{ width: 150, height: 150 }}
        alt="profile-pic"
      />

      <h4 className="my-4">Welcome back, {user.name}!</h4>

      <div>
        <Button className="me-2" onClick={() => navigate('/edit-user')}>
          Edit your profile
        </Button>
      </div>

      {successMessage && (
        <div className="successMessage my-4">
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="errorMessage my-4">
          <span>{error}</span>
        </div>
      )}

      <div className="d-flex flex-column justify-content-center align-items-center">
        <AdviceDisplay></AdviceDisplay>
        <ActivityDisplay></ActivityDisplay>
        <QuoteDisplay></QuoteDisplay>
      </div>
      <Button className="my-5" variant="danger" onClick={handleDeleteUser}>
        Delete your profile
      </Button>
    </Container>
  );
}

export default ProfilePage;
