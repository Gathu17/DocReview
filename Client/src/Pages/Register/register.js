import React from 'react'
import {useForm } from "react-hook-form";
import {addUser} from "../../Api/authApi"
import {useMutation} from 'react-query'
import './register.css'


const Register = () => {
    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues: {
          name: '',
          email: '',
          password: ''
        }
      });
      const mutation = useMutation('signup',addUser,{
        onSuccess: (data) => {
          console.log(data);
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
           placeholder="First name" 
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