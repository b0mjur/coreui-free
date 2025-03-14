import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'SMS Student',
    to: '/',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />, // Using cilStar as the icon
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'StudentList',
    to: '/dashboard/studentList',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },

  { 
    component: CNavItem,
    name: 'New Student',
    to: '/dashboard/newStudent',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  }
]

export default _nav