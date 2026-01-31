import { Outlet } from 'react-router'

export const Menu = () => {
  return (
     <div>
      <h1>Dashboard</h1>
  
      <Outlet />
    </div>
  )
}
