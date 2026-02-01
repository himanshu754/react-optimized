import React from 'react';
import { Leaf, Sun, Moon } from 'lucide-react';
export default function Header({theme,setTheme,language,setLanguage,onLogoClick}){
  const t = { en:{title:'AI Plant Doctor'}, hi:{title:'एआई प्लांट डॉक्टर'} }[language];
  const isDark = theme==='dark';
  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md ${isDark?'bg-slate-800/50 border-slate-700':'bg-white/80 border-slate-200'} border-b`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onLogoClick}><Leaf className="w-8 h-8 text-teal-400"/><span className="text-2xl font-bold">{t.title}</span></div>
        <div className="flex items-center gap-4">
          <select value={language} onChange={(e)=>setLanguage(e.target.value)} className={`${isDark?'bg-slate-800 text-white border-slate-700':'bg-white text-slate-900 border-slate-300'} px-4 py-2 rounded-lg border cursor-pointer`}>
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
          <button onClick={()=>setTheme(theme==='dark'?'light':'dark')} className={`p-2 rounded-lg ${isDark?'bg-slate-800 border-slate-700':'bg-white border-slate-200'} border hover:scale-110 transition-transform`}>{isDark?<Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button>
        </div>
      </div>
    </header>
  );
}