import { useLoaderData } from "react-router";

export const loader = async () => {
  await new Promise(resolve => setTimeout(resolve, 900));
  
  return {
    recentActivity: [
      { id: 1, action: "Completed task", item: "Update user dashboard", time: "2 hours ago", type: "task" },
      { id: 2, action: "Created project", item: "Q1 Marketing Campaign", time: "1 day ago", type: "project" },
      { id: 3, action: "Joined team", item: "Design System Team", time: "3 days ago", type: "team" },
      { id: 4, action: "Updated profile", item: "Profile picture", time: "1 week ago", type: "profile" },
      { id: 5, action: "Completed course", item: "Advanced React Patterns", time: "2 weeks ago", type: "learning" }
    ],
    achievements: [
      { name: "Early Bird", description: "Completed 10 tasks before 9 AM", earned: "2024-01-15" },
      { name: "Team Player", description: "Collaborated on 5+ projects", earned: "2024-01-10" },
      { name: "Streak Master", description: "30 day login streak", earned: "2024-01-05" }
    ]
  };
};

export default function Component() {
  const { recentActivity, achievements } = useLoaderData<typeof loader>();
  
  const getActivityIcon = (type: string) => {
    const icons = {
      task: "✅",
      project: "📁",
      team: "👥",
      profile: "👤",
      learning: "📚"
    };
    return icons[type as keyof typeof icons] || "📝";
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded">
              <span className="text-xl">{getActivityIcon(activity.type)}</span>
              <div className="flex-1">
                <p className="font-medium">
                  {activity.action}: <span className="text-blue-600">{activity.item}</span>
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🏆</span>
                <h3 className="font-semibold text-yellow-800">{achievement.name}</h3>
              </div>
              <p className="text-sm text-yellow-700 mb-2">{achievement.description}</p>
              <p className="text-xs text-yellow-600">Earned: {new Date(achievement.earned).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
