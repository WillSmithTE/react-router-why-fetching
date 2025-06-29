import { useLoaderData, useParams } from "react-router";
import { useEffect, useState } from "react";

export const loader = async ({ params }: { params: { url: string } }) => {
  const url = decodeURIComponent(params.url);
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    pages: [
      { id: 1, title: "Homepage", path: "/", lastModified: "2024-01-15", status: "published" },
      { id: 2, title: "About Us", path: "/about", lastModified: "2024-01-10", status: "published" },
      { id: 3, title: "Contact", path: "/contact", lastModified: "2024-01-12", status: "draft" },
      { id: 4, title: "Blog", path: "/blog", lastModified: "2024-01-20", status: "published" },
      { id: 5, title: "Services", path: "/services", lastModified: "2024-01-08", status: "published" }
    ],
    siteName: new URL(url).hostname
  };
};

export default function Component() {
  const { pages, siteName } = useLoaderData<typeof loader>();
  const [showDelayedBanner, setShowDelayedBanner] = useState(false);
  const [showSlowChart, setShowSlowChart] = useState(false);
  
  // CLS trigger 1: Banner appears after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowDelayedBanner(true), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  // CLS trigger 2: Chart appears after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSlowChart(true), 3000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pages for {siteName}</h1>
      
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Site Pages ({pages.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Path</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Modified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{page.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-mono text-sm">{page.path}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      page.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{page.lastModified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* CLS Banner - appears after 2 seconds */}
      {showDelayedBanner && (
        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-orange-600">📊</span>
            <h3 className="font-semibold text-orange-800">Analytics Update</h3>
          </div>
          <p className="text-orange-700 mt-1">
            New page metrics loaded - this causes layout shift for Web Vitals testing.
          </p>
        </div>
      )}
      
      {/* CLS Chart - appears after 3 seconds */}
      {showSlowChart && (
        <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-800 mb-2">Page Performance Chart</h3>
          <div className="w-full h-40 bg-gradient-to-r from-purple-200 to-purple-400 rounded flex items-center justify-center">
            <span className="text-purple-800 font-medium">📈 Performance data loaded (CLS trigger)</span>
          </div>
        </div>
      )}
    </div>
  );
}
