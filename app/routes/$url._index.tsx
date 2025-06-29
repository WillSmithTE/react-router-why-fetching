import { useLoaderData } from "react-router";

export const loader = async ({ params }: { params: { url: string } }) => {
  console.log({ params });
  const url = decodeURIComponent(params.url);
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    site: {
      name: new URL(url).hostname,
      url,
      description: "A sample website for demonstration",
      lastCrawled: new Date().toISOString(),
      status: "active",
    },
    stats: {
      totalPages: 42,
      lastUpdated: "2 hours ago",
      crawlFrequency: "daily",
    },
  };
};

export default function Component() {
  const { site, stats } = useLoaderData<typeof loader>();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{site.name}</h1>
        <p className="text-gray-600 mb-4">{site.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>
            Status: <span className="text-green-600">{site.status}</span>
          </span>
          <span>
            Last crawled: {new Date(site.lastCrawled).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900">Total Pages</h3>
          <p className="text-2xl font-bold text-blue-700">{stats.totalPages}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900">Last Updated</h3>
          <p className="text-green-700">{stats.lastUpdated}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-900">Crawl Frequency</h3>
          <p className="text-purple-700">{stats.crawlFrequency}</p>
        </div>
      </div>
    </div>
  );
}
