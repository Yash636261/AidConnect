import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyButton } from './CopyButton'

export default function ApiDocs() {

  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold mb-4">API Documentation for Disaster Relief Data Collection</h1>
      <p>
        Welcome to the <strong>Disaster Relief Data Collection API</strong> documentation. This API allows users to collect and retrieve data from various social media platforms during disaster situations, specifically focused on the Chennai floods. Below, you will find detailed information on how to use these endpoints, their parameters, and additional tips for seamless integration.
      </p>

      <section id="getting-started">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p>To begin using the <strong>Disaster Relief Data Collection API</strong>, follow these simple steps:</p>
        <ol className="list-decimal list-inside space-y-2 mt-2">
          <li><strong>Base URL</strong><br />All API requests should be made to: <code>{`${url}`}</code></li>
          <li><strong>Request Format</strong>
            <ul className="list-disc list-inside ml-4">
              <li>All endpoints accept and return <code>JSON</code> data</li>
              <li>Include header: <code>Content-Type: application/json</code></li>
            </ul>
          </li>
        </ol>
      </section>

      <section id="endpoints">
        <h2 className="text-2xl font-semibold mb-4">Endpoints</h2>

        <Card id="data-retrieval" className="mb-8">
          <CardHeader>
            <CardTitle>1. Data Retrieval Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="font-semibold">Get All Sources Data</h4>
            <div className="flex items-center justify-between mb-2">
              <code className="block bg-muted p-2 rounded">GET /api/source</code>
              <CopyButton text={`${url}/api/source`} />
            </div>

            <h4 className="font-semibold mt-4">Get Tweets Data</h4>
            <div className="flex items-center justify-between mb-2">
              <code className="block bg-muted p-2 rounded">GET /api/source/tweets</code>
              <CopyButton text={`${url}/api/source/tweets`} />
            </div>

            <h4 className="font-semibold mt-4">Get Facebook Post Data</h4>
            <div className="flex items-center justify-between mb-2">
              <code className="block bg-muted p-2 rounded">GET /api/source/facebook</code>
              <CopyButton text={`${url}/api/source/facebook`} />
            </div>

            <h4 className="font-semibold mt-4">Get Instagram Stories Data</h4>
            <div className="flex items-center justify-between mb-2">
              <code className="block bg-muted p-2 rounded">GET /api/source/instagram</code>
              <CopyButton text={`${url}/api/source/instagram`} />
            </div>

            <h4 className="font-semibold mt-4">Fetch Disaster Cases</h4>
            <div className="flex items-center justify-between mb-2">
              <code className="block bg-muted p-2 rounded">GET /api/disaster-cases</code>
              <CopyButton text={`${url}/api/disaster-cases`} />
            </div>

            <p className="mt-4">These endpoints allow retrieval of data from various sources and disaster cases. They return the collected data in JSON format.</p>
          </CardContent>
        </Card>

        <Card id="instagram-scraping" className="mb-8">
          <CardHeader>
            <CardTitle>2. Instagram Scraping Endpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">URL</h4>
              <CopyButton text={`${url}/api/scraping/instagram`} />
            </div>
            <code className="block bg-muted p-2 rounded">POST /api/scraping/instagram</code>

            <h4 className="font-semibold mt-4">Description</h4>
            <p>This endpoint allows users to scrape Instagram posts by searching specific hashtags. It fetches public posts that match the provided hashtags, with the option to limit the number of results.</p>

            <div className="flex items-center justify-between mt-4 mb-2">
              <h4 className="font-semibold">cURL Command</h4>
              <CopyButton text={`curl -X POST \\
${url}/api/scraping/instagram \\
-H 'Content-Type: application/json' \\
-d '{
  "hashtags": ["travel", "photography"],
  "limit": 5
}'`} />
            </div>
            <pre className="bg-muted p-2 rounded overflow-x-auto">
              {`curl -X POST \\
${url}/api/scraping/instagram \\
-H 'Content-Type: application/json' \\
-d '{
  "hashtags": ["travel", "photography"],
  "limit": 5
}'`}
            </pre>

            <h4 className="font-semibold mt-4">Parameters</h4>
            <table className="min-w-full border border-border mt-2">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2">Name</th>
                  <th className="border border-border p-2">Type</th>
                  <th className="border border-border p-2">Description</th>
                  <th className="border border-border p-2">Required</th>
                  <th className="border border-border p-2">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">hashtags</td>
                  <td className="border border-border p-2"><code>Array</code></td>
                  <td className="border border-border p-2">List of hashtags to search for</td>
                  <td className="border border-border p-2">Yes</td>
                  <td className="border border-border p-2">N/A</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">limit</td>
                  <td className="border border-border p-2"><code>Number</code></td>
                  <td className="border border-border p-2">Maximum number of posts to retrieve</td>
                  <td className="border border-border p-2">No</td>
                  <td className="border border-border p-2">20</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card id="twitter-scraping" className="mb-8">
          <CardHeader>
            <CardTitle>3. Twitter Scraping Endpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">URL</h4>
              <CopyButton text={`${url}/api/scraping/tweet`} />
            </div>
            <code className="block bg-muted p-2 rounded">POST /api/scraping/tweet</code>

            <h4 className="font-semibold mt-4">Description</h4>
            <p>This endpoint retrieves tweets from Twitter based on the specified search query and filters. Users can customize the search by query type (e.g., latest or popular), language, and date range. It is ideal for collecting insights or monitoring trends.</p>

            <div className="flex items-center justify-between mt-4 mb-2">
              <h4 className="font-semibold">cURL Command</h4>
              <CopyButton text={`curl -X POST \\
${url}/api/scraping/tweet \\
-H 'Content-Type: application/json' \\
-d '{
  "twitterContent": "artificial intelligence",
  "maxItems": 5,
  "queryType": "Latest",
  "lang": "en",
  "since": "2024-01-01_00:00:00_UTC",
  "until": "2024-12-31_23:59:59_UTC"
}'`} />
            </div>
            <pre className="bg-muted p-2 rounded overflow-x-auto">
              {`curl -X POST \\
${url}/api/scraping/tweet \\
-H 'Content-Type: application/json' \\
-d '{
  "twitterContent": "artificial intelligence",
  "maxItems": 5,
  "queryType": "Latest",
  "lang": "en",
  "since": "2024-01-01_00:00:00_UTC",
  "until": "2024-12-31_23:59:59_UTC"
}'`}
            </pre>

            <h4 className="font-semibold mt-4">Parameters</h4>
            <table className="min-w-full border border-border mt-2">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2">Name</th>
                  <th className="border border-border p-2">Type</th>
                  <th className="border border-border p-2">Description</th>
                  <th className="border border-border p-2">Required</th>
                  <th className="border border-border p-2">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">twitterContent</td>
                  <td className="border border-border p-2"><code>String</code></td>
                  <td className="border border-border p-2">Search query</td>
                  <td className="border border-border p-2">Yes</td>
                  <td className="border border-border p-2">N/A</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">maxItems</td>
                  <td className="border border-border p-2"><code>Number</code></td>
                  <td className="border border-border p-2">Maximum number of tweets to retrieve</td>
                  <td className="border border-border p-2">No</td>
                  <td className="border border-border p-2">10</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">queryType</td>
                  <td className="border border-border p-2"><code>String</code></td>
                  <td className="border border-border p-2">Type of search (e.g., "Latest", "Popular")</td>
                  <td className="border border-border p-2">No</td>
                  <td className="border border-border p-2">Latest</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">lang</td>
                  <td className="border border-border p-2"><code>String</code></td>
                  <td className="border border-border p-2">Language filter (e.g., "en" for English)</td>
                  <td className="border border-border p-2">No</td>
                  <td className="border border-border p-2">en</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">since</td>
                  <td className="border border-border p-2"><code>String</code></td>
                  <td className="border border-border p-2">Start date for search (UTC format)</td>
                  <td className="border border-border p-2">No</td>
                  <td className="border border-border p-2">N/A</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">until</td>
                  <td className="border border-border p-2"><code>String</code></td>
                  <td className="border border-border p-2">End date for search (UTC format)</td>
                  <td className="border border-border p-2">No</td>
                  <td className="border border-border p-2">N/A</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card id="facebook-scraping" className="mb-8">
          <CardHeader>
            <CardTitle>4. Facebook Scraping Endpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">URL</h4>
              <CopyButton text={`${url}/api/scraping/facebook`} />
            </div>
            <code className="block bg-muted p-2 rounded">POST /api/scraping/facebook</code>

            <h4 className="font-semibold mt-4">Description</h4>
            <p>This endpoint searches Facebook for posts or pages related to the specified query. It is designed to fetch posts or pages based on a keyword or a specific type (e.g., posts, pages), with an optional limit on the number of results.</p>

            <div className="flex items-center justify-between mt-4 mb-2">
              <h4 className="font-semibold">cURL Command</h4>
              <CopyButton text={`curl -X POST \\
${url}/api/scraping/facebook \\
-H 'Content-Type: application/json' \\
-d '{
  "query": "tesla",
  "search_type": "posts",
  "max_posts": 5
}'`} />
            </div>
            <pre className="bg-muted p-2 rounded overflow-x-auto">
              {`curl -X POST \\
${url}/api/scraping/facebook \\
-H 'Content-Type: application/json' \\
-d '{
  "query": "tesla",
  "search_type": "posts",
  "max_posts": 5
}'`}
            </pre>

            <h4 className="font-semibold mt-4">Parameters</h4>
            <table className="min-w-full border border-border mt-2">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2">Name</th>
                  <th className="border border-border p-2">Type</th>
                  <th className="border border-border p-2">Description</th>
                  <th className="border border-border p-2">Required</th>
                  <th className="border border-border p-2">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">query</td>
                  <td className="border border-border p-2"><code>String</code></td>
                  <td className="border border-border p-2">Search term or page name</td>
                  <td className="border border-border p-2">Yes</td>
                  <td className="border border-border p-2">N/A</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">search_type</td>
                  <td className="border border-border p-2"><code>String</code></td>
                  <td className="border border-border p-2">Type of search (e.g., "posts", "pages")</td>
                  <td className="border border-border p-2">Yes</td>
                  <td className="border border-border p-2">N/A</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">max_posts</td>
                  <td className="border border-border p-2"><code>Number</code></td>
                  <td className="border border-border p-2">Maximum number of posts to retrieve</td>
                  <td className="border border-border p-2">No</td>
                  <td className="border border-border p-2">10</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      <section id="rate-limits">
        <h2 className="text-2xl font-semibold mb-4">Rate Limits</h2>
        <table className="min-w-full border border-border mt-2">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-2">Header</th>
              <th className="border border-border p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-2"><code>X-RateLimit-Limit</code></td>
              <td className="border border-border p-2">Maximum requests allowed per minute.</td>
            </tr>
            <tr>
              <td className="border border-border p-2"><code>X-RateLimit-Remaining</code></td>
              <td className="border border-border p-2">Requests remaining in the current time window.</td>
            </tr>
            <tr>
              <td className="border border-border p-2"><code>X-RateLimit-Reset</code></td>
              <td className="border border-border p-2">Time until the rate limit resets (UTC epoch).</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="error-responses">
        <h2 className="text-2xl font-semibold mb-4">Error Responses</h2>
        <table className="min-w-full border border-border mt-2">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-2">Status Code</th>
              <th className="border border-border p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-2">429</td>
              <td className="border border-border p-2">Too Many Requests. Exceeded the rate limit.</td>
            </tr>
            <tr>
              <td className="border border-border p-2">503</td>
              <td className="border border-border p-2">Service Unavailable. Temporary server overload.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="need-help">
        <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
        <p>For detailed guides, FAQs, or community support, refer to:</p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li><a href="#" className="text-primary hover:underline">Tutorials</a></li>
          <li><a href="#" className="text-primary hover:underline">FAQs</a></li>
          <li><a href="#" className="text-primary hover:underline">Developer Forum</a></li>
        </ul>
        <p className="mt-4">Feel free to raise issues or submit queries. Happy coding!</p>
      </section>
    </div>
  )
}

