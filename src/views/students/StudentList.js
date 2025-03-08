import React, { useEffect, useState } from "react"
import { CContainer, CRow, CCol, CCard, CTable, CCardBody, CCardHeader, CTableHead, CTableHeaderCell, CTableRow, CTableBody, CTableDataCell, CSpinner } from "@coreui/react"

const StudentList = () => {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('http://localhost:8080/students?page=0', {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token,
                    }
                })
                const data = await response.json()
                setStudents(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching students:', error)
                setLoading(false)
            }
        }
        fetchStudents()
    }, [])

    if (loading) {
        return (
            <div className="text-center">
                <CSpinner color="primary" />
            </div>
        )
    }

    return (
        <CContainer>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Student List
                        </CCardHeader>
                        <CCardBody>
                            <CTable>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>ID</CTableHeaderCell>
                                        <CTableHeaderCell>First Name</CTableHeaderCell>
                                        <CTableHeaderCell>Last Name</CTableHeaderCell>
                                        <CTableHeaderCell>Age</CTableHeaderCell>
                                        <CTableHeaderCell>Major</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {students.map((student) => (
                                        <CTableRow key={student.id}>
                                            <CTableDataCell>{student.id}</CTableDataCell>
                                            <CTableDataCell>{student.firstName}</CTableDataCell>
                                            <CTableDataCell>{student.lastName}</CTableDataCell>
                                            <CTableDataCell>{student.age}</CTableDataCell>
                                            <CTableDataCell>{student.major}</CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default StudentList