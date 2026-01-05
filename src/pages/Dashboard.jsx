import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {
    const {loading : authLoading} = useSelector((state) => state.auth);
    const {loading : profileLoading} = useSelector((state) => state.profile)

    if(profileLoading || authLoading){
        return (
            <div className="mt-10">
                Loading...
            </div>
        )
    }
    return (
        <div className="flex min-h-[calc(100vh-3.5rem)]">
            {/* Sidebar: Fixed width */}
            <div className="w-[250px] bg-richblack-800">
                <Sidebar />
            </div>

            {/* Content: Expands to remaining width */}
            <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;