import { Request, Response } from 'express';
import { ApifyClient } from 'apify-client';

interface InstagramSearchBody {
    hashtags: string[];
    limit?: number;
}

interface InstagramPost {
    id: string;
    url: string;
    caption?: string;
    timestamp?: string;
    likes?: number;
    comments?: number;
}

interface TwitterSearchBody {
    twitterContent: string;
    maxItems?: number;
    queryType?: string;
    lang?: string;
    since?: string;
    until?: string;
}

interface TwitterPost {
    id: string;
    url: string;
    text: string;
    timestamp: string;
    retweets: number;
    likes: number;
    replies: number;
    author: {
        username: string;
        displayName: string;
        profileUrl: string;
    };
}

const apifyClient = new ApifyClient({
    token: process.env.APIFY_API_TOKEN || ''
});

export const getInstagramPosts = async (
    req: Request<{}, {}, InstagramSearchBody>,
    res: Response
): Promise<void> => {
    try {
        const { hashtags, limit = 20 } = req.body;
        console.log('Received request with hashtags:', hashtags, 'limit:', limit);

        if (!hashtags || !Array.isArray(hashtags) || hashtags.length === 0) {
            res.status(400).json({
                success: false,
                error: 'Please provide at least one hashtag',
            });
            return;
        }

        // First, check if the Apify client is properly initialized
        if (!apifyClient) {
            throw new Error('Apify client not initialized');
        }

        console.log('Starting Apify actor run...');

        // Run the Actor with more specific options
        const run = await apifyClient.actor("reGe1ST3OBgYZSsZJ").call({
            hashtags: hashtags,
            resultsLimit: limit,
            searchType: "hashtag",
            searchLimit: limit,
        });

        console.log('Actor run completed, fetching results...');
        console.log('Dataset ID:', run.defaultDatasetId);

        // Fetch results with error handling
        if (!run.defaultDatasetId) {
            throw new Error('No dataset ID returned from actor run');
        }

        const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();
        console.log(`Retrieved ${items.length} items from dataset`);

        // Transform and validate the data
        const processedItems = items.map((item: any) => ({
            id: item.id || '',
            url: item.url || '',
            caption: item.caption || '',
            timestamp: item.timestamp || '',
            likes: item.likes || 0,
            comments: item.comments || 0,
        }));

        res.status(200).json({
            success: true,
            data: processedItems,
            count: processedItems.length,
            metadata: {
                hashtags,
                limit,
                runId: run.id,
                datasetId: run.defaultDatasetId
            }
        });

    } catch (error: any) {
        console.error('Detailed error:', {
            message: error.message,
            stack: error.stack,
            details: error.details || {},
        });

        res.status(500).json({
            success: false,
            error: 'Failed to fetch Instagram data',
            details: error.message,
            errorType: error.name,
        });
    }
};

export const getTwitterPosts = async (
    req: Request<{}, {}, TwitterSearchBody>,
    res: Response
): Promise<void> => {
    try {
        // Get parameters from request body with defaults
        const {
            twitterContent,
            maxItems = 10,
            queryType = "Latest",
            lang = "en",
            since = "2021-12-31_23:59:59_UTC",
            until = "2024-12-31_23:59:59_UTC"
        } = req.body;

        // Validate required input
        if (!twitterContent) {
            res.status(400).json({
                success: false,
                error: 'Please provide twitterContent',
            });
            return;
        }

        // Prepare input with the correct structure
        const input = {
            twitterContent,
            maxItems,
            queryType,
            lang,
            since,
            until
        };

        console.log('Starting Twitter scraping with input:', input);

        const run = await apifyClient.actor("CJdippxWmn9uRfooo").call(input);

        if (!run.defaultDatasetId) {
            throw new Error('No dataset ID returned from actor run');
        }

        const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();
        console.log(`Retrieved ${items.length} tweets from dataset`);

        res.status(200).json({
            success: true,
            data: items,
            count: items.length,
            metadata: {
                ...input,
                runId: run.id,
                datasetId: run.defaultDatasetId
            }
        });

    } catch (error: any) {
        console.error('Twitter scraping error:', {
            message: error.message,
            stack: error.stack,
            details: error.details || {},
        });

        res.status(500).json({
            success: false,
            error: 'Failed to fetch Twitter data',
            details: error.message,
            errorType: error.name,
        });
    }
};



