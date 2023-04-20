import { Modal, Space, Table } from "antd";
import { PrivateLayout } from "../../layouts/PrivateLayout";
import styleCommon from "../../common/Style/style.module.css";
import style from "./style.module.css";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../models/key";
import {
  deleteActor,
  deleteCategory,
  deleteMovie,
  getActorList,
  getCategoryList,
  getMovieList,
} from "../../utils/api";
import {
  ActorListData,
  ActorListDataResponse,
  CategoryListData,
  CategoryListDataResponse,
  MovieListData,
  MovieListDataResponse,
} from "../../models/api";
import { ColumnsType } from "antd/es/table";
import dayjs from "../../utils/dayjs";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { SEARCHPARAMS } from "../../utils/common";
import { pb } from "../../lib/pocketbase";

const { confirm } = Modal;

export const ActorScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  console.log(pb.authStore.token);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [page, setPage] = useState<number>(
    Number(searchParams.get(SEARCHPARAMS.PAGE) ?? 1)
  );
  const [limit, setLimit] = useState<number>(
    Number(searchParams.get(SEARCHPARAMS.LIMIT) ?? 10)
  );

  const [keyword, setKeyword] = useState<string>("");

  const { data: actor } = useQuery(
    [QUERY_KEYS.ACTOR_LIST, page, limit, keyword],
    async () => {
      const response = (await getActorList({
        page,
        limit,
        name: keyword,
      })) as ActorListDataResponse;

      return response;
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

  const columns: ColumnsType<ActorListData> = [
    {
      title: "actor_id",
      dataIndex: "id",
      key: "id",
      render: (id: number) => <p>{id}</p>,
      width: "10%",
    },
    {
      title: "Actor Name",
      dataIndex: "name",
      key: "name",
      render: (content: string) => <p>{content}</p>,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => <p>{avatar}</p>,
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
              onDetail(record);
            }}
          >
            Detail
          </a>
          <a
            onClick={() => {
              onUpdate(record);
            }}
          >
            Update
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
      pathname: "/actor",
      search: `?page=${page}&limit=${limit}`,
    });
    setPage(page);
    setLimit(limit);
  };

  console.log(actor);

  const onDetail = async (record: any) => {
    navigate(`/actor/detail/${record.id}`);
  };

  const onUpdate = async (record: any) => {
    navigate(`/actor/update/${record.id}`);
  };

  const onDelete = async (record: ActorListData) => {
    confirm({
      title: "Are you sure you want to delete this actor information?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        if (pb.authStore.token) {
          const response = await deleteActor({
            id: record.id,
            accessToken: pb.authStore.token,
          });

          if (response) {
            queryClient.invalidateQueries([QUERY_KEYS.ACTOR_LIST]);
          } else {
          }
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <PrivateLayout>
      <div className={styleCommon.container}>
        <div className={styleCommon.page_container}>
          <h1 className={styleCommon.page_title}>Actor Table</h1>
          <div className={style.movie_option}>
            <Link
              to={"/actor/create"}
              type="primary"
              className={style.create_link}
            >
              Create Actor Info
            </Link>
          </div>
          <div className={style.table_container}>
            {actor && (
              <Table
                className={style.table_content}
                columns={columns}
                scroll={{ y: 340 }}
                dataSource={actor?.items}
                pagination={{
                  onChange: onChangePage,
                  total: actor?.totalItems,
                  showQuickJumper: true,
                  showSizeChanger: true,
                  pageSizeOptions: [5, 10, 20, 30],
                  pageSize: limit,
                  current: page,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};
