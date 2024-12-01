import { ModeToggle } from "./ModeToggle";


export default function DocNavbar() {
    return (
        <nav className="bg-background border-b h-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <span className="font-bold text-xl">API Documentation</span>
                    </div>
                    <div>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    )
}

