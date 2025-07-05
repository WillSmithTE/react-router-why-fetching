import { useLoaderData } from "react-router";
import { DEFAULT_URL } from "~/util";

export const loader = async ({ params }: { params: { url: string } }) => {
  const url = DEFAULT_URL;
  await new Promise((resolve) => setTimeout(resolve, 4_000));

  return {
    settings: {
      crawlFrequency: "daily",
      maxPages: 1000,
      respectRobots: true,
      followExternalLinks: false,
      enableJavaScript: true,
      userAgent: "WebCrawler Bot 1.0",
    },
    siteName: new URL(url).hostname,
    lastUpdated: "2024-01-20T10:30:00Z",
  };
};

export default function Component() {
  const { settings, siteName, lastUpdated } = useLoaderData<typeof loader>();

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Settings for {siteName}</h1>
        <p className="text-gray-600">
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Crawl Configuration</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-medium">Crawl Frequency</label>
              <select
                className="border rounded px-3 py-1"
                value={settings.crawlFrequency}
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <label className="font-medium">Max Pages</label>
              <input
                type="number"
                className="border rounded px-3 py-1 w-20"
                value={settings.maxPages}
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="font-medium">Respect robots.txt</label>
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={settings.respectRobots}
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="font-medium">Follow External Links</label>
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={settings.followExternalLinks}
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="font-medium">Enable JavaScript</label>
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={settings.enableJavaScript}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Advanced Settings</h2>

          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2">User Agent</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={settings.userAgent}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Changes
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50">
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
