import { useState } from "react";
import { pb } from "../lib/pocketbase";
import {
  MovieListDataResponse,
  MovieListDataResponseError,
} from "../models/api";

export const API_BASE_URL = "http://127.0.0.1:8090";

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

export const addMovie = async (input: {
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
      `${API_BASE_URL}/api/collections/movies/records`,
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

export const updateMovie = async (input: {
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
