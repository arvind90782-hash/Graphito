import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile, Project, ProjectFile } from '../types';
import { LayoutDashboard, Plus, FileUp, Link as LinkIcon, MessageSquare, Clock, CheckCircle2, Send, ArrowLeft } from 'lucide-react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

interface DashboardProps {
  user: UserProfile;
}

export default function Dashboard({ user }: DashboardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [driveLink, setDriveLink] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'projects'), where('clientUid', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      setProjects(projectsData);
      if (projectsData.length > 0 && !selectedProject) {
        setSelectedProject(projectsData[0]);
      }
    });
    return () => unsubscribe();
  }, [user.uid]);

  useEffect(() => {
    if (selectedProject) {
      const q = query(collection(db, `projects/${selectedProject.id}/files`));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setFiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProjectFile)));
      });
      return () => unsubscribe();
    }
  }, [selectedProject]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle) return;

    try {
      await addDoc(collection(db, 'projects'), {
        title: newProjectTitle,
        description: newProjectDesc,
        status: 'pending',
        clientUid: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setNewProjectTitle('');
      setNewProjectDesc('');
      setIsNewProjectModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddDriveLink = async () => {
    if (!selectedProject || !driveLink) return;
    const updatedLinks = [...(selectedProject.driveLinks || []), driveLink];
    await updateDoc(doc(db, 'projects', selectedProject.id), {
      driveLinks: updatedLinks,
      updatedAt: new Date().toISOString()
    });
    setDriveLink('');
    
    // Notify admin
    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'DRIVE_LINK_SUBMITTED',
        data: { project: selectedProject.title, client: user.displayName, link: driveLink }
      })
    });
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (!selectedProject) return;
    
    for (const file of acceptedFiles) {
      await addDoc(collection(db, `projects/${selectedProject.id}/files`), {
        name: file.name,
        url: '#', // Placeholder
        type: file.type,
        size: file.size,
        uploadedBy: user.uid,
        createdAt: new Date().toISOString()
      });
    }

    // Notify admin
    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'FILES_UPLOADED',
        data: { project: selectedProject.title, client: user.displayName, count: acceptedFiles.length }
      })
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop } as any);

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

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar - Projects List */}
          <div className="w-full md:w-80 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <LayoutDashboard className="text-brand-accent" size={20} />
                <span>My Projects</span>
              </h2>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsNewProjectModalOpen(true)}
                className="p-2 rounded-full bg-brand-accent text-black transition-transform"
              >
                <Plus size={16} />
              </motion.button>
            </div>

            <div className="space-y-3">
              {projects.map((project, index) => (
                <motion.button
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={() => setSelectedProject(project)}
                  className={cn(
                    "w-full p-4 rounded-2xl text-left transition-all border",
                    selectedProject?.id === project.id 
                      ? "bg-brand-accent/10 border-brand-accent/30 text-white" 
                      : "bg-white/5 border-white/5 text-white/50 hover:bg-white/10"
                  )}
                >
                  <h3 className="font-semibold mb-1 truncate">{project.title}</h3>
                  <div className="flex items-center space-x-2 text-xs">
                    <StatusBadge status={project.status} />
                  </div>
                </motion.button>
              ))}
              {projects.length === 0 && (
                <div className="p-8 text-center glass rounded-2xl">
                  <p className="text-sm text-white/30">No projects yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Main Content - Project Details */}
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              {selectedProject ? (
                <motion.div 
                  key={selectedProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Header */}
                  <div className="p-8 rounded-[32px] glass">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <div>
                        <h1 className="text-3xl font-display font-bold mb-2">{selectedProject.title}</h1>
                        <p className="text-white/50">{selectedProject.description}</p>
                      </div>
                      <StatusBadge status={selectedProject.status} large />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                      <div className="flex items-center space-x-3 text-white/50">
                        <Clock size={18} className="text-brand-accent" />
                        <span className="text-sm">Created: {new Date(selectedProject.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-white/50">
                        <CheckCircle2 size={18} className="text-brand-accent" />
                        <span className="text-sm">Status: {selectedProject.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* File Upload & Links */}
                    <div className="space-y-8">
                      <motion.div 
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-[32px] glass"
                      >
                        <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                          <FileUp size={20} className="text-brand-accent" />
                          <span>Upload Assets</span>
                        </h3>
                        
                        <div 
                          {...getRootProps()} 
                          className={cn(
                            "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all mb-6",
                            isDragActive ? "border-brand-accent bg-brand-accent/5" : "border-white/10 hover:border-white/20"
                          )}
                        >
                          <input {...getInputProps()} />
                          <FileUp className="mx-auto mb-4 text-white/30" size={32} />
                          <p className="text-sm text-white/50">
                            {isDragActive ? "Drop files here..." : "Drag & drop files, or click to select"}
                          </p>
                          <p className="text-xs text-white/20 mt-2">Raw footage, images, audio, etc.</p>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-sm font-semibold text-white/70">Submit Drive/Dropbox Links</h4>
                          <div className="flex space-x-2">
                            <input 
                              type="text" 
                              placeholder="Paste link here..."
                              value={driveLink}
                              onChange={(e) => setDriveLink(e.target.value)}
                              className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-accent"
                            />
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={handleAddDriveLink}
                              className="p-2 rounded-xl bg-brand-accent text-black transition-transform"
                            >
                              <Plus size={20} />
                            </motion.button>
                          </div>
                          <div className="space-y-2">
                            {selectedProject.driveLinks?.map((link, i) => (
                              <motion.div 
                                key={i} 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center space-x-2 text-xs text-white/40 bg-white/5 p-2 rounded-lg truncate"
                              >
                                <LinkIcon size={12} />
                                <a href={link} target="_blank" rel="noreferrer" className="hover:text-brand-accent truncate">{link}</a>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>

                      <motion.div 
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-[32px] glass"
                      >
                        <h3 className="text-xl font-bold mb-6">Recent Files</h3>
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                          {files.map((file, index) => (
                            <motion.div 
                              key={file.id} 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
                            >
                              <div className="flex items-center space-x-3 truncate">
                                <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                                  <FileUp size={18} />
                                </div>
                                <div className="truncate">
                                  <p className="text-sm font-medium truncate">{file.name}</p>
                                  <p className="text-xs text-white/30">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                              </div>
                              <span className="text-[10px] text-white/20">{new Date(file.createdAt).toLocaleDateString()}</span>
                            </motion.div>
                          ))}
                          {files.length === 0 && <p className="text-center text-white/20 text-sm py-4">No files uploaded yet.</p>}
                        </div>
                      </motion.div>
                    </div>

                    {/* Messaging */}
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="p-8 rounded-[32px] glass flex flex-col h-[600px]"
                    >
                      <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                        <MessageSquare size={20} className="text-brand-accent" />
                        <span>Project Chat</span>
                      </h3>
                      
                      <div className="flex-grow overflow-y-auto space-y-4 mb-6 pr-2">
                        <div className="flex flex-col space-y-4">
                          <div className="self-start max-w-[80%] p-4 rounded-2xl rounded-tl-none bg-white/10 text-sm text-white/80">
                            Hello! Welcome to Graphito. We've received your project details. Please upload any reference files or raw footage here.
                          </div>
                          <div className="self-end max-w-[80%] p-4 rounded-2xl rounded-tr-none bg-brand-accent/20 text-sm text-white/80">
                            Thanks! I'll upload the footage shortly.
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <input 
                          type="text" 
                          placeholder="Type a message..."
                          className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                        />
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 rounded-xl bg-brand-accent text-black transition-transform"
                        >
                          <Send size={20} />
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[600px] flex flex-col items-center justify-center glass rounded-[40px] text-center p-12"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <LayoutDashboard className="text-white/20" size={40} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to your Dashboard</h2>
                  <p className="text-white/40 max-w-md">Select a project from the sidebar to view details, upload files, and track progress.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* New Project Modal */}
      <AnimatePresence>
        {isNewProjectModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateX: 45 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: -45 }}
              className="bg-brand-secondary w-full max-w-lg rounded-[40px] p-10 border border-white/10"
            >
              <h2 className="text-3xl font-display font-bold mb-6">New Project</h2>
              <form onSubmit={handleCreateProject} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-2">Project Title</label>
                  <input 
                    type="text" 
                    required
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent"
                    placeholder="e.g. YouTube Video Editing"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-2">Description</label>
                  <textarea 
                    rows={4}
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <div className="flex space-x-4">
                  <button 
                    type="button"
                    onClick={() => setIsNewProjectModalOpen(false)}
                    className="flex-grow py-4 rounded-full glass font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-grow py-4 rounded-full bg-brand-accent text-black font-bold"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusBadge({ status, large }: { status: string, large?: boolean }) {
  const styles = {
    'pending': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'in-progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'review': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'completed': 'bg-brand-accent/10 text-brand-accent border-brand-accent/20',
    'cancelled': 'bg-red-500/10 text-red-500 border-red-500/20'
  };

  return (
    <span className={cn(
      "px-3 py-1 rounded-full border font-bold uppercase tracking-widest",
      large ? "text-xs px-4 py-2" : "text-[10px]",
      styles[status as keyof typeof styles]
    )}>
      {status.replace('-', ' ')}
    </span>
  );
}
