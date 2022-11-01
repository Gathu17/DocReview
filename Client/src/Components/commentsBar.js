import React from 'react'

const CommentsBar = ({comments}) => {
  
  return (
    <div className="comments-container">
      <h2 style={{fontFamily: 'Helvetica',fontWeight: 'bold', textAlign: 'center',textDecoration: 'underline', marginTop: '8%'}}>Comments</h2>
      <ul>
        {comments.map(comment =>{
        return(
          <li key={comment._id} style={{fontSize: '1rem'}}> {comment.body}</li>
        )
      })}
      </ul>
      
    </div>
  )
}

export default CommentsBar