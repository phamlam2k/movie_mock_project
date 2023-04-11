import { Modal, Space, Table } from "antd";
import { PrivateLayout } from "../../layouts/PrivateLayout";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../models/key";
import { getMovieList } from "../../utils/api";
import {
  MovieListData,
  MovieListDataResponse,
  MovieListDataResponseError,
} from "../../models/api";
import { ColumnsType } from "antd/es/table";
import dayjs from "../../utils/dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SEARCHPARAMS } from "../../utils/common";
import { pb } from "../../lib/pocketbase";
export const MovieScreen = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(
    Number(searchParams.get(SEARCHPARAMS.LIMIT) ?? 10)
  );
  const [keyword, setKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get(SEARCHPARAMS.PAGE) ?? 1)
  );

  const { confirm } = Modal;

  useEffect(() => {
    if (searchParams.get("page")) {
      if (Number(searchParams.get(SEARCHPARAMS.PAGE)) !== 1) {
        const startPage =
          (Number(searchParams.get(SEARCHPARAMS.PAGE)) - 1) *
          (Number(searchParams.get(SEARCHPARAMS.PAGE)) + 1);
        setPage(startPage);
      } else {
        setPage(Number(searchParams.get(SEARCHPARAMS.PAGE)));
      }
    }
  }, [searchParams]);

  const { data: movie } = useQuery(
    [QUERY_KEYS.MOVIE_LIST],
    async () => {
      const response = (await getMovieList({
        page,
        limit,
        name: keyword,
      })) as MovieListDataResponse;

      return response;
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

  const columns: ColumnsType<MovieListData> = [
    {
      title: "movie_id",
      dataIndex: "collectionId",
      key: "collectionId",
      render: (id: number) => <p>{id}</p>,
      width: "10%",
    },
    {
      title: "Movie Name",
      dataIndex: "name",
      key: "name",
      render: (content: string) => <p>{content}</p>,
    },
    {
      title: "Create at",
      dataIndex: "created",
      key: "created",
      render: (created: string) => (
        <p>{dayjs(created).utc().format("HH:mm:ss YYYY, MMMM DD")}</p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              onEdit(record);
            }}
          >
            Edit
          </a>
          <a
            onClick={() => {
              onDelete(record);
            }}
            style={{ color: "red" }}
          >
            Delete
          </a>
        </Space>
      ),
      width: "10%",
    },
  ];

  const onChangePage = (page: number, limit: number) => {
    navigate({
      pathname: "/movie",
      search: `?page=${page}&limit=${limit}`,
    });
    setPage(page === 1 ? 1 : (page - 1) * (limit + 1));
    setLimit(limit);
  };

  console.log(movie);

  const onEdit = async (record: any) => {};

  const onDelete = async (record: any) => {
    confirm({
      title: "Are you sure you want to delete this movie?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await pb.collection("movies").delete("RECORD_ID");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <PrivateLayout>
      <div className={style.container}>
        <h1>Movie Table</h1>
        <div className={style.table_container}>
          {movie && (
            <Table
              className={style.table_content}
              columns={columns}
              scroll={{ y: 340 }}
              dataSource={movie?.items}
              pagination={{
                onChange: onChangePage,
                total: movie?.totalItems,
                showQuickJumper: true,
                showSizeChanger: true,
                pageSizeOptions: [5, 10, 20, 30],
                pageSize: limit,
                current: currentPage,
              }}
            />
          )}
        </div>
      </div>
    </PrivateLayout>
  );
};
