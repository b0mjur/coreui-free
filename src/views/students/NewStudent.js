import {
  CCard,
  CCardHeader,
  CContainer,
  CRow,
  CCol,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
} from '@coreui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewStudent = () => {
  const [id, setId] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState(0)
  const [major, setMajor] = useState('')
  const navigate = useNavigate()

  const handleSave = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8080/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({ id, firstName, lastName, age, major }),
      })
      if (response.status === 200) {
        setSuccess('Student added successfully')
        navigate('/dashboard/studentList')
      } else {
        setError('Error')
      }
    } catch (error) {}
  }

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>New Student</CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSave}>
                <CFormLabel htmlFor="id">ID</CFormLabel>
                <CFormInput type="number" id="id" onChange={(e) => setId(e.target.value)} />
                <CFormLabel htmlFor="firstName">First Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <CFormLabel htmlFor="age">Age</CFormLabel>
                <CFormInput type="text" id="age" onChange={(e) => setAge(e.target.value)} />
                <CFormLabel htmlFor="major">Major</CFormLabel>
                <CFormInput type="text" id="major" onChange={(e) => setMajor(e.target.value)} />
                <div style={{ justifyContent: 'center', display: 'flex', marginTop: '15px' }}>
                  <CButton type="submit" color="primary">
                    Save
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default NewStudent
