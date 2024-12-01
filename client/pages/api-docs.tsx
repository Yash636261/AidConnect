import { useState, useEffect } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Layout from '../components/Layout'

export default function ApiDocs() {
    const [mdxSource, setMdxSource] = useState(null)

    useEffect(() => {
        async function loadMdxSource() {
            const markdown = `
# API Documentation for Scraping Endpoints

Welcome to the **Scraping API** documentation. This API allows users to scrape content from popular social media platforms such as Instagram, Twitter, and Facebook. Below, you will find detailed information on how to use these endpoints, their parameters, and additional tips for seamless integration.

---

## Getting Started

To begin using the **Scraping API**, ensure you have completed the following steps:

1. **Run the Server**  
   Ensure your backend server is running at \`http://localhost:8000\` or replace the base URL with your server's address.

2. **Authentication**  
   Configure the \`.env\` file with a valid \`APIFY_API_TOKEN\`.

3. **Dependencies**  
   Install all required dependencies specified in your project.

4. **Request Format**  
   - Use \`HTTPS\` for all API requests.
   - Ensure the request body is in \`JSON\` format.

---

## Endpoints

### 1. Instagram Scraping Endpoint

#### **URL**
\`POST /api/scraping/instagram\`

#### **Description**
This endpoint allows users to scrape Instagram posts by searching specific hashtags. It fetches public posts that match the provided hashtags, with the option to limit the number of results.

#### **cURL Command**
\`\`\`bash
curl -X POST \\
  http://localhost:8000/api/scraping/instagram \\
  -H 'Content-Type: application/json' \\
  -d '{
    "hashtags": ["travel", "photography"],
    "limit": 5
}'
\`\`\`

#### **Parameters**
| Name      | Type     | Description                                | Required | Default |
|-----------|----------|--------------------------------------------|----------|---------|
| hashtags  | \`Array\`  | List of hashtags to search for             | Yes      | N/A     |
| limit     | \`Number\` | Maximum number of posts to retrieve        | No       | 20      |

---

### 2. Twitter Scraping Endpoint

#### **URL**
\`POST /api/scraping/tweet\`

#### **Description**
This endpoint retrieves tweets from Twitter based on the specified search query and filters. Users can customize the search by query type (e.g., latest or popular), language, and date range. It is ideal for collecting insights or monitoring trends.

#### **cURL Command**
\`\`\`bash
curl -X POST \\
  http://localhost:8000/api/scraping/tweet \\
  -H 'Content-Type: application/json' \\
  -d '{
    "twitterContent": "artificial intelligence",
    "maxItems": 5,
    "queryType": "Latest",
    "lang": "en",
    "since": "2024-01-01_00:00:00_UTC",
    "until": "2024-12-31_23:59:59_UTC"
}'
\`\`\`

#### **Parameters**
| Name          | Type     | Description                                     | Required | Default   |
|---------------|----------|-------------------------------------------------|----------|-----------|
| twitterContent| \`String\` | Search query                                    | Yes      | N/A       |
| maxItems      | \`Number\` | Maximum number of tweets to retrieve            | No       | 10        |
| queryType     | \`String\` | Type of search (e.g., "Latest", "Popular")      | No       | Latest    |
| lang          | \`String\` | Language filter (e.g., "en" for English)        | No       | en        |
| since         | \`String\` | Start date for search (UTC format)              | No       | N/A       |
| until         | \`String\` | End date for search (UTC format)                | No       | N/A       |

---

### 3. Facebook Scraping Endpoint

#### **URL**
\`POST /api/scraping/facebook\`

#### **Description**
This endpoint searches Facebook for posts or pages related to the specified query. It is designed to fetch posts or pages based on a keyword or a specific type (e.g., posts, pages), with an optional limit on the number of results.

#### **cURL Command**
\`\`\`bash
curl -X POST \\
  http://localhost:8000/api/scraping/facebook \\
  -H 'Content-Type: application/json' \\
  -d '{
    "query": "tesla",
    "search_type": "posts",
    "max_posts": 5
}'
\`\`\`

#### **Parameters**
| Name         | Type     | Description                                | Required | Default |
|--------------|----------|--------------------------------------------|----------|---------|
| query        | \`String\` | Search term or page name                   | Yes      | N/A     |
| search_type  | \`String\` | Type of search (e.g., "posts", "pages")     | Yes      | N/A     |
| max_posts    | \`Number\` | Maximum number of posts to retrieve        | No       | 10      |

---

## Authentication

The **Scraping API** uses API tokens for authentication. Add your token to the \`.env\` file using the key \`APIFY_API_TOKEN\`. Each request must include the token to authenticate successfully.

#### **Error Response**
| Status Code | Description                            |
|-------------|----------------------------------------|
| 401         | Unauthorized. Invalid or missing token. |

---

## Rate Limits

| Header                  | Description                                    |
|-------------------------|------------------------------------------------|
| \`X-RateLimit-Limit\`     | Maximum requests allowed per minute.           |
| \`X-RateLimit-Remaining\` | Requests remaining in the current time window. |
| \`X-RateLimit-Reset\`     | Time until the rate limit resets (UTC epoch).  |

---

## Error Responses

| Status Code | Description                                       |
|-------------|---------------------------------------------------|
| 429         | Too Many Requests. Exceeded the rate limit.       |
| 503         | Service Unavailable. Temporary server overload.   |

---

## Need Help?

For detailed guides, FAQs, or community support, refer to:
- [Tutorials](#)
- [FAQs](#)
- [Developer Forum](#)

Feel free to raise issues or submit queries. Happy Scraping!
      `
            const mdxSource = await serialize(markdown)
            setMdxSource(mdxSource as any) // Type assertion to fix type error
        }

        loadMdxSource()
    }, [])

    return (
        <Layout>
            <div className="prose max-w-none">
                {mdxSource && <MDXRemote {...mdxSource as any} />}
            </div>
        </Layout>
    )
}

