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
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NewStudent = () => {
  const [id, setId] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState(0)
  const [major, setMajor] = useState('')
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState('')
  const [existingIds, setExistingIds] = useState([])
  const [fieldErrors, setFieldErrors] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8080/students')
        const data = await response.json()
        setExistingIds(data.map(student => student.id))
      } catch (error) {
        console.error('Error fetching students:', error)
      }
    }
    fetchStudents()
  }, [])

  const validateForm = () => {
    const nameRegex = /^[A-Z][a-zA-Z]{2,}$/
    const ageRegex = /^(1[89]|[2-9]\d|1[01]\d|120)$/
    const majorRegex = /^(Art|Math|CS)$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const errors = {}

    if (existingIds.includes(parseInt(id))) {
      errors.id = 'ID must be unique.'
    }
    if (!nameRegex.test(firstName)) {
      errors.firstName = 'First name should start with an uppercase letter and be more than 2 letters.'
    }
    if (!nameRegex.test(lastName)) {
      errors.lastName = 'Last name should start with an uppercase letter and be more than 2 letters.'
    }
    if (!ageRegex.test(age)) {
      errors.age = 'Age should be more than 18 and less than 120.'
    }
    if (!majorRegex.test(major)) {
      errors.major = 'Major should be either Art, Math, or CS.'
    }
    if (!emailRegex.test(email)) {
      errors.email = 'Email should be in a standard format (example@gmail.com).'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSave = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8080/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({ id, firstName, lastName, age, major, email }),
      })
      if (response.status === 201) { // Changed to 201 Created
        setSuccess('Student added successfully')
        navigate('/dashboard/studentList')
      } else {
        setFieldErrors({ form: 'Error adding student' })
      }
    } catch (error) {
      setFieldErrors({ form: 'An error occurred. Please try again.' })
    }
  }

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>New Student</CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSave}>
                {fieldErrors.form && <div style={{ color: 'red' }}>{fieldErrors.form}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
                <CFormLabel htmlFor="id">ID</CFormLabel>
                <CFormInput
                  type="number"
                  id="id"
                  onChange={(e) => setId(e.target.value)}
                  style={{ borderColor: fieldErrors.id ? 'red' : '' }}
                />
                {fieldErrors.id && <div style={{ color: 'red' }}>{fieldErrors.id}</div>}
                <CFormLabel htmlFor="firstName">First Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ borderColor: fieldErrors.firstName ? 'red' : '' }}
                />
                {fieldErrors.firstName && <div style={{ color: 'red' }}>{fieldErrors.firstName}</div>}
                <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ borderColor: fieldErrors.lastName ? 'red' : '' }}
                />
                {fieldErrors.lastName && <div style={{ color: 'red' }}>{fieldErrors.lastName}</div>}
                <CFormLabel htmlFor="age">Age</CFormLabel>
                <CFormInput
                  type="number"
                  id="age"
                  onChange={(e) => setAge(e.target.value)}
                  style={{ borderColor: fieldErrors.age ? 'red' : '' }}
                />
                {fieldErrors.age && <div style={{ color: 'red' }}>{fieldErrors.age}</div>}
                <CFormLabel htmlFor="major">Major</CFormLabel>
                <CFormInput
                  type="text"
                  id="major"
                  onChange={(e) => setMajor(e.target.value)}
                  style={{ borderColor: fieldErrors.major ? 'red' : '' }}
                />
                {fieldErrors.major && <div style={{ color: 'red' }}>{fieldErrors.major}</div>}
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderColor: fieldErrors.email ? 'red' : '' }}
                />
                {fieldErrors.email && <div style={{ color: 'red' }}>{fieldErrors.email}</div>}
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