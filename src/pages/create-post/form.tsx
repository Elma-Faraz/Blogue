import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {addDoc,collection} from 'firebase/firestore';
import {auth, db} from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useNavigate} from 'react-router-dom';

interface CreateFormData{
    title:string;
    description:string;
}

export const CreateForm = () =>{
 const [user] = useAuthState(auth)

 const navigate = useNavigate();

 const schema = yup.object().shape({
    title:yup.string().required("You must add a title"),
    description:yup.string().required("Add some description about the post"),

 })

  const {register,handleSubmit, formState:{errors}} = useForm<CreateFormData>({
    resolver:yupResolver(schema),
  })

  const postReference = collection(db,"post");

  const onCreatePost = async(data:any) =>{
    await addDoc(postReference,{
      title:data.title,
      description:data.description,
      username: user?.displayName,
      userId:user?.uid,
    })
    navigate('/');
  }

    return <div>
        <form onSubmit={handleSubmit(onCreatePost)}>
           <input placeholder='title....' {...register("title")} />
           <p style={{color:"red"}}>{errors.title?.message}</p>
           <textarea placeholder='description....' {...register("description")} />
           <p style={{color:"red"}}>{errors.description?.message}</p>
           <input type='submit' className='submitForm' />
        </form>
    </div>
}