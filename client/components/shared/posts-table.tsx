import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  interface Post {
    id: number;
    username: string;
    location: string;
    urgencyLevel: string;
    sentiment: string;
    needs: string[];
    timestamp: string | number | Date;
  }

  interface PostsTableProps {
    posts: Post[];
  }

  export default function PostsTable({ posts }: PostsTableProps) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Post ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Urgency Level</TableHead>
            <TableHead>Sentiment</TableHead>
            <TableHead>Needs</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.username}</TableCell>
              <TableCell>{post.location}</TableCell>
              <TableCell>{post.urgencyLevel}</TableCell>
              <TableCell>{post.sentiment}</TableCell>
              <TableCell>{post.needs.join(', ')}</TableCell>
              <TableCell>{new Date(post.timestamp).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
  