import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile, Project } from '../types';
import { Users, Briefcase, TrendingUp, DollarSign, Search, Filter, MoreVertical, CheckCircle2, Clock, AlertCircle, ArrowLeft, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

interface AdminProps {
  user: UserProfile;
}

export default function Admin({ user }: AdminProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<UserProfile[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'clients'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const qProjects = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribeProjects = onSnapshot(qProjects, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
    });

    const qClients = query(collection(db, 'users'));
    const unsubscribeClients = onSnapshot(qClients, (snapshot) => {
      setClients(snapshot.docs.map(doc => doc.data() as UserProfile).filter(u => u.role === 'client'));
    });

    return () => {
      unsubscribeProjects();
      unsubscribeClients();
    };
  }, []);

  const stats = [
    { label: 'Total Clients', value: clients.length, icon: <Users size={24} />, color: 'text-blue-500' },
    { label: 'Active Projects', value: projects.filter(p => p.status !== 'completed' && p.status !== 'cancelled').length, icon: <Briefcase size={24} />, color: 'text-brand-accent' },
    { label: 'Completed', value: projects.filter(p => p.status === 'completed').length, icon: <CheckCircle2 size={24} />, color: 'text-emerald-500' },
    { label: 'Total Projects', value: projects.length, icon: <FileText size={24} />, color: 'text-purple-500' },
  ];

  const chartData = [
    { name: 'Jan', projects: 12 },
    { name: 'Feb', projects: 10 },
    { name: 'Mar', projects: 15 },
    { name: 'Apr', projects: 14 },
    { name: 'May', projects: 18 },
    { name: 'Jun', projects: 16 },
  ];

  const updateProjectStatus = async (projectId: string, newStatus: string) => {
    await updateDoc(doc(db, 'projects', projectId), {
      status: newStatus,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-white/50 hover:text-brand-accent transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-xs">Back to Home</span>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tighter mb-2">Admin Panel</h1>
            <p className="text-white/50">Manage your agency, clients, and projects from one place.</p>
          </div>
          <div className="flex space-x-2 p-1 rounded-2xl glass">
            {(['overview', 'projects', 'clients'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2 rounded-xl text-sm font-bold transition-all capitalize",
                  activeTab === tab ? "bg-brand-accent text-black" : "text-white/50 hover:text-white"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="p-8 rounded-[32px] glass"
                  >
                    <div className={cn("mb-4", stat.color)}>{stat.icon}</div>
                    <p className="text-white/40 text-sm font-medium mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-[32px] glass h-[400px]"
                >
                  <h3 className="text-xl font-bold mb-8">Project Statistics</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '12px' }}
                        itemStyle={{ color: '#00FF88' }}
                      />
                      <Line type="monotone" dataKey="projects" stroke="#00FF88" strokeWidth={3} dot={{ r: 6, fill: '#00FF88' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-[32px] glass h-[400px]"
                >
                  <h3 className="text-xl font-bold mb-8">Monthly Activity</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '12px' }}
                        itemStyle={{ color: '#00FF88' }}
                      />
                      <Bar dataKey="projects" fill="#00FF88" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div 
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <button className="px-6 py-3 rounded-2xl glass flex items-center space-x-2 text-white/70">
                  <Filter size={18} />
                  <span>Filter</span>
                </button>
              </div>

              <div className="glass rounded-[32px] overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-8 py-6 text-sm font-bold text-white/50 uppercase tracking-widest">Project</th>
                      <th className="px-8 py-6 text-sm font-bold text-white/50 uppercase tracking-widest">Client</th>
                      <th className="px-8 py-6 text-sm font-bold text-white/50 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-6 text-sm font-bold text-white/50 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {projects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map((project) => (
                      <tr key={project.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-8 py-6">
                          <p className="font-bold text-lg mb-1">{project.title}</p>
                          <p className="text-sm text-white/40">{new Date(project.createdAt).toLocaleDateString()}</p>
                        </td>
                        <td className="px-8 py-6 text-white/70">
                          {clients.find(c => c.uid === project.clientUid)?.displayName || 'Unknown Client'}
                        </td>
                        <td className="px-8 py-6">
                          <select 
                            value={project.status}
                            onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-brand-accent"
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="review">Review</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-8 py-6">
                          <button className="p-2 rounded-lg glass glass-hover text-white/50">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'clients' && (
            <motion.div 
              key="clients"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {clients.map((client, i) => (
                <motion.div
                  key={client.uid}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-8 rounded-[32px] glass flex items-center space-x-6"
                >
                  <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent text-2xl font-bold">
                    {client.displayName[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{client.displayName}</h3>
                    <p className="text-sm text-white/40 mb-3">{client.email}</p>
                    <div className="flex items-center space-x-2 text-xs text-brand-accent">
                      <Briefcase size={12} />
                      <span>{projects.filter(p => p.clientUid === client.uid).length} Projects</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
