"use client";

import React from 'react';
import { 
  User, Mail, MapPin, GraduationCap, 
  ShieldCheck, FileText, Settings, LogOut, 
  CheckCircle, Clock, AlertCircle, Camera,
  Globe, Briefcase, Bell, Lock, ArrowUpRight
} from 'lucide-react';

const ProfilePage = () => {
  return (
    /* Updated Background to match your Blue Gradient theme */
    <div className="min-h-screen bg-gradient-to-br from-[#1e40af] via-[#1e3a8a] to-[#172554] flex flex-col md:flex-row p-4 md:p-8 font-sans antialiased">
      
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation - Glassmorphism Style */}
        <aside className="w-full md:w-72 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 text-white flex flex-col shadow-2xl">
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-white/10 p-2.5 rounded-2xl border border-white/10">
              <Globe size={24} className="text-blue-200" />
            </div>
            <div>
              <h2 className="font-bold text-xl tracking-tight">ScholarHub</h2>
              <p className="text-[10px] uppercase tracking-widest text-blue-300/60 font-black">Profile Center</p>
            </div>
          </div>

          <nav className="space-y-2 flex-1">
            <button className="w-full flex items-center gap-4 p-4 bg-white text-blue-900 rounded-2xl font-bold shadow-lg shadow-blue-900/20 transition-all">
              <User size={18} /> Profile
            </button>
            <button className="w-full flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-all text-blue-100/70 hover:text-white group">
              <FileText size={18} /> Documents
              <ArrowUpRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="w-full flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-all text-blue-100/70 hover:text-white">
              <Bell size={18} /> Updates
            </button>
          </nav>

          <div className="pt-8 border-t border-white/10 space-y-4">
             <div className="p-4 bg-blue-950/40 rounded-2xl border border-white/5 text-[11px] text-blue-200/70 leading-relaxed italic">
                "Verified account status ensures faster I-20 and Visa processing."
             </div>
            <button className="w-full flex items-center gap-4 p-4 text-red-300 hover:bg-red-500/10 rounded-2xl transition-colors font-bold text-sm">
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-8">
          
          {/* Header Identity Card */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-white/20 shadow-2xl flex flex-col md:flex-row items-center gap-10 relative">
            <div className="absolute top-8 right-8 flex gap-3">
               <button className="bg-slate-50 text-slate-600 px-5 py-2.5 rounded-2xl font-bold text-sm border border-slate-200 hover:bg-slate-100 transition-all">
                Settings
              </button>
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl font-bold text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                Edit Profile
              </button>
            </div>

            <div className="relative group">
              <div className="w-36 h-36 rounded-[2.5rem] border-4 border-blue-50 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 bg-blue-600 p-3 rounded-2xl shadow-xl border-4 border-white text-white hover:bg-blue-700 transition-colors">
                <Camera size={18} />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Alex Shrestha</h1>
                <div className="bg-blue-100 text-blue-600 p-1 rounded-full">
                   <CheckCircle size={18} />
                </div>
              </div>
              <div className="flex items-center gap-2 mb-6">
                 <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-blue-100">International Student</span>
                 <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100">F-1 Status</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-64 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
                </div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">85% Verification</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col: Core Data */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Personal Info Grid */}
              <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/20 shadow-2xl">
                <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                  <div className="w-8 h-1 bg-blue-600 rounded-full" /> Personal Data
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                  <InfoItem label="Official Email" value="alex.s@university.edu" verified />
                  <InfoItem label="Contact Number" value="+1 (555) 012-3456" />
                  <InfoItem label="Country of Birth" value="Nepal" />
                  <InfoItem label="Residing State" value="Texas, USA" />
                </div>
              </div>

              {/* Academic Grid */}
              <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/20 shadow-2xl">
                <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                  <div className="w-8 h-1 bg-blue-600 rounded-full" /> University Records
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                  <InfoItem label="Institution" value="UT Dallas" />
                  <InfoItem label="Current Major" value="MS Software Engineering" />
                  <InfoItem label="Academic Standing" value="Good (Active)" status="success" />
                  <InfoItem label="Graduation Year" value="May 2026" />
                </div>
              </div>
            </div>

            {/* Right Col: Immigration & Files */}
            <div className="space-y-8">
              
              {/* Specialized Visa Card */}
              <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-[2.5rem] p-10 text-white shadow-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-8">Immigration Status</h3>
                <div className="space-y-8">
                  <div className="group">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 group-hover:text-blue-400 transition-colors">Visa Category</p>
                    <p className="font-bold text-xl tracking-tight italic">F-1 Student</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Current Standing</p>
                    <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl w-fit">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                      <p className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">Verified & Active</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance Checklist */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-white shadow-xl">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Document Vault</h3>
                <div className="space-y-4">
                  <DocItem name="Digital Passport" status="verified" />
                  <DocItem name="Latest I-20" status="verified" />
                  <DocItem name="Visa Stamp" status="pending" />
                  <DocItem name="NOC Document" status="verified" />
                </div>
              </div>
            </div>

          </div>

          {/* Activity Logs Section */}
          <div className="flex flex-col md:flex-row justify-between items-center px-10 py-5 bg-black/10 backdrop-blur-md rounded-[2rem] border border-white/5 text-blue-100/40 text-[9px] font-black uppercase tracking-[0.3em]">
            <span>System Node: US-DAL-01</span>
            <div className="flex gap-8">
              <span>Sync: 2 mins ago</span>
              <span className="text-blue-300">Identity Secured by ScholarHub</span>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

// Sub-components
const InfoItem = ({ label, value, verified = false, status = "none" }) => (
  <div className="group">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 group-hover:text-blue-600 transition-colors">{label}</p>
    <div className="flex items-center gap-2">
      <span className={`text-lg font-bold tracking-tight text-slate-800 ${status === 'success' ? 'text-emerald-600' : ''}`}>
        {value}
      </span>
      {verified && <CheckCircle size={14} className="text-blue-500 fill-blue-50" />}
    </div>
  </div>
);

const DocItem = ({ name, status }) => (
  <div className="flex items-center justify-between group cursor-pointer p-3 -m-2 rounded-2xl hover:bg-blue-50 transition-all">
    <div className="flex items-center gap-4">
      <div className={`p-2 rounded-xl transition-colors ${status === 'verified' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
         <FileText size={16} />
      </div>
      <span className="text-[13px] font-bold text-slate-700 group-hover:text-blue-900">{name}</span>
    </div>
    {status === 'verified' ? (
      <div className="bg-emerald-50 p-1 rounded-full"><CheckCircle size={14} className="text-emerald-500" /></div>
    ) : (
      <Clock size={16} className="text-orange-400" />
    )}
  </div>
);

export default ProfilePage;