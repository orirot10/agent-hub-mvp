import { ReactNode } from 'react'
import DashboardHeader from './DashboardHeader'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="p-6">
      <DashboardHeader />
      {children}
    </div>
  )
}
