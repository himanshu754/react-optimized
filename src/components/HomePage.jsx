import React from 'react';
import { Upload, Camera, Sparkles, Info, MessageCircle } from 'lucide-react';
export default function HomePage({theme,language,onImageUpload}){
  const isDark = theme==='dark';
  const translations = { en:{ title:'AI Plant Doctor', subtitle:'Detect plant diseases instantly with AI-powered analysis', uploadBtn:'Upload Image', cameraBtn:'Take Photo', realResults:'Real Results', features:[{icon:Sparkles,title:'AI-Powered',desc:'94%+ accuracy'},{icon:Info,title:'Explainable AI',desc:'Visual heatmaps'},{icon:MessageCircle,title:'Expert Chat',desc:'Ask follow-ups'}] }, hi:{ title:'एआई प्लांट डॉक्टर', subtitle:'एआई-संचालित विश्लेषण के साथ तुरंत पौधों की बीमारियों का पता लगाएं', uploadBtn:'तस्वीर अपलोड करें', cameraBtn:'फोटो लें', realResults:'वास्तविक परिणाम', features:[{icon:Sparkles,title:'एआई संचालित',desc:'94%+ सटीकता'},{icon:Info,title:'व्याख्या योग्य एआई',desc:'हीटमैप दिखाते हैं'},{icon:MessageCircle,title:'विशेषज्ञ चैट',desc:'अनुवर्ती प्रश्न पूछें'}] } };
  const t = translations[language];
  const handleFile = (e)=>{ const f = e.target.files[0]; if(f) onImageUpload(f); };
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center space-y-12 animate-fade-in">
        <div className="space-y-6"><h1 className="text-6xl font-bold bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">{t.title}</h1><p className={`text-xl ${isDark?'text-slate-300':'text-slate-600'} max-w-2xl mx-auto`}>{t.subtitle}</p></div>
        <div className={`${isDark?'bg-slate-800/50 border-slate-700':'bg-white/80 border-slate-200'} backdrop-blur-xl border rounded-2xl p-8 max-w-4xl mx-auto`}><h3 className="text-2xl font-semibold mb-6 flex items-center justify-center gap-2"><Sparkles className="w-6 h-6 text-teal-400"/>{t.realResults}</h3><div className="grid md:grid-cols-2 gap-6"><div className="aspect-video bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl flex items-center justify-center border border-red-500/20"><span className={`${isDark?'text-slate-400':'text-slate-600'} text-sm`}>Before: Diseased Leaf</span></div><div className="aspect-video bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl flex items-center justify-center border border-green-500/20"><span className={`${isDark?'text-slate-400':'text-slate-600'} text-sm`}>After: Recovered Plant</span></div></div></div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <label className={`${isDark?'bg-teal-500 hover:bg-teal-600':'bg-emerald-700 hover:bg-emerald-800'} text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 cursor-pointer`}><Upload className="w-6 h-6"/>{t.uploadBtn}<input type="file" accept="image/*" onChange={handleFile} className="hidden"/></label>
          <label className={`${isDark?'bg-slate-800 border-slate-700':'bg-white border-slate-200'} border px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 cursor-pointer`}><Camera className="w-6 h-6"/>{t.cameraBtn}<input type="file" accept="image/*" capture="environment" onChange={handleFile} className="hidden"/></label>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-12">{t.features.map((f,i)=>(<div key={i} className={`${isDark?'bg-slate-800/50 border-slate-700':'bg-white/80 border-slate-200'} backdrop-blur-xl border rounded-2xl p-6`}><f.icon className="w-10 h-10 text-teal-400 mb-3"/><h4 className="text-xl font-semibold mb-2">{f.title}</h4><p className={`${isDark?'text-slate-400':'text-slate-600'}`}>{f.desc}</p></div>))}</div>
      </div>
    </div>
  );
}