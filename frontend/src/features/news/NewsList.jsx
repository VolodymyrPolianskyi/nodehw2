import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsPosts } from './newsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../auth/authSlice';
import socket from '../../app/soket';

const NewsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { posts, loading, totalPages, error } = useSelector(state => state.news);
  
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const sendNotif = useSelector(state=>state.auth.sendNotification);
  const notifChannel = useSelector(state=>state.auth.notifChannel);
  useEffect(() => {
    socket.emit('joinRoom', 'logChannel');
    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
    });
    
    if(sendNotif){
      if(notifChannel == 'log'){
        socket.on('newPostLog', (data) => {
          console.log('New post:', data);
        });
      }

      if(notifChannel == 'alert'){
        socket.on('newPostAlert', (data) => {
          alert(`New post: ${data.title}`);
        });
      }
    }

    return () => {
      socket.off('connect')
      socket.off('newPostLog');
      socket.off('newPostAlert');
    };
  }, []);
  
  useEffect(() => {
    dispatch(fetchNewsPosts({ page, size }));
    dispatch(getToken())
  }, [dispatch, page, size]);
  
  if (error) {
    if(error.error){
      navigate('/error')
    }
  }
  const authError = useSelector((s)=>s.auth.error)
  if(authError){
    navigate('/error')
  }

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
        {token != null || <Link to="/register">Sign up</Link>}
        {token != null || <Link to="/login">Sign in</Link>}
      </div>
      <div className='grid-posts'>
        {posts?.map((post) => (
          <div key={post.id} className='post'>
            <h2 className='title'>
              <span className='post-span'>Made by: {post.author.email}</span>
              <Link to={`/news/${post.id}`}>{post.header}</Link>
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