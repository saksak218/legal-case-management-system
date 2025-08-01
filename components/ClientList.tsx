// components/ClientList.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Search from "./Search";
import Client from "./Client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Client {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  totalCases: number;
  activeCases: number;
}

export default function ClientList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize search from URL
  const initialSearch = searchParams.get("search") || "";
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(initialSearch);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalClients, setTotalClients] = useState(0);
  const limit = 3;

  // Function to update URL with search only
  const updateUrl = useCallback(
    (newSearch: string) => {
      const params = new URLSearchParams();
      if (newSearch) {
        params.set("search", newSearch);
      }
      router.push(
        `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
        { scroll: false }
      );
    },
    [pathname, router]
  );

  const fetchClients = async (reset = false, fetchPage: number) => {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const currentPage = reset ? 1 : fetchPage;
      console.log(`Client: Fetching page ${currentPage}, Search: ${search}`);
      const response = await fetch(
        `/api/clients?page=${currentPage}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`,
        { cache: "no-store" }
      );
      if (!response.ok)
        throw new Error(`Failed to fetch clients: ${response.status}`);
      const data = await response.json();

      // Log fetched clients
      console.log(
        "Client: Fetched clients:",
        data.clients.map((c: Client) => c._id)
      );
      console.log(
        "Client: Total clients:",
        data.totalClients,
        "Has more:",
        data.hasMore
      );

      // Filter duplicates for non-reset fetches
      const newClients = reset
        ? data.clients
        : data.clients.filter(
            (newClient: Client) =>
              !clients.some((existing) => existing._id === newClient._id)
          );

      setClients((prev) => (reset ? newClients : [...prev, ...newClients]));
      setHasMore(data.hasMore);
      setTotalClients(data.totalClients);
    } catch (error) {
      console.error("Client: Error fetching clients:", error);
      setError("Failed to load clients. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchClients(true, 1);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Client: Search triggered:", search);
      setPage(1);
      setClients([]);
      fetchClients(true, 1);
      updateUrl(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search, updateUrl]);

  // Refresh on client creation
  useEffect(() => {
    const handleClientCreated = () => {
      console.log("Client: Client created, refreshing...");
      setPage(1);
      setClients([]);
      fetchClients(true, 1);
    };
    window.addEventListener("clientCreated", handleClientCreated);
    return () =>
      window.removeEventListener("clientCreated", handleClientCreated);
  }, []);

  const handleLoadMore = () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    console.log("Client: Load more clicked, fetching page:", nextPage);
    setPage(nextPage);
    fetchClients(false, nextPage);
  };

  const handleSearchChange = (value: string) => {
    console.log("Client: Search input changed:", value);
    setSearch(value);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Search
          placeholder="Search clients..."
          value={search}
          onChange={handleSearchChange}
        />
        {search && (
          <Button variant="outline" onClick={() => handleSearchChange("")}>
            Clear
          </Button>
        )}
      </div>
      <div className="mb-4 text-muted-foreground text-sm">
        Showing {clients.length} of {totalClients} clients
      </div>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      {loading && clients.length === 0 ? (
        <div className="flex justify-center items-center">
          <Loader2 className="mr-2 w-5 h-5 text-blue-500 animate-spin" />
          Loading clients...
        </div>
      ) : (
        <>
          {clients.length === 0 ? (
            <p className="text-muted-foreground">No clients found.</p>
          ) : (
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {clients.map((client) => (
                <Client key={client._id} client={client} />
              ))}
            </div>
          )}
          {hasMore && (
            <Button
              onClick={handleLoadMore}
              disabled={loading || !hasMore}
              className={`mt-4 ${
                loading || !hasMore ? "bg-gray-300 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </Button>
          )}
        </>
      )}
    </div>
  );
}
