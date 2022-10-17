import React from 'react'
import {useForm} from 'react-hook-form'
import {useMutation,useQuery, useQueryClient} from 'react-query'
import {createDoc,getUserDoc,addDoc} from '../../Api/docApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import './file.css'

const File = () => {
  const backIcon = <FontAwesomeIcon icon={faArrowLeft} size='2x'/>
  const { data} = useQuery(['doc'],getUserDoc)
  const queryClient = useQueryClient()
  console.log(data)
const {register, handleSubmit} = useForm()
const mutation = useMutation(['doc'], data ? addDoc : createDoc,{
    onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(['doc'])
      },
    onError: (error) => {
        console.log(error);
      }
})

const onSubmit = async (data) => {
    console.log(data.file[0].name)
    const formData = new FormData()
    formData.append('file',data.file[0],data.file[0].name)
    formData.append('name',data.name)
    for (const pair of formData.entries()) {
        console.log(pair[1], );
      }
    console.log(formData)
  await mutation.mutateAsync(formData)
}
  return (
    <div style={{ width: "100vw",height:"100vh",backgroundColor:"hsl(126, 68%, 97%)"}}>
      <Link to="/" style={{position: 'absolute',top: "10%", left: '2rem',textDecoration:"none", width: "10%"}}>{backIcon} <span style={{fontSize: "1.5rem",margin: "50% 10px"}}>back</span></Link >
      <div className="file-container">
         <form onSubmit={handleSubmit(onSubmit)}>
        
          <input {...register("name", { required: {
               value: true,
               message: "name is required"
               
         } 
        })}
           placeholder="Name of file"
           type="text"
           />
          <input {...register("file", { required: {
               value: true,
               message: "File is required"
         } 
        })}
           name= "file"
           type="file"
           />
        
          <input type="submit" value="ADD"/>
        </form>
    </div>
    </div>
  )
}

export default File