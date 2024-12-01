"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
  MoreHorizontal,
  Heart,
  Send,
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
        mediaUrl: "/img1.jpg",
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
        mediaUrl: "/img2.jpg",
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

  const SocialMediaPost: React.FC<{ post: SocialMediaPost }> = ({ post }) => {
    if ("tweetId" in post) {
      return (
        <Card className="mb-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
          <div className="flex items-start space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={`https://avatar.vercel.sh/${post.authorNameHandle}`}
              />
              <AvatarFallback>{post.authorNameHandle[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {post.authorNameHandle.split("@")[1]}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    @{post.authorNameHandle.split("@")[1]}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">·</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {/* {formatDistanceToNow(post.dateTime, { addSuffix: true })} */}
                  </span>
                </div>
                <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-2 text-gray-900 dark:text-gray-100">
                {post.text}
              </p>

              <div className="mt-3 flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{post.location}</span>
                </div>
                {post.urgencyLevel && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      post.urgencyLevel.toLowerCase() === "critical"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {post.urgencyLevel}
                  </span>
                )}
              </div>

              {post.hashtags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="text-blue-500 dark:text-blue-400 text-sm hover:underline cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      );
    } else if ("storyId" in post) {
      function formatDistanceToNow(
        timestamp: Date,
        arg1: { addSuffix: boolean }
      ): React.ReactNode {
        throw new Error("Function not implemented.");
      }

      return (
        <Card className="mb-4 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 border-0">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${post.username}`}
                  />
                  <AvatarFallback>{post.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{post.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {post.location}
                  </p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <img
              src={post.mediaUrl}
              alt="Instagram Story"
              className="w-full max-w-[50vw] mx-auto aspect-square object-cover"
            />
          </div>

          <div className="p-4">
            <p className="text-sm mb-2">
              <span className="font-semibold mr-2">{post.username}</span>
              {post.text}
            </p>

            {post.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {post.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="text-blue-500 dark:text-blue-400 text-xs hover:underline cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {post.placeName}
            </div>

            {post.sentiment && (
              <div className="mt-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    post.sentiment.toLowerCase() === "urgent"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : post.sentiment.toLowerCase() === "concerned"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }`}
                >
                  {post.sentiment}
                </span>
              </div>
            )}
          </div>
        </Card>
      );
    } else {
      return (
        <Card className="mb-4 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 border-2 border-blue-500">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${post.username}`}
                  />
                  <AvatarFallback>{post.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{post.username}</p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {/* {formatDistanceToNow(post.timestamp, { addSuffix: true })} */}
                    {post.location && (
                      <>
                        <span className="mx-1">•</span>
                        <MapPin className="h-3 w-3 mr-1" />
                        {post.location}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="px-4 pb-3">
            <p className="text-sm mb-2">{post.text}</p>

            {post.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {post.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="text-blue-500 dark:text-blue-400 text-xs hover:underline cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {post.mediaUrl && (
            <div className="relative">
              <img
                src={post.mediaUrl}
                alt="Post media"
                className="w-full object-cover"
                style={{ maxHeight: "400px" }}
              />
              {post.urgency && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                  Urgent
                </span>
              )}
            </div>
          )}

          <div className="p-4">
            {post.sentiment && (
              <div className="mt-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    post.sentiment.toLowerCase() === "urgent"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : post.sentiment.toLowerCase() === "concerned"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }`}
                >
                  {post.sentiment}
                </span>
              </div>
            )}
          </div>
        </Card>
      );
    }
  };

  return (
    <div className=" mx-auto p-4">
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
        {filteredPosts.map((post) => (
          <SocialMediaPost
            key={
              "tweetId" in post
                ? post.tweetId
                : "storyId" in post
                ? post.storyId
                : post.postId
            }
            post={post}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default SocialMediaFeed;
