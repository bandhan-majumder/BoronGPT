import { SidebarProvider, SidebarTrigger } from "@repo/ui/index"
import { AppSidebar } from "../../../packages/ui/components/app-sidebar"

export default function SideBarLayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
          backgroundColor: "#191A1A",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <main
        className="min-h-screen p-6"
        style={{ marginLeft: "var(--sidebar-width)" }}
      >
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
