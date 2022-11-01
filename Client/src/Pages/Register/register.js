import React from 'react'
import {useForm } from "react-hook-form";
import {addUser} from "../../Api/authApi"
import {useMutation} from 'react-query'
import './register.css'
import { useNavigate } from 'react-router';


const Register = () => {
    const { register, handleSubmit,  } = useForm({
        defaultValues: {
          name: '',
          email: '',
          password: ''
        }
      });
      const navigate = useNavigate()
      const mutation = useMutation('signup',addUser,{
        onSuccess: (data) => {
          console.log(data);
          alert("Email verification has been sent!")
          navigate('/login')
        },
        onError: (error) => {
          console.log(error);
        }
      })
      
    
      return (
        <div className="register-container">
           <form onSubmit={handleSubmit(async (data) => await mutation.mutateAsync(data))}>
          <input {...register("name", { required: {
               value: true,
               message: "Name is required"
         } 
        })}
           placeholder="Username" 
           />
    
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
        
        </div>
       
      );
}

export default Register