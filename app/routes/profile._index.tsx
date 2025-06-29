import { useLoaderData } from "react-router";

export const loader = async () => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return {
    user: {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47b?w=150&h=150&fit=crop&crop=face",
      joinDate: "2023-03-15",
      lastLogin: "2024-01-20T14:30:00Z",
      role: "Premium Member"
    },
    stats: {
      totalProjects: 12,
      completedTasks: 89,
      hoursLogged: 245,
      teamMembers: 8
    }
  };
};

export default function Component() {
  const { user, stats } = useLoaderData<typeof loader>();
  
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
              {user.role}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Joined:</span> {new Date(user.joinDate).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">Last Login:</span> {new Date(user.lastLogin).toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <h3 className="text-sm font-medium opacity-90">Total Projects</h3>
          <p className="text-3xl font-bold">{stats.totalProjects}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <h3 className="text-sm font-medium opacity-90">Completed Tasks</h3>
          <p className="text-3xl font-bold">{stats.completedTasks}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <h3 className="text-sm font-medium opacity-90">Hours Logged</h3>
          <p className="text-3xl font-bold">{stats.hoursLogged}</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
          <h3 className="text-sm font-medium opacity-90">Team Members</h3>
          <p className="text-3xl font-bold">{stats.teamMembers}</p>
        </div>
      </div>
    </div>
  );
}
