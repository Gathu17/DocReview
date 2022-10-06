import {Paper,Divider,Container} from '@mui/material/'
import React,{useState} from 'react'
import {Document, Page, pdfjs} from 'react-pdf'
import UpdateDocButton from './updateDocButton'



const Doc = ({data}) => {
  const {name,file,_id} = data
  console.log(_id)

  console.log(name)
  let str = ""
  var bytes = new Uint8Array(file.data )
    bytes.forEach(function(index) {
    str += String.fromCharCode(index)
  })

  const base64String = btoa(
    str
  )
  console.log(base64String)
  

  return (
    <div className="doc-container">
        <Paper>
         <Container maxWidth={'lg'}>
            <h1>{name}</h1>
            <div>File:
            <a href={`data:application/pdf;base64,${base64String}`} download='application.pdf'>download</a>
            <embed src={`data:application/pdf;base64,${base64String}`} />
            </div> 
            <UpdateDocButton name={name} docId={_id}/>
         </Container>   
        </Paper> 
        <Divider/>  
    </div>  
  )
}

export default Doc