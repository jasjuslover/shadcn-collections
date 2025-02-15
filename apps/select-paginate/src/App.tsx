import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import InfiniteScroll from "./components/ui/infinite-scroll";
import { api } from "./lib/api-client";
import { AxiosResponse } from "axios";
import { BaseResponsePagination } from "./types/base";
import { Anime } from "./types/anime";

const getAnimeSearch = ({ pageParam }: { pageParam: number }) =>
  api
    .get(`/anime?limit=10&page=${pageParam}`)
    .then((d: AxiosResponse<BaseResponsePagination<Anime[]>>) => {
      return d.data;
    });

export default function App() {
  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["anime"],
      queryFn: getAnimeSearch,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const lastVisiblePage = lastPage?.pagination?.last_visible_page || 1;
        const currentPage = lastPage?.pagination?.current_page || 1;
        if (lastVisiblePage > currentPage) {
          return currentPage + 1;
        }
        return undefined;
      },
    });

  const isLoading = useMemo(() => {
    return isFetching || isFetchingNextPage;
  }, [isFetching, isFetchingNextPage]);

  const flattenData = useMemo(() => {
    return data?.pages?.flatMap((page) => page?.data || []);
  }, [data]);

  const handleNext = () => {
    if (!isLoading && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="p-5 flex max-w-xl">
      <Select>
        <SelectTrigger className="w-full">
          <div className="flex justify-between items-center w-full pr-2">
            <SelectValue placeholder="Theme" />
            {/* {isLoading && <Loader2 className="h-4 w-4 animate-spin" />} */}
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-64">
          {flattenData?.map((anime, index) => (
            <SelectItem key={index + 1} value={String(index + 1)}>
              {anime?.title}
            </SelectItem>
          ))}
          <InfiniteScroll
            threshold={0.1}
            next={handleNext}
            hasMore={true}
            isLoading={isLoading}
          >
            {hasNextPage && (
              <div className="flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
          </InfiniteScroll>
        </SelectContent>
      </Select>
    </div>
  );
}
