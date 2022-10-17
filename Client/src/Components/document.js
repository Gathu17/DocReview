import {Paper,Divider,Container} from '@mui/material/'
import React,{useState} from 'react'
import {Document, Page, pdfjs} from 'react-pdf'
import UpdateDocButton from './updateDocButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark,faDownload} from '@fortawesome/free-solid-svg-icons'
import {useMutation, useQueryClient} from 'react-query'
import {deleteFile} from '../Api/docApi'

const Doc = ({data}) => {
  const delIcon = <FontAwesomeIcon icon={faXmark} size='2x' color='red'/>
  const downloadIcon = <FontAwesomeIcon icon={faDownload} />
 const queryClient = new useQueryClient()

  const {name,file,_id} = data
  
 const mutation = useMutation(['doc'],()=> deleteFile(_id),{
  onSuccess: (data) => {
    console.log(data)
    queryClient.invalidateQueries(['doc'])
  }
 })

  let str = ""
  var bytes = new Uint8Array(file.data )
    bytes.forEach(function(index) {
    str += String.fromCharCode(index)
  })

  const base64String = btoa(
    str
  )
  
  

  return (
    <div className="doc-container">
      
        <Paper>
         <Container maxWidth={'lg'}>
            <h1>{name}</h1>  <span style={{float:'right',marginTop: '-5%'}} onClick={async () => mutation.mutateAsync()}>{delIcon}</span>
            <div style={{fontSize: "2rem", display: 'flex', justifyContent: 'space-around',marginBottom:'10px'}}>
            <embed src={`data:application/pdf;base64,${base64String}`} />
            <p>
               Download  <a  href={`data:application/pdf;base64,${base64String}`} download='application.pdf'>{downloadIcon}</a>
            </p>
         
            </div> 
            <UpdateDocButton name={name} docId={_id}/>
         </Container>   
        </Paper> 
        <Divider/>  
    </div>  
  )
}

export default Doc