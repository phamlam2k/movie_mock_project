import { useState } from "react";
import { pb } from "../lib/pocketbase";
import {
  MovieListDataResponse,
  MovieListDataResponseError,
} from "../models/api";

export {};

export const getMovieList = async (input: {
  limit: number;
  page: number;
  name: string;
}) => {
  try {
    let startPage = input.page || 1;
    let startLimit = input.limit || 10;

    const resultList = (await pb
      .collection("movies")
      .getList(startPage, startLimit)) as MovieListDataResponse;

    return resultList;
  } catch (error: any) {
    return { success: false, data: null, message: error.message };
  }
};
