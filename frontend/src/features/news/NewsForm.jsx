import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewsPost, updateNewsPost, fetchNewsPostById } from './newsSlice'
import { useNavigate, useParams } from 'react-router-dom'

const NewsForm = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentPost = useSelector((state) => state.news.currentPost)

  const [formData, setFormData] = useState({
    title: '',
    text: '',
  })

  useEffect(() => {
    if (id) {
      dispatch(fetchNewsPostById(id));
    }
  }, [dispatch, id])

  useEffect(() => {
    if (currentPost && id) {
      setFormData({
        title: currentPost.title,
        text: currentPost.text,
      })
    }
  }, [currentPost, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (id) {
      await dispatch(updateNewsPost({ id: Number(id), updates: formData }))
    } else {
      await dispatch(createNewsPost(formData))
    }
    navigate('/')
  }

  return (
    <div className='main'>
      <h1>{id ? 'Edit News Post' : 'Create News Post'}</h1>
      <form onSubmit={handleSubmit} className='form'>
        <div className='title-label'>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
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