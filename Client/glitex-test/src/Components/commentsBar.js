import React from 'react'

const CommentsBar = ({comments}) => {
  
  return (
    <div className="comments-container">
      <h2 style={{fontFamily: 'Helvetica',fontWeight: 'bold', textAlign: 'center'}}>Comments</h2>
      {comments.map(comment =>{
        return(
          <p id={comment._id}>- {comment.body}</p>
        )
      })}
    </div>
  )
}

export default CommentsBar