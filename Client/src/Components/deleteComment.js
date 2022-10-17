import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {deleteComment} from '../Api/commentApi'

const DeleteComment = ({docId, commentId}) =>{
const delIcon = <FontAwesomeIcon icon={faXmark}/>
const queryClient = new useQueryClient()
const mutation = useMutation(['comment'],deleteComment,{
    onSuccess: (data) => {
       console.log(data)
       queryClient.invalidateQueries(['docs'])
    }
})
async function handleDelete(){
   await mutation.mutateAsync({docId,commentId})
}

    return(
      <span style={{marginLeft:"10px"}} onClick={handleDelete}>{delIcon}</span>
    )
}

export default DeleteComment;