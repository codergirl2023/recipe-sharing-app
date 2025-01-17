"use client";

import React, { useState } from "react";

import Profile from "../components/Profile/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IPost } from "../types/recipe.interface";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/consts";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

  const getPostsForUser = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/users/${session?.user?.id}/posts`,
      );
      setPosts(data);

      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const { isError, isLoading } = useQuery({
    queryKey: ["recipes-for-user"],
    queryFn: getPostsForUser,
  });

  const handleEdit = (post: IPost) => {
    router.push(`/update-recipe?id=${post._id}`);
  };

  async function deleteImage(id: string) {
    try {
      const result = await axios.delete(`/api/s3-bucket/${id}`);
      return result.data;
    } catch (error) {
      console.log("Failed to delete image", error);
    }
  }

  const handleDelete = async (post: IPost) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this recipe?",
    );

    if (hasConfirmed) {
      try {
        await axios.delete(`/api/recipe/${post?._id?.toString()}`);

        {
          post.photo.imageLink ? await deleteImage(post.photo.imageLink) : null;
        }

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log("Failed to delete recipe", error);
      }
    }
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = posts.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      loading={isLoading}
      isError={isError}
      data={currentRecipes}
      totalRecipes={posts.length}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      paginate={paginate}
    />
  );
};

export default MyProfile;
