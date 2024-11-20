import { useSelector } from 'react-redux';

const ErrorPage = () => {
    const message = useSelector(s=>s.news.error)
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Oops! Something went wrong.</h1>
      <p>{message || 'An unexpected error occurred.'}</p>
      <a href="/">Back</a>
    </div>
  );
};

export default ErrorPage;