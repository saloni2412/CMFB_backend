import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDollar,
  cilFastfood,
  cilFolderOpen,
  cilNotes,
  cilSpeedometer,
  cilUser,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Food Banks',
    to: '/food-banks',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Inventory Management',
    to: '/inventory-management',
    icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Donations',
    to: '/donations',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Feedbacks',
    to: '/feedbacks',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
]

export default _nav
