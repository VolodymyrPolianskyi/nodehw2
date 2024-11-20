import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsPosts } from './newsSlice';
import { Link, useNavigate } from 'react-router-dom';

const NewsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { posts, loading, totalPages, error } = useSelector(state => state.news);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  useEffect(() => {
    dispatch(fetchNewsPosts({ page, size }));
  }, [dispatch, page, size]);

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
      <div className='grid-posts'>
        {posts?.map((post) => (
          <div key={post.id} className='post'>
            <h2 className='title'>
              <Link to={`/news/${post.id}`}>{post.title}</Link>
            </h2>
            <p className='text'>{post.text}</p>
            {post.isPrivate && <p className="private">Private</p>}
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