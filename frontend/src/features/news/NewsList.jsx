import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsPosts } from './newsSlice';
import { Link } from 'react-router-dom';


const NewsList = () =>{
    const dispatch = useDispatch()
    const {posts, loading} = useSelector(state=>state.news)

    useEffect(()=>{
        dispatch(fetchNewsPosts())        
    },[dispatch])

    if(loading) return <div>Loading...</div>

    return(
        <div className='main'>
            <h1 className='h1'>News List</h1>
            <Link to="/create" className='link'>Add new post</Link>
            <div className='grid-posts'>
                {
                    posts.map((post) => (
                        <div key={post.id} className='post'>
                            <h2 className='title'>
                                <Link to={`/news/${post.id}`}>{post.title}</Link>
                            </h2>
                            <p className='text'>{post.text}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default NewsList