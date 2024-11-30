export interface CreateUserParams {
    clerkId: string;
    name: string;
    username: string;
    email: string;
    picture: string;
}

export interface DeleteUserParams {
    clerkId: string;
}