import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const StudentList = React.lazy(() => import('./views/students/StudentList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/studentList', name: 'StudentList', element: StudentList },
]

export default routes
