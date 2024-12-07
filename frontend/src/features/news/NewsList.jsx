import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsPosts } from './newsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../auth/authSlice';

const NewsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { posts, loading, totalPages, error } = useSelector(state => state.news);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  useEffect(() => {
    dispatch(fetchNewsPosts({ page, size }));
    dispatch(getToken())
  }, [dispatch, page, size]);

  const token = useSelector((state)=>state.auth.token)

  const handleLogout = () =>{
    localStorage.removeItem('token')
    window.location.reload()
  }

  useEffect(() => {
    if (error) navigate('/error', { state: { message: error } });
  }, [error, navigate]);

  if (loading) return <div>Loading...</div>;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className='main'>
      <h1 className='h1'>News List</h1>
      <Link to="/create" className='link'>Add new post</Link>
      <div className='auth'>
        {token && <button onClick={handleLogout}>Logout</button>}
        {token != null || <Link to="/login">Sign up</Link>}
        {token != null || <Link to="/login">Sign in</Link>}
      </div>
      <div className='grid-posts'>
        {posts?.map((post) => (
          <div key={post.id} className='post'>
            <h2 className='title'>
              <span className='post-span'>Made by: {post.author.email}</span>
              <Link to={`/news/${post.id}`}>{post.title}</Link>
            </h2>
            <p className='text'>{post.text}</p>
          </div>
        ))}
      </div>

      <div className='pagination'>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsList;