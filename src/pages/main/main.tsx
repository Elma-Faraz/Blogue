import {getDocs,collection} from 'firebase/firestore';
import {db} from '../../config/firebase';
import { useEffect, useState } from 'react';
import {Post} from './post';

export interface Post{
    id:string,
    userId:string,
    title:string,
    username:string,
    description:string,
}

export const Main= ()=>{
    const postReference = collection(db,"post");

    const [postList,setPostList] = useState<Post[] | null>(null);

    const getPost = async() =>{
        const data = await getDocs(postReference);
        setPostList(data.docs.map((doc)=>({...doc.data(),id:doc.id})) as Post[]);
    }

    useEffect(()=>{
       getPost();
    },[])

    return <div className='main-container'>
        <div className='main-heading'>
        <h1>Share a blog</h1>
        </div>
     <div className='main'>
      {postList?.map((post)=><Post post={post} />)}
      </div>
    </div>
}