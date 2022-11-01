import React,{useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import { Button } from '@mui/material';
import {updateDoc} from '../Api/docApi'
import {useForm} from  'react-hook-form'

const AddDoc = ({name,docId}) => {
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState('')
  const queryClient = useQueryClient()


const mutation = useMutation(['document',docId], updateDoc,{
  onSuccess: (data) => {
      console.log(data,'updated');
      queryClient.invalidateQueries(['doc'])
    },
  onError: (error) => {
      console.log(error);
    }
})

async function onSubmit(data){
 console.log(data.file[0])

const formData = new FormData()
formData.append('file',data.file[0],data.file[0].name)

for (const pair of formData.entries()) {
  console.log(pair[1]);
}
 console.log(formData)
await mutation.mutateAsync({id:docId,doc:formData}).then(()=> setFile(''))
}

 
  return (
    <div>
    {
     file ?  <Button variant="contained" color="success" onClick={handleSubmit(onSubmit)}>Submit</Button>
                  :(<form onSubmit={handleSubmit(onSubmit)}>
      <input className="file" type="file" {...register("file",{
         onChange: (e) => setFile(e.target.value)
      })} />
      </form>)
    }
      
      
    </div>
  )
}

export default AddDoc