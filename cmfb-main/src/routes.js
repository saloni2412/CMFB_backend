import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Home = React.lazy(() => import('./views/pages/Home'))
const FoodBanks = React.lazy(() => import('./views/pages/FoodBanks'))
const InventoryManagement = React.lazy(() => import('./views/pages/InventoryManagement'))
const Users = React.lazy(() => import('./views/pages/Users'))
const Donations = React.lazy(() => import('./views/pages/Donations'))
const Feedbacks = React.lazy(() => import('./views/pages/Feedbacks'))
const Login = React.lazy(() => import('./views/pages/Login'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'Login', element: Login },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/home', name: 'Home', element: Home },
  { path: '/food-banks', name: 'Food Banks', element: FoodBanks },
  { path: '/users', name: 'Users', element: Users },
  { path: '/inventory-management', name: 'Inventory Management', element: InventoryManagement },
  { path: '/donations', name: 'Donations', element: Donations },
  { path: '/feedbacks', name: 'Feedbacks', element: Feedbacks },
]

export default routes
