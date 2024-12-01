"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Clock,
  ThumbsUp,
  MessageCircle,
  Share2,
} from "lucide-react";

// Interfaces for our social media post types
interface ITweet {
  tweetId: number;
  text: string;
  location: string;
  urgencyLevel: string;
  needs: string[];
  sentiment: string;
  hashtags: string[];
  dateTime: Date;
  geolocation: string;
  authorNameHandle: string;
  source: string;
}

interface IInstagramStory {
  storyId: string;
  userId: string;
  username: string;
  timestamp: Date;
  location: string;
  mediaType: string;
  mediaUrl: string;
  text: string;
  hashtags: string[];
  sentiment: string;
  urgency: boolean;
  placeName: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface IFacebookPost {
  postId: number;
  userId: number;
  username: string;
  timestamp: Date;
  location: string;
  mediaType: string;
  mediaUrl: string;
  text: string;
  hashtags: string[];
  sentiment: string;
  urgency: boolean;
  placeName: string;
  coordinates: number[];
  likes: number;
  comments: number;
  shares: number;
}

type SocialMediaPost = ITweet | IInstagramStory | IFacebookPost;

const SocialMediaFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("twitter");
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<SocialMediaPost[]>([]);
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all");
  const [sentimentFilter, setSentimentFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch posts (mock data for now)
  useEffect(() => {
    // In a real application, you would fetch data from an API here
    const mockPosts: SocialMediaPost[] = [
      {
        tweetId: 1,
        text: "Urgent: Flooding in downtown area. Need immediate assistance! #FloodAlert",
        location: "Downtown",
        urgencyLevel: "Critical",
        needs: ["Rescue", "Evacuation"],
        sentiment: "Urgent",
        hashtags: ["FloodAlert"],
        dateTime: new Date(),
        geolocation: "City Center",
        authorNameHandle: "@user1",
        source: "Twitter",
      },
      {
        storyId: "123",
        userId: "456",
        username: "instagramuser",
        timestamp: new Date(),
        location: "Beachfront",
        mediaType: "image",
        mediaUrl: "/placeholder.svg?height=200&width=200",
        text: "Storm approaching! Stay safe everyone. #StormWarning",
        hashtags: ["StormWarning"],
        sentiment: "Concerned",
        urgency: true,
        placeName: "Sunny Beach",
        coordinates: {
          latitude: 40.7128,
          longitude: -74.006,
        },
      },
      {
        postId: 789,
        userId: 101112,
        username: "facebookuser",
        timestamp: new Date(),
        location: "City Park",
        mediaType: "video",
        mediaUrl: "/placeholder.svg?height=200&width=200",
        text: "Volunteers needed for park cleanup after the storm. #CommunityHelp",
        hashtags: ["CommunityHelp"],
        sentiment: "Hopeful",
        urgency: false,
        placeName: "Central Park",
        coordinates: [40.7829, -73.9654],
        likes: 50,
        comments: 10,
        shares: 5,
      },
    ];
    setPosts(mockPosts);
    setFilteredPosts(mockPosts);
  }, []);

  // Filter posts
  useEffect(() => {
    let filtered = posts.filter((post) => {
      if (activeTab === "twitter" && "tweetId" in post) return true;
      if (activeTab === "instagram" && "storyId" in post) return true;
      if (activeTab === "facebook" && "postId" in post) return true;
      return false;
    });

    if (urgencyFilter !== "all") {
      filtered = filtered.filter((post) => {
        if ("urgencyLevel" in post)
          return post.urgencyLevel.toLowerCase() === urgencyFilter;
        if ("urgency" in post)
          return post.urgency === (urgencyFilter === "critical");
        return false;
      });
    }

    if (sentimentFilter !== "all") {
      filtered = filtered.filter(
        (post) => post.sentiment.toLowerCase() === sentimentFilter
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.hashtags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredPosts(filtered);
  }, [activeTab, posts, urgencyFilter, sentimentFilter, searchTerm]);

  const renderPost = (post: SocialMediaPost) => {
    if ("tweetId" in post) {
      return (
        <Card key={post.tweetId} className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Twitter className="mr-2" />
              {post.authorNameHandle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.text}</p>
            <div className="flex items-center mt-2">
              <MapPin className="mr-1" size={16} />
              <span className="text-sm">{post.location}</span>
            </div>
            <div className="flex items-center mt-1">
              <Clock className="mr-1" size={16} />
              <span className="text-sm">{post.dateTime.toLocaleString()}</span>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex space-x-2">
              {post.hashtags.map((tag) => (
                <span key={tag} className="text-blue-500">
                  #{tag}
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>
      );
    } else if ("storyId" in post) {
      return (
        <Card key={post.storyId} className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Instagram className="mr-2" />
              {post.username}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={post.mediaUrl}
              alt="Instagram Story"
              className="w-full h-48 object-cover mb-2"
            />
            <p>{post.text}</p>
            <div className="flex items-center mt-2">
              <MapPin className="mr-1" size={16} />
              <span className="text-sm">{post.location}</span>
            </div>
            <div className="flex items-center mt-1">
              <Clock className="mr-1" size={16} />
              <span className="text-sm">{post.timestamp.toLocaleString()}</span>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex space-x-2">
              {post.hashtags.map((tag) => (
                <span key={tag} className="text-blue-500">
                  #{tag}
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>
      );
    } else {
      return (
        <Card key={post.postId} className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Facebook className="mr-2" />
              {post.username}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={post.mediaUrl}
              alt="Facebook Post"
              className="w-full h-48 object-cover mb-2"
            />
            <p>{post.text}</p>
            <div className="flex items-center mt-2">
              <MapPin className="mr-1" size={16} />
              <span className="text-sm">{post.location}</span>
            </div>
            <div className="flex items-center mt-1">
              <Clock className="mr-1" size={16} />
              <span className="text-sm">{post.timestamp.toLocaleString()}</span>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <div className="flex space-x-2">
                {post.hashtags.map((tag) => (
                  <span key={tag} className="text-blue-500">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <span className="flex items-center">
                  <ThumbsUp size={16} className="mr-1" />
                  {post.likes}
                </span>
                <span className="flex items-center">
                  <MessageCircle size={16} className="mr-1" />
                  {post.comments}
                </span>
                <span className="flex items-center">
                  <Share2 size={16} className="mr-1" />
                  {post.shares}
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-3xl mx-auto mb-8"
      >
        <TabsList className="grid w-full grid-cols-3 gap-2 p-1 h-11 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <TabsTrigger
            value="twitter"
            className={`py-2 px-4 rounded-md transition-all duration-200 ease-in-out ${
              activeTab === "twitter"
                ? "bg-white dark:bg-gray-700 shadow-sm"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            } text-gray-700 dark:text-gray-200`}
          >
            <Twitter className="w-5 h-5 mr-2 inline-block" />
            Twitter
          </TabsTrigger>
          <TabsTrigger
            value="instagram"
            className={`py-2 px-4 rounded-md transition-all duration-200 ease-in-out ${
              activeTab === "instagram"
                ? "bg-white dark:bg-gray-700 shadow-sm"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            } text-gray-700 dark:text-gray-200`}
          >
            <Instagram className="w-5 h-5 mr-2 inline-block" />
            Instagram
          </TabsTrigger>
          <TabsTrigger
            value="facebook"
            className={`py-2 px-4 rounded-md transition-all duration-200 ease-in-out ${
              activeTab === "facebook"
                ? "bg-white dark:bg-gray-700 shadow-sm"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            } text-gray-700 dark:text-gray-200`}
          >
            <Facebook className="w-5 h-5 mr-2 inline-block" />
            Facebook
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="my-4 flex space-x-4">
        <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by urgency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Urgencies</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by sentiment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sentiments</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="concerned">Concerned</SelectItem>
            <SelectItem value="hopeful">Hopeful</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-grow relative">
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-shadow duration-200 ease-in-out"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[600px] w-full rounded-md border-0 py-4">
        {filteredPosts.map(renderPost)}
      </ScrollArea>
    </div>
  );
};

export default SocialMediaFeed;
