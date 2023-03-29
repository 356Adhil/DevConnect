import React from 'react'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import UserManage from '../../../components/admin/usermanage/UserManage'

function AdminUsers() {
  return (
    <div>
      <Sidebar />
      <div className="py-24 p-5  md:p-32 md:ml-40 ">
          <UserManage />
        </div>
    </div>
  )
}

export default AdminUsers
