import { Outlet, ScrollRestoration } from 'react-router-dom'
import { useState } from 'react'
import { Sheet, SheetContent } from '@/components/ui/sheet.tsx'
import { Sidebar, SideBarSheetContext } from '@/components/layout/Sidebar.tsx'
import { Header } from '@/components/layout/Header.tsx'
import { Footer } from '@/components/layout/Footer.tsx'
import { Toaster } from 'sonner'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-gray-200 lg:px-6" />
      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SideBarSheetContext.Provider value={true}>
          <SheetContent side="left">
            <Sidebar className="h-full" />
          </SheetContent>
        </SideBarSheetContext.Provider>
      </Sheet>

      <div className="lg:pl-72">
        <Header
          className="sticky top-0 z-40"
          onClickMenu={() => setSidebarOpen(true)}
        />

        <main className="bg-brand-background px-4 py-10 text-white sm:px-6 lg:px-8">
          <Outlet />
        </main>

        <Footer />
      </div>

      <ScrollRestoration />

      <Toaster richColors />
    </>
  )
}
