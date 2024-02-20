import './ProfilePage.css';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import Image from 'react-bootstrap/esm/Image';
import Container from 'react-bootstrap/esm/Container';
import AdviceSlip from '../../components/AdviceDisplay/AdviceDisplay';

function ProfilePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <Container className="d-flex flex-column align-items-center">
      {isLoggedIn && (
        <>
          <Image
            className="my-4"
            src="https://picsum.photos/id/402/200/300"
            roundedCircle
            style={{ width: 150, height: 150 }}
            alt="profile-pic"
          />

          <h5 className="my-4">Welcome back, {user.name}! 💙</h5>
        </>
      )}

      <AdviceSlip></AdviceSlip>
    </Container>
  );
}

export default ProfilePage;
