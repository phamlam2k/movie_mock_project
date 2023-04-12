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
