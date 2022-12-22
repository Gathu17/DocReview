import React,{useState,useRef} from 'react'
import {Paper,Divider,Container,Collapse,Typography,TextField} from '@mui/material/'
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import {useQuery,useMutation,useQueryClient} from 'react-query'
import {getUser} from '../Api/userApi'
import CommentBtn from './commentBtn'
import DeleteCommentBtn from './deleteComment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import {deleteDoc} from '../Api/docApi'


const ReviewDoc = ({doc}) => {
  const [open, setOpen] = useState(false)
  const [body, setBody] = useState('')
  const inputRef = useRef(null)
  const queryClient = new useQueryClient()
  const delIcon = <FontAwesomeIcon icon={faXmark} size='2x' color='red'/>
  const { isError, data, error } = useQuery(['person',doc.userId],() => getUser(doc.userId))
  

  if(isError){console.log(error)}
  
  
  const {comments,documents, status, _id} = doc
  const mutation = useMutation(['doc'],()=> deleteDoc(_id),{
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries(['docs'])
    }
   })
  
  function BufferToBase64(file){
  let str = ""
  var bytes = new Uint8Array(file.data )
    bytes.forEach(function(index) {
    str += String.fromCharCode(index)
  })

  const base64String = btoa(
    str
  )
  return base64String
  }
  function handleClick(){
    setOpen(!open)
  }
  function callBack(){
    setBody('')
  }
  
  return (
    <div style={{width: '80%',marginLeft: '10%'}}>
      <Paper elevation={10} >
         <Container >
         <span style={{marginTop: '0',float: 'right'}} onClick={async () => mutation.mutateAsync()}>{delIcon}</span>
          <h1 style={{fontSize: '2rem'}}>{data?.data.username}</h1> <Typography variant="h3">Documents({doc && doc.documents.length})</Typography> 
            <Typography variant="h4" sx={{fontWeight: 'bold',right: '10px',float:"right"}}>
             Status:<span style={{color: 'red'}}> {status}</span>
            </Typography>
            
            <div>
            <Typography variant="h2" gutterBottom mt="2" align="center"  onClick={handleClick}>
              Documents {open? <ExpandLess/> : <ExpandMore/>}
             </Typography>
             <Collapse in={open}>
              <div className="review-docs">
                {documents.map((document)=> {
                return(
                  <div className="user-doc" key={document._id}>
                  <a href={`data:application/pdf;base64,${BufferToBase64(document.file)}`} download='application.pdf'>download</a>
                   <embed src={`data:application/pdf;base64,${BufferToBase64(document.file)}`} /> 
                 </div>  
                )
              })}
              </div>
              
             </Collapse>
            
            </div> 
            <div style={{border: '1px solid #00000055',borderRadius:'20px', }}>
              <Typography variant="h5" align="center" sx={{fontWeight: 'bold',textDecoration: 'underline'}}>Comments</Typography>
              {comments && comments.map(comment => {
                return(
                  <Typography variant="h6" align="center" gutterBottom sx={{fontFamily:"Georgia, serif"}} key={comment._id}>
                    {comment.body} <DeleteCommentBtn commentId={comment._id} docId={doc._id}/>
                  </Typography>
                )
              })}
            </div>
            
            
            <TextField id="comments" fullWidth minRows="3" margin="dense" variant="outlined" ref={inputRef} value={body} onChange={(e) => {setBody(e.target.value) }}/>
            <CommentBtn id={doc._id} body={body} style={{margin:'10px'}} callBack={callBack}/>
        
         </Container>   
        </Paper> 
        <Divider/>  
    </div>
  )
}

export default ReviewDoc