import { Link } from 'react-router'; 

const NotFound = () => {
  return (
    <>
      <h2>Page Not Found</h2>
      <p>We couldn't find the page you're looking for.</p>
      <Link to="/">Back to Home</Link>
    </>
  );
};

export default NotFound;