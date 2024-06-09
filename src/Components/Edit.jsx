import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { useParams } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'


const Edit = () => {

  const { id } = useParams()
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('')
  const db = getFirestore()

  useEffect(() => {
    const fetchDocumentContent = async () => {
      try {
        if (!id) return

        const documentRef = doc(db, 'documents', id)
        const documentSnapshot = await getDoc(documentRef)

        if (documentSnapshot.exists()) {
          const documentData = documentSnapshot.data()
          setTitle(documentData.title)
          setValue(documentData.content)
        } else {
          console.log('Document not found');
        }
      } catch (error) {
        console.error('Error fetching document:' , error);
      }
    }
    fetchDocumentContent()
  }, [db, id])

  const handleContentChange = async(newValue) => {
    setValue(newValue)
    try {
      const documentRef = doc(db, 'documents', id)
      await updateDoc(documentRef, { content: newValue})
    } catch (error) {
      console.error('Error updating document:' , error);
    }
  }

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
  ];

  const module = {
    toolbar: toolbarOptions
  }


  return (
    <>
      <div className="container d-flex justify-content-center mt-5">
        <div className="w-100">
          <h2 className='p-2'> {title} : </h2>
          <ReactQuill className='mt-5' module={{ toolbar: toolbarOptions }} theme='snow' value={value || ''}  onChange={handleContentChange}/>
        </div>
      </div>
    </>
  )
}

export default Edit