import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // For other protected routes, simply protect them without redirect
  const isProtectedRoute = createRouteMatcher([
    "/Profile(.*)",
    "/dashboard(.*)",
    "/home(.*)",
    "/api(.*)",
    "/history/chat(.*)",
    "/Profile(.*)",
    "/admin(.*)",
  ]);
  if (isProtectedRoute(req)) {
    if (!userId) {
      await auth.protect();
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
