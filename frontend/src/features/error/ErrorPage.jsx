import { useSelector } from 'react-redux';

const ErrorPage = () => {
    let message = useSelector((s)=>s.news.error.error)
    let otherMessage = useSelector((s)=>s.auth.error)
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Oops! Something went wrong.</h1>
      <p>{message || otherMessage || 'An unexpected error occurred.'}</p>
      <a href="/">Back</a>
    </div>
  );
};

export default ErrorPage;