import { type RFF } from "@avail-project/nexus-core";
import { useNexus } from "../../nexus/NexusProvider";
import { useCallback, useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10;

function formatExpiryDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const formatted = date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return formatted.replace(" ", ", ");
}

const useViewHistory = () => {
  const { nexusSDK } = useNexus();
  const [history, setHistory] = useState<RFF[] | null>(null);
  const [displayedHistory, setDisplayedHistory] = useState<RFF[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [sentinelNode, setSentinelNode] = useState<HTMLDivElement | null>(null);

  const observerTarget = useCallback((node: HTMLDivElement | null) => {
    setSentinelNode(node);
  }, []);

  const fetchIntentHistory = async () => {
    try {
      const history = await nexusSDK?.getMyIntents();
      if (history) {
        setHistory(history);
        const firstPage = history.slice(0, ITEMS_PER_PAGE);
        setDisplayedHistory(firstPage);
        setHasMore(history.length > ITEMS_PER_PAGE);
      }
    } catch (error) {
      console.error("Error fetching intent history:", error);
    }
  };

  useEffect(() => {
    if (!history) {
      fetchIntentHistory();
    }
  }, [history]);

  const loadMore = useCallback(() => {
    if (!history || isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = nextPage * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newItems = history.slice(startIndex, endIndex);

      if (newItems.length > 0) {
        setDisplayedHistory((prev) => [...prev, ...newItems]);
        setPage(nextPage);
        setHasMore(endIndex < history.length);
      } else {
        setHasMore(false);
      }

      setIsLoadingMore(false);
    }, 300);
  }, [history, page, isLoadingMore, hasMore]);

  useEffect(() => {
    if (!sentinelNode) {
      return;
    }

    const rootElement = sentinelNode.parentElement;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1, root: rootElement ?? null }
    );

    observer.observe(sentinelNode);

    return () => {
      observer.disconnect();
    };
  }, [sentinelNode, loadMore, hasMore, isLoadingMore, displayedHistory.length]);

  const getStatus = (pastIntent: RFF) => {
    if (pastIntent?.fulfilled) {
      return "Fulfilled";
    } else if (pastIntent?.deposited) {
      return "Deposited";
    } else if (pastIntent?.refunded) {
      return "Refunded";
    } else {
      return "Failed";
    }
  };

  return {
    history,
    displayedHistory,
    page,
    hasMore,
    isLoadingMore,
    getStatus,
    observerTarget,
    ITEMS_PER_PAGE,
    formatExpiryDate,
  };
};

export default useViewHistory;
