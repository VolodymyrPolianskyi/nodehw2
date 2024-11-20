import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteNewsPost, fetchNewsPostById, fetchNewsPosts } from './newsSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';

const NewsPage = () =>{
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentPost } = useSelector((state) => state.news);
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(fetchNewsPostById(id))
    },[dispatch,id])

    const handleDelete = () => {
        dispatch(deleteNewsPost(id))
        dispatch(fetchNewsPosts())
        navigate('/')
    }

    if (!currentPost) return <div>Loading...</div>;

    return(
        <div className='main'>
            <h1 className='title'>{currentPost.title}</h1>
            <h2 className='genre'>{currentPost.genre}</h2>
            <p className='full-text'>{currentPost.text}</p>
            <div className='options'>
                <Link to="/" className='link'>Back</Link>
                <Link to={`/edit/${id}`} className='link'>Edit</Link>
                <button onClick={handleDelete} className='delete'>Delete</button>
            </div>
        </div>
    )
}

export default NewsPage