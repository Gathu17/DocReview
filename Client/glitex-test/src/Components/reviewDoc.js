import React,{useState} from 'react'
import {Paper,Divider,Container,Collapse,Typography,TextField,Button} from '@mui/material/'
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import {useQuery,useMutation} from 'react-query'
import {getUser} from '../Api/userApi'
import CommentBtn from './commentBtn'
import DeleteCommentBtn from './deleteComment'

const ReviewDoc = ({doc}) => {
  const [open, setOpen] = useState(false)
  const [body, setBody] = useState('')
  
  const { isLoading, isError, data, error } = useQuery(['person',doc.userId],() => getUser(doc.userId))
  console.log(data)

  if(isError){console.log(error)}
  
  const {comments,documents, status, createdAt} = doc
  console.log(doc)
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
  
  return (
    <div>
      <Paper>
         <Container maxWidth={'lg'}>

           <Typography><h1>{data?.data.username}</h1> <h3>Documents({doc && doc.documents.length})</h3></Typography> 
            <Typography >
              <h2 style={{fontWeight: 'bold',position: 'absolute',right: '10px'}}>Status:<span style={{color: 'red'}}>{status}</span></h2>
            </Typography>
            
            <div>
            <Typography variant="h2" gutterBottom mt="2" align="center"  onClick={handleClick}>
              Documents {open? <ExpandLess/> : <ExpandMore/>}
             </Typography>
             <Collapse in={open}>
              {documents.map((document)=> {
                return(
                  <>
                  <a href={`data:application/pdf;base64,${BufferToBase64(document.file)}`} download='application.pdf'>download</a>
                   <embed src={`data:application/pdf;base64,${BufferToBase64(document.file)}`} /> 
                 </>  
                )
              })}
             </Collapse>
            
            </div> 
            <div style={{border: '1px solid #00000055',borderRadius:'20px', }}>
              <Typography variant="h5" align="center" sx={{fontWeight: 'bold',textDecoration: 'underline'}}>Comments</Typography>
              {comments && comments.map(comment => {
                return(
                  <Typography variant="h6" align="center" gutterBottom="true" sx={{fontFamily:"Georgia, serif"}}>
                    {comment.body} <DeleteCommentBtn commentId={comment._id} docId={doc._id}/>
                  </Typography>
                )
              })}
            </div>
            
            
            <TextField id="comments" fullWidth='true' minRows="3" margin="dense" variant="outlined" value={body} onChange={(e) => {setBody(e.target.value) }}/>
            <CommentBtn id={doc._id} body={body}/>
         </Container>   
        </Paper> 
        <Divider/>  
    </div>
  )
}

export default ReviewDoc