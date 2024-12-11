import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewsPost, updateNewsPost, fetchNewsPostById } from './newsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { getToken } from '../auth/authSlice';
import { Link } from 'react-router-dom';

const NewsForm = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentPost = useSelector((state) => state.news.currentPost)
  const error = useSelector((state) => state.news.error)

  const [formData, setFormData] = useState({
    header: '',
    text: ''
  })

  useEffect(() => {
    if (id) {
      dispatch(fetchNewsPostById(id));
    }
    dispatch(getToken())
  }, [dispatch, id])

  const token = useSelector((state) => state.auth.token);
  
  useEffect(() => {
    if (error) navigate('/error', { state: { message: error } });
  }, [error, navigate]);

  useEffect(() => {
    if (currentPost && id) {
      setFormData({
        header: currentPost.header,
        text: currentPost.text
      })
    }
  }, [currentPost, id]);

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (id) {
      await dispatch(updateNewsPost({ id: Number(id), updates: formData, token: token }))
    } else {
      await dispatch(createNewsPost({header: formData.header, text: formData.text, token:token}))
    }
    navigate('/')
  }

  if(!token){
    return(
      <div className="main">
        <h1>You cant create or update the post, you need to <Link to="/login">sign in</Link> or <Link to="/register">sign up</Link> first</h1>
      </div>
    )
  }

  return (
    <div className='main'>
      <h1>{id ? 'Edit News Post' : 'Create News Post'}</h1>
      <form onSubmit={handleSubmit} className='form'>
        <div className='title-label'>
          <label htmlFor="header">Header:</label>
          <input
            type="text"
            id="header"
            name="header"
            value={formData.header}
            onChange={handleChange}
            required
          />
        </div>
        <div className='text-label'>
          <label htmlFor="text">Text:</label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
        </div>
        <div className='options'>
          <button type="submit" className='link'>{id ? 'Update' : 'Create'}</button>
          <button type="button" onClick={() => navigate('/')} className='link'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;