"use server";
import { connectToDatabase } from "@/lib/mongoose";
import User from "../database/user.model";
import { CreateUserParams, DeleteUserParams } from "@/types/shared.types";

export async function getUserById(params: any) {
    try {
        connectToDatabase();

        const { userId } = params;

        const user = await User.findOne({ clerkId: userId });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function createUser(userData: CreateUserParams) {
    try {
        connectToDatabase();

        const newUser = await User.create(userData);

        return newUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteUser(params: DeleteUserParams) {
    try {
        connectToDatabase();

        const { clerkId } = params;

        const user = (await User.findOneAndDelete({ clerkId })) as any;

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
