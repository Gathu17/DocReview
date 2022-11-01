import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFolderOpen, faPlus} from '@fortawesome/free-solid-svg-icons'
import {useQuery} from 'react-query'
import {Link} from 'react-router-dom'
import './home.css'
import Document from '../../Components/document'
import { getUserDoc,getDocs } from '../../Api/docApi'
import {Stack} from '@mui/material'
import {useSelector} from 'react-redux'
import ReviewDoc from '../../Components/reviewDoc'
import CommentBar from '../../Components/commentsBar'
import {loadingDocs, loadedDocs} from '../../Redux/docRedux'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'

const Home = () => {
const docImg = <FontAwesomeIcon icon={faFolderOpen} size='3x'/>
const addIcon = <FontAwesomeIcon icon={faPlus} size='3x'/>
const navigate = useNavigate();

const user =  useSelector((state)=> state.user.user)
const token = useSelector((state)=> state.user.token)
if(!token){
  navigate('/login',{replace: true})
}
const dispatch = useDispatch()
const { isLoading, isError, data, error ,isFetched} = useQuery(['doc'],getUserDoc,{
  enabled: user.role === 'user',
});
const docs = useQuery(['docs'],getDocs,{
enabled: user.role === 'review' ,
retry: true
})
if(isLoading){
  dispatch(loadingDocs())
}else if(data &&  isFetched){
  console.log(data)
  dispatch(loadedDocs({ data: data.data[0]?.documents, quantity: data.data[0]?.documents.length }))
}

console.log(docs,isLoading,isError)
if(isError || docs?.isError){
  window.location.reload()
  console.log(error)
}



  return (
    <div className="home-container">
      <Stack spacing={5} direction="column">

        {user.role === 'review' ? !docs.isLoading && docs?.data && docs?.data?.data.map((doc)=>{
          return(
            <ReviewDoc key={doc.id} doc={doc}/>
          )
        }) : (!isLoading && data && data?.data[0].documents.map((data)=>{
        
        return(
         <Document id={data._id}  data={data}/>
        )
        
      }))}
      
      </Stack>
      {data?.data[0] && <CommentBar comments={data.data[0].comments}/>}
      {
        !data?.data[0].documents && !docs?.data  &&   (<div className="logo-container">
       
        <div>{docImg}</div>
       <div>No documents in review</div>
      </div>)
      }
      { user.role === "user" &&  <Link className="file-btn" to="/files" >{addIcon}</Link> }
    </div>
  )
}

export default Home