import DocNavbar from "./DocNavbar"
import Sidebar from "./Sidebar"


interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <DocNavbar />
            <div className="flex overflow-hidden h-[calc(100vh-4rem)]">
                <Sidebar />
                <main className="flex-1 p-6 overflow-y-auto">{children}</main>
            </div>
        </div>
    )
}

