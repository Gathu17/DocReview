import React from 'react'
import {useForm } from "react-hook-form";
import {loginUser} from "../../Api/authApi"
import {useMutation} from 'react-query'
import './login.css'
import {useDispatch} from 'react-redux'
import {login} from '../../Redux/userRedux'
import {useNavigate} from 'react-router'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
const Login = () => {
  
    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues: {
          email: '',
          password: ''
        }
      });
      const dispatch = useDispatch()
      const navigate = useNavigate() 
      const mutation = useMutation('login',loginUser,{
        onMutate: () => {
          console.log('mutating')
        },
        onSuccess: (data) => {
          console.log(data);
         dispatch(login({user: data, token: localStorage.getItem('jwtToken')}))

         navigate('/',{replace: true})
         window.location.reload()
        },
        onError: (error) => {
          console.log(error);

        }
      })
  return (
    <div className="login-container">
         <form onSubmit={handleSubmit(async (data) => await mutation.mutateAsync(data))}>
        
          <input {...register("email", { required: {
               value: true,
               message: "Email is required"
         } 
        })}
           placeholder="Your email" 
           />
          <input {...register("password", { required: {
               value: true,
               message: "Password is required"
         } 
        })}
           placeholder="Password" 
           type="password"
           />
        
          <input type="submit" />
        </form>
        <p style={{ margin:"auto"}}>Create an account? <Link to="/register">Register</Link> here.</p>
    </div>
  )
}

export default Login