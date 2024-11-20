import React from 'react'
import AddNewStudent from './AddNewStudent'
import UploadStudentCSV from './UploadStudentCSV'
const Index = () => {
  return (
    <div style={{width:'100%', display:'flex' , flexDirection:'column', justifyContent:'end'}}>
      <AddNewStudent/>
      <UploadStudentCSV/>
    </div>
  )
}

export default Index
