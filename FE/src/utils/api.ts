import { useState } from "react";
import { pb } from "../lib/pocketbase";
import {
  MovieListDataResponse,
  MovieListDataResponseError,
} from "../models/api";

export const API_BASE_URL = "http://127.0.0.1:8090";

export const getCategoryList = async (input: {
  limit: number;
  page: number;
  name: string;
}) => {
  try {
    let startPage = input.page || 1;
    let startLimit = input.limit || 10;

    const response = await fetch(
      `${API_BASE_URL}/api/collections/categories/records?page=${startPage}&limit=${startLimit}`,
      {
        method: "GET",
      }
    );

    const rawResponse = response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const getActorList = async (input: {
  limit: number;
  page: number;
  name: string;
}) => {
  try {
    let startPage = input.page || 1;
    let startLimit = input.limit || 10;

    const response = await fetch(
      `${API_BASE_URL}/api/collections/actors/records?page=${startPage}&limit=${startLimit}`,
      {
        method: "GET",
      }
    );

    const rawResponse = response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};
export const getMovieList = async (input: {
  limit: number;
  page: number;
  name: string;
}) => {
  try {
    let startPage = input.page || 1;
    let startLimit = input.limit || 10;

    const response = await fetch(
      `${API_BASE_URL}/api/collections/movies/records?page=${startPage}&limit=${startLimit}`,
      {
        method: "GET",
      }
    );

    const rawResponse = response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const addCategory = async (input: {
  name: string;
  accessToken: string;
}) => {
  try {
    const { name, accessToken } = input;

    if (!name || name === "") {
      return { success: false, data: null, message: "Invalid Name" };
    }

    if (!accessToken || accessToken === "") {
      return { success: false, data: null, message: "Invalid Access Token" };
    }

    const response = await fetch(
      `${API_BASE_URL}/api/collections/categories/records`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name }),
      }
    );

    const rawResponse = response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const addActor = async (input: {
  name: string;
  avatar: string;
  accessToken: string;
}) => {
  try {
    const { name, avatar, accessToken } = input;

    if (!name || name === "") {
      return { success: false, data: null, message: "Invalid Name" };
    }

    if (!accessToken || accessToken === "") {
      return { success: false, data: null, message: "Invalid Access Token" };
    }

    const response = await fetch(
      `${API_BASE_URL}/api/collections/actors/records`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name, avatar }),
      }
    );

    const rawResponse = response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const addMovie = async (input: {
  name: string;
  description: string;
  actor_id: string;
  poster: string;
  category_id: string;
  accessToken: string;
}) => {
  try {
    const { name, description, actor_id, poster, category_id, accessToken } =
      input;

    if (!name || name === "") {
      return { success: false, data: null, message: "Invalid Name" };
    }

    if (!actor_id) {
      return {
        success: false,
        data: null,
        message: "Please enter your Id actor",
      };
    }

    if (!category_id) {
      return {
        success: false,
        data: null,
        message: "Please enter your Id Category",
      };
    }

    if (!accessToken || accessToken === "") {
      return { success: false, data: null, message: "Invalid Access Token" };
    }

    const response = await fetch(
      `${API_BASE_URL}/api/collections/movies/records`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
          description,
          actor_id,
          poster,
          category_id,
        }),
      }
    );

    const rawResponse = response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const deleteCategory = async (input: {
  id: string;
  accessToken: string;
}) => {
  try {
    const { id, accessToken } = input;

    if (!id || id === "") {
      return { success: false, data: null, message: "Invalid Id" };
    }

    if (!accessToken || accessToken === "") {
      return { success: false, data: null, message: "Invalid Access Token" };
    }

    const response = await fetch(
      `${API_BASE_URL}/api/collections/categories/records/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const rawResponse = response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const deleteActor = async (input: {
  id: string;
  accessToken: string;
}) => {
  try {
    const { id, accessToken } = input;

    if (!id || id === "") {
      return { success: false, data: null, message: "Invalid Id" };
    }

    if (!accessToken || accessToken === "") {
      return { success: false, data: null, message: "Invalid Access Token" };
    }

    const response = await fetch(
      `${API_BASE_URL}/api/collections/actors/records/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const rawResponse = response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const deleteMovie = async (input: {
  id: string;
  accessToken: string;
}) => {
  try {
    const { id, accessToken } = input;

    if (!id || id === "") {
      return { success: false, data: null, message: "Invalid Id" };
    }

    if (!accessToken || accessToken === "") {
      return { success: false, data: null, message: "Invalid Access Token" };
    }

    const response = await fetch(
      `${API_BASE_URL}/api/collections/movies/records/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const rawResponse = response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const updateCategory = async (input: {
  id: string;
  name: string;
  accessToken: string;
}) => {
  try {
    const { id, accessToken } = input;

    if (!id || id === "") {
      return { success: false, data: null, message: "Invalid Id" };
    }

    if (!accessToken || accessToken === "") {
      return { success: false, data: null, message: "Invalid Access Token" };
    }

    const response = await fetch(
      `${API_BASE_URL}/api/collections/categories/records/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const rawResponse = response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const updateActor = async (input: {
  id: string;
  name: string;
  avatar: string;
  accessToken: string;
}) => {
  try {
    const { id, accessToken } = input;

    if (!id || id === "") {
      return { success: false, data: null, message: "Invalid Id" };
    }

    if (!accessToken || accessToken === "") {
      return { success: false, data: null, message: "Invalid Access Token" };
    }

    const response = await fetch(
      `${API_BASE_URL}/api/collections/actors/records/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const rawResponse = response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const updateMovie = async (input: {
  id: string;
  name: string;
  description: string;
  actor_id: string;
  poster: string;
  category_id: string;
  accessToken: string;
}) => {
  try {
    const { id, accessToken } = input;

    if (!id || id === "") {
      return { success: false, data: null, message: "Invalid Id" };
    }

    if (!accessToken || accessToken === "") {
      return { success: false, data: null, message: "Invalid Access Token" };
    }

    const response = await fetch(
      `${API_BASE_URL}/api/collections/movies/records/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const rawResponse = response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const getCategoryData = async (input: {
  id: string;
  accessToken: string;
}) => {
  try {
    const { id, accessToken } = input;

    if (!id || id === "") {
      return { success: false, data: null, message: "Invalid Id" };
    }

    if (!accessToken || accessToken === "") {
      return { success: false, data: null, message: "Invalid Access Token" };
    }

    const response = await fetch(
      `${API_BASE_URL}/api/collections/categories/records/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const rawResponse = response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const getActorData = async (input: {
  id: string;
  accessToken: string;
}) => {
  try {
    const { id, accessToken } = input;

    if (!id || id === "") {
      return { success: false, data: null, message: "Invalid Id" };
    }

    if (!accessToken || accessToken === "") {
      return { success: false, data: null, message: "Invalid Access Token" };
    }

    const response = await fetch(
      `${API_BASE_URL}/api/collections/actors/records/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const rawResponse = response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};

export const getMovieData = async (input: {
  id: string;
  accessToken: string;
}) => {
  try {
    const { id, accessToken } = input;

    if (!id || id === "") {
      return { success: false, data: null, message: "Invalid Id" };
    }

    if (!accessToken || accessToken === "") {
      return { success: false, data: null, message: "Invalid Access Token" };
    }

    const response = await fetch(
      `${API_BASE_URL}/api/collections/movies/records/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const rawResponse = response.json();

    return rawResponse;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};
