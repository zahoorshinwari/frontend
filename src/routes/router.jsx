import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Home from '../pages/home/Home'
import LogIn from '../pages/user/LogIn'
import SignUp from '../pages/user/SignUp'

import Dashboard from '../pages/dashboard/Dashboard'
import AllCustomer from '../pages/dashboard/allcustomer/AllCustomer'
import Admin from '../pages/admin/Admin'
import AdminDAshboard from '../pages/admin/AdminDAshboard'
import AllProduct from '../pages/dashboard/products/AllProduct'



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <LogIn />
            },
            {
                path: "/signup",
                element: <SignUp />
            },
         
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/allcustomer",
                element: <AllCustomer />
            },

            {
                path: "/admin",
                element: <Admin />
            },
            {
                path: "/admin-dashboard",
                element: <AdminDAshboard />
            },
            {
                path: "/allproducts",
                element: <AllProduct />
            },
           
            
            

        ]
    },
])

export default router