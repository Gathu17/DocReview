import React from 'react'
import {useMutation,useQueryClient} from 'react-query'
import {addComment} from '../Api/commentApi'
import {Button} from '@mui/material'


const CommentBtn = ({id,body}) => {

const queryClient = new useQueryClient() 
const mutation = useMutation(['comment'],addComment,{
     
        onSuccess: (data) => {
          console.log(data)
          queryClient.invalidateQueries(['docs'])
        }
    })
 async function handleSubmit(e){
        e.preventDefault()
        console.log(body)
        await mutation.mutateAsync({id: id, comments:body })
      }
  return (
    <div>
        <Button variant="contained" size="small" color="primary" onClick={handleSubmit}>POST</Button>
    </div>
  )
}

export default CommentBtn