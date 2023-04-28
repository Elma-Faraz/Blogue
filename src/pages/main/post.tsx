import { Post as propPost } from "./main";
import { collection, addDoc, query, getDocs, where,deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: propPost;
}

interface Like {
  userId: string;
  likeId:string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesReference = collection(db, "likes");

  const likesDoc = query(likesReference, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId ,likeId:doc.id})));
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesReference, {
        userId: user?.uid,
        postId: post.id,
      });

      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user?.uid, likeId:newDoc.id }] : [{ userId: user?.uid, likeId:newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async()=>{
     try{
       const likeToDelQuery = query(likesReference,where("postId","==",post.id),where("userId","==",user?.uid));

       const likeTodelData = await getDocs(likeToDelQuery);
       const likeID = likeTodelData.docs[0].id
       const likeToDel = doc(db,"likes",likeID);
       await deleteDoc(likeToDel);

       if(user){
        setLikes((prev)=>prev && prev.filter((like)=>like.likeId!==likeID))
       }
     } catch(err){
        console.log(err);
     }
  }



  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="post">
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
        <button onClick={hasUserLiked? removeLike : addLike }>
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likes && <p>Likes:{likes.length}</p>}
      </div>
    </div>
  );
};
