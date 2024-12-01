import ScrollLink from './ScrollLink'

export default function Sidebar() {
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

    return (
        <aside className="w-64 bg-background border-r p-4 h-[calc(100vh-4rem)] overflow-y-auto">
            <nav>
                <ul className="space-y-2">
                    <li>
                        <ScrollLink href="#getting-started" className="text-primary hover:underline">
                            Getting Started
                        </ScrollLink>
                    </li>

                    <li>
                        <ScrollLink href="#endpoints" className="text-primary hover:underline">
                            Endpoints
                        </ScrollLink>
                        <ul className="ml-4 mt-2 space-y-2">
                            <li>
                                <ScrollLink href="#data-retrieval" className="text-muted-foreground hover:underline">
                                    Data Retrieval
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink href="#instagram-scraping" className="text-muted-foreground hover:underline">
                                    Instagram Scraping
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink href="#twitter-scraping" className="text-muted-foreground hover:underline">
                                    Twitter Scraping
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink href="#facebook-scraping" className="text-muted-foreground hover:underline">
                                    Facebook Scraping
                                </ScrollLink>
                            </li>

                        </ul>
                    </li>
                    <li>
                        <ScrollLink href="#rate-limits" className="text-primary hover:underline">
                            Rate Limits
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink href="#error-responses" className="text-primary hover:underline">
                            Error Responses
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink href="#need-help" className="text-primary hover:underline">
                            Need Help?
                        </ScrollLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

