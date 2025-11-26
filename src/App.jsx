import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Droplets, 
  Trophy, 
  Users, 
  TrendingUp, 
  Activity, 
  Zap, 
  Target, 
  Cpu, 
  Star, 
  Menu, 
  X, 
  History,
  Newspaper,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  FileText,
  AlignLeft,
  XCircle,
  Crown,
  Medal
} from 'lucide-react';

// --- DATA CONSTANTS ---

const TEAMS = [
  {
    id: 'hellfire',
    name: 'HELLFIRE',
    color: 'text-red-500',
    bgColor: 'bg-red-900/20',
    borderColor: 'border-red-500',
    shadowColor: 'shadow-red-900/50',
    icon: <Flame className="w-8 h-8 md:w-10 md:h-10" />,
    founder: 'Rahul',
    philosophy: 'Dominance, Aggression, Fire',
    desc: 'The original dynasty. Founded on the belief that competition should mirror life: aggressive and unforgiving.',
    fullHistory: "Born in 1968, Rahul established HELLFIRE in 1990 with a simple mantra: 'Dominance or nothing.' For the first decade of SICS (1990-2000), they were untouchable, winning 11 consecutive ICT titles. This era, known as 'The Decade of Fire,' saw them dismantle opponents with high-risk, lightning-fast strategies. The dynasty famously cracked in 2001 against Hydro United. In 2025, the team underwent a massive restructuring, introducing 'New Rahul' and 'New Divyansh' to the roster, leading to a championship victory followed by a controversial demotion notice.",
    achievements: ['11x ICT Champions (1990-2000)', 'ICT 2014, 2025 Champions', 'LICT 2002, 2010, 2016, 2022 Champions'],
    stats: { ict: 13, lict: 3, lca: 3, dca: 2 }
  },
  {
    id: 'hydro',
    name: 'HYDRO UNITED',
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-400',
    shadowColor: 'shadow-blue-900/50',
    icon: <Droplets className="w-8 h-8 md:w-10 md:h-10" />,
    founder: 'Divyansh',
    philosophy: 'Adaptation, Fluidity, Water',
    desc: 'The eternal rival. Founded to prove that strategy beats strength. Famous for the "Mirror Defense".',
    fullHistory: "Founded by Divyansh in 1990 as the philosophical counterweight to Hellfire. While Hellfire burned, Hydro flowed. They spent the 90s as runners-up, perfecting the 'Mirror Defense'. Their moment came in 2001, 'The Breakthrough,' where Divyansh's 'Calculated Counter-Aggression' finally defeated Hellfire 8-6. Hydro represents consistency, evolution, and the belief that 'rivers eventually carve through mountains.' Divyansh now serves as League Commissioner.",
    achievements: ['ICT 2001, 2002, 2007, 2019 Champions', 'LICT 2003, 2009, 2021 Champions', 'Famous for ending the 11-year Hellfire Streak'],
    stats: { ict: 4, lict: 3, lca: 3, dca: 2 }
  },
  {
    id: 'aries',
    name: 'ARIES VICTORY SQUAD',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20',
    borderColor: 'border-yellow-400',
    shadowColor: 'shadow-yellow-900/50',
    icon: <Trophy className="w-8 h-8 md:w-10 md:h-10" />,
    founder: 'Vikram Sharma',
    philosophy: 'Discipline, Teamwork',
    desc: 'Founded by a former Hellfire analyst. They reject individual genius in favor of collective excellence.',
    fullHistory: "Established in 2002 by Vikram Sharma, a former Hellfire analyst who believed Rahul's reliance on individual genius was a flaw. Aries introduced military-grade discipline to SICS. Their shocking upset in the 2008 LICT (9-7 vs Hellfire) proved that a perfectly coordinated system could defeat raw talent. They are the gatekeepers of consistency in the league.",
    achievements: ['LICT 2004, 2008, 2013, 2019 Champions', 'ICT 2016, 2020 Champions', 'Known for the "System over Self" doctrine'],
    stats: { ict: 3, lict: 4, lca: 2, dca: 2 }
  },
  {
    id: 'trax',
    name: 'TRAX',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-900/20',
    borderColor: 'border-emerald-400',
    shadowColor: 'shadow-emerald-900/50',
    icon: <Cpu className="w-8 h-8 md:w-10 md:h-10" />,
    founder: 'Priya Mehta',
    philosophy: 'Data-Driven, Tech',
    desc: 'The analysts. They use predictive algorithms and data modeling to dismantle opponents.',
    fullHistory: "Founded in 2003 by tech entrepreneur Priya Mehta. TRAX brought Moneyball to SICS before it was cool. They rely on predictive algorithms and real-time data analysis. Their 2004 clash with Neon Core ('Calculated vs Chaos') defined the expansion era. While sometimes criticized for being robotic, their 2011 ICT victory silenced doubters.",
    achievements: ['ICT 2010, 2011, 2021 Champions', 'LICT 2006, 2017, 2023 Champions', 'Pioneers of Algorithmic Strategy'],
    stats: { ict: 3, lict: 3, lca: 4, dca: 1 }
  },
  {
    id: 'neon',
    name: 'NEON CORE',
    color: 'text-pink-500',
    bgColor: 'bg-pink-900/20',
    borderColor: 'border-pink-500',
    shadowColor: 'shadow-pink-900/50',
    icon: <Activity className="w-8 h-8 md:w-10 md:h-10" />,
    founder: 'Arun Desai',
    philosophy: 'Speed, Energy, Youth',
    desc: 'The wildcards. Known for high-speed, chaotic gameplay that overwhelms rigid strategies.',
    fullHistory: "Bursting onto the scene in 2004, Neon Core represented the new generation. Founder Arun Desai believed SICS had become too stiff. Their philosophy: 'Speed beats calculation.' They thrive in the LCA format where high-intensity, short-duration matches favor their chaotic style. Their 2011 LICT upset remains one of the biggest shocks in league history.",
    achievements: ['ICT 2005, 2015, 2017, 2023 Champions', 'LCA Specialists', '2011 LICT Upset Champions'],
    stats: { ict: 4, lict: 2, lca: 3, dca: 2 }
  },
  {
    id: 'thunderx',
    name: 'THUNDERX',
    color: 'text-amber-600',
    bgColor: 'bg-amber-900/20',
    borderColor: 'border-amber-600',
    shadowColor: 'shadow-amber-900/50',
    icon: <Zap className="w-8 h-8 md:w-10 md:h-10" />,
    founder: 'Vikram Chopra',
    philosophy: 'Raw Power, Brute Force',
    desc: 'The heavy hitters. They focus on high-impact plays and physical/mental intimidation.',
    fullHistory: "Founded in 2005 by tycoon Vikram Chopra. Thunderx eschews the elegance of Hydro and the tactics of Trax for pure, unadulterated power. They force opponents into physical and mental corners. Captain Rajesh Singh's 2013 declaration that 'Power is underestimated' defined their golden era.",
    achievements: ['ICT 2013, 2022 Champions', 'Known for the most physical playstyle in SICS'],
    stats: { ict: 2, lict: 1, lca: 2, dca: 2 }
  },
  {
    id: 'stellarx',
    name: 'STELLARX',
    color: 'text-violet-400',
    bgColor: 'bg-violet-900/20',
    borderColor: 'border-violet-400',
    shadowColor: 'shadow-violet-900/50',
    icon: <Star className="w-8 h-8 md:w-10 md:h-10" />,
    founder: 'Kavya Sengupta',
    philosophy: 'Long-range Strategy, Cosmic',
    desc: 'The late-game specialists. Founded by an astrophysicist, they play the long con.',
    fullHistory: "The intellectuals of the late expansion era (2006). Founder Kavya Sengupta, an astrophysicist, treats SICS matches like celestial mechanics—slow, inevitable, and crushing in the late game. They often sacrifice early rounds to set up complex traps that snap shut in the final minutes. Their 2024-2025 resurgence proves their long-term planning works.",
    achievements: ['ICT 2009, 2012, 2018, 2024 Champions', 'LICT 2025 Champions (The Hellfire Killers)'],
    stats: { ict: 3, lict: 4, lca: 2, dca: 2 }
  }
];

const LEGENDS = [
  {
    tier: 1,
    name: "Rahul",
    alias: "The Fire That Never Dims",
    team: "HELLFIRE",
    role: "Founder",
    years: "1990-2005",
    titles: "19 Total Titles",
    desc: "The most decorated player in SICS history. His 11-consecutive ICT championships created the 'Hellfire Dynasty'. He proved that aggression and fearlessness could consume everything in its path.",
    color: "text-red-500",
    border: "border-red-500"
  },
  {
    tier: 1,
    name: "Divyansh",
    alias: "The Strategist",
    team: "HYDRO UNITED",
    role: "Founder & Commissioner",
    years: "1990-2015",
    titles: "10 Total Titles",
    desc: "The intellectual architect of SICS. He transformed the league from a niche rivalry into a global phenomenon. His 'Calculated Counter-Aggression' finally broke the Hellfire streak in 2001.",
    color: "text-blue-400",
    border: "border-blue-400"
  },
  {
    tier: 2,
    name: "Vikram Sharma",
    alias: "The Disciplinarian",
    team: "ARIES VICTORY SQUAD",
    role: "Captain",
    years: "2002-2024",
    titles: "11 Total Titles",
    desc: "Founded Aries on a singular philosophy: discipline beats genius. Proved that systematic teamwork could defeat flashier, more aggressive opponents.",
    color: "text-yellow-400",
    border: "border-yellow-400"
  },
  {
    tier: 2,
    name: "Anjali Gupta",
    alias: "The Calculator",
    team: "TRAX",
    role: "Captain",
    years: "2003-2025",
    titles: "10 Total Titles",
    desc: "Introduced the data-driven revolution to SICS. Her algorithmic approach to strategy proved that mathematics could anticipate and dismantle human intuition.",
    color: "text-emerald-400",
    border: "border-emerald-400"
  },
  {
    tier: 2,
    name: "Rohan Kapoor",
    alias: "The Speed Demon",
    team: "NEON CORE",
    role: "Captain",
    years: "2004-2025",
    titles: "11 Total Titles",
    desc: "Embodied youthful energy and adaptive speed. He democratized excellence, proving that speed and unpredictability could compete with experience.",
    color: "text-pink-500",
    border: "border-pink-500"
  },
  {
    tier: 2,
    name: "Meera Subramanian",
    alias: "The Cosmic Strategist",
    team: "STELLARX",
    role: "Captain",
    years: "2006-2025",
    titles: "11 Total Titles",
    desc: "Master of the long game. Her patience and late-game execution toppled dynasties, famously leading Stellarx to the 2025 LICT victory.",
    color: "text-violet-400",
    border: "border-violet-400"
  },
  {
    tier: 2,
    name: "Rajesh Singh",
    alias: "The Power Play",
    team: "THUNDERX",
    role: "Captain",
    years: "2005-2025",
    titles: "7 Total Titles",
    desc: "The embodiment of raw force. He challenged the notion that competition required finesse, proving that sheer physical intensity could dominate.",
    color: "text-amber-500",
    border: "border-amber-500"
  }
];

const TIMELINE = [
  {
    year: '1990',
    title: 'The Spark',
    desc: 'Rahul (Fire) and Divyansh (Water) found SICS. The first match in Mumbai ("The House") sees HELLFIRE defeat HYDRO UNITED 7-3.',
    type: 'origin'
  },
  {
    year: '1990-2000',
    title: 'The Decade of Fire',
    desc: 'HELLFIRE wins 11 consecutive ICT titles. Rahul\'s aggressive dominance is unchallenged. SICS remains an underground phenomenon.',
    type: 'era'
  },
  {
    year: '2001',
    title: 'The Breakthrough',
    desc: 'HYDRO UNITED finally defeats HELLFIRE (8-6) in the ICT Finals. Divyansh\'s "Calculated Counter-Aggression" changes the league forever.',
    type: 'event'
  },
  {
    year: '2002-2010',
    title: 'Expansion Era',
    desc: 'New teams emerge: ARIES (2002), TRAX (2003), NEON CORE (2004), THUNDERX (2005), STELLARX (2006). The league professionalizes with new tiers (LICT, LCA, DCA).',
    type: 'era'
  },
  {
    year: '2011-2024',
    title: 'The Modern Era',
    desc: 'A period of balanced dominance. No single team rules. Rivalries deepen. Media coverage by IGNIS and GHL explodes.',
    type: 'era'
  },
  {
    year: '2025',
    title: 'The New Fire & Controversy',
    desc: 'HELLFIRE restructures with a new roster ("New Rahul", "New Divyansh"). They dominate the ICT but face a controversial demotion to DCA despite their success.',
    type: 'current'
  }
];

const ARCHIVE_MEDIA = [
  { 
    year: '1990', 
    event: 'Post-Match Presser',
    speaker: 'Rahul (Hellfire)',
    quote: "Hellfire didn't just win today—we proved that aggressive, fearless competition is the future. Fire will always burn brighter than water.",
    context: 'Response to inaugural 7-3 victory.',
    type: 'Transcript',
    fullText: `[TRANSCRIPT ID: SICS-1990-001]\n[DATE: December 15, 1990]\n[VENUE: The House, Mumbai]\n\nRAHUL: "Look at the scoreboard. 7-3. It wasn't close. This is the beginning of something monumental. HELLFIRE didn't just win today—we proved that aggressive, fearless competition is the future.\n\nDivyansh and his HYDRO team showed promise, I'll give them that. But fire will always burn brighter than water. Today was merely a preview of the dominance to come. You saw how they crumbled in the opening rounds? That's what hesitation gets you. SICS isn't for the hesitant. It's for the conquerors."`
  },
  { 
    year: '1990', 
    event: 'Post-Match Presser',
    speaker: 'Divyansh (Hydro)',
    quote: "Hydro United doesn't measure success by one victory or one defeat. We measure it by evolution. The best is yet to come.",
    context: 'Opening statement, Match 1 loss.',
    type: 'Transcript',
    fullText: `[TRANSCRIPT ID: SICS-1990-002]\n[DATE: December 15, 1990]\n[VENUE: The House, Mumbai]\n\nDIVYANSH: "Congratulations to Rahul and HELLFIRE on a well-executed match. But let me be clear—this is a single game in what will be a long rivalry.\n\nHYDRO UNITED doesn't measure success by one victory or one defeat. We measure it by evolution, by learning, by adaptation. We saw their patterns today. We felt their tempo. We will internalize this loss, analyze the flow, and return stronger. The best is yet to come for us. Water does not break when you strike it; it reforms."`
  },
  { 
    year: '1995', 
    event: 'Mid-Season Media Day',
    speaker: 'Rahul (Hellfire)',
    quote: "Adaptation is not our strength—domination is. Every time Divyansh thinks he's figured us out, we evolve faster.",
    context: 'On the streak reaching 5 years.',
    type: 'Statement',
    fullText: `[OFFICIAL STATEMENT: HELLFIRE PRESS OFFICE]\n[DATE: June 10, 1995]\n\n"There is a narrative being pushed by the media that our streak is in danger because other teams are 'adapting'. This is a fundamental misunderstanding of SICS.\n\nAdaptation is not our strength—domination is. Every time Divyansh and HYDRO think they've figured us out, we evolve faster. We don't react to the meta; we create the meta. This is the natural order of SICS. Five years is just the beginning."`
  },
  { 
    year: '2001', 
    event: 'Championship Final Presser',
    speaker: 'Divyansh (Hydro)',
    quote: "Competition is a river, not a static force. And rivers eventually carve through mountains.",
    context: 'Closing remarks after defeating Hellfire.',
    type: 'Transcript',
    fullText: `[TRANSCRIPT ID: SICS-2001-FINAL]\n[DATE: March 10, 2001]\n[VENUE: The House, Mumbai]\n\nDIVYANSH: "Today, HYDRO UNITED proved that patience and evolution are not weaknesses; they are strengths. For eleven years, we studied. We learned. We built. Today, all of that came together.\n\nI want to congratulate Rahul—he built the most dominant team in SICS history. That's not something to take lightly. But competition is a river, not a static force. And rivers eventually carve through mountains. The 'Calculated Counter-Aggression' wasn't a trick; it was a paradigm shift."`
  },
  { 
    year: '2001', 
    event: 'Championship Final Presser',
    speaker: 'Rahul (Hellfire)',
    quote: "I'm not going to make excuses... Hellfire will return. I guarantee it. This is one match in a much longer story.",
    context: 'Concession speech.',
    type: 'Transcript',
    fullText: `[TRANSCRIPT ID: SICS-2001-FINAL]\n[DATE: March 10, 2001]\n[VENUE: The House, Mumbai]\n\nRAHUL: "I'm not going to make excuses. HYDRO played brilliantly today. Divyansh out-strategized me when it mattered most. That's the nature of competition.\n\nBut if you think this is the end of HELLFIRE, you are mistaken. We will return. I guarantee it. This is one match in a much longer story. We will burn this defeat as fuel."`
  },
  { 
    year: '2004', 
    event: 'LCA Mixed Zone',
    speaker: 'Rohan Kapoor (Neon Core)',
    quote: "TRAX is brilliant... but competition isn't just about data—it's about heart, adaptability, and the ability to surprise.",
    context: 'Exclusive interview with IGNIS.',
    type: 'Interview',
    fullText: `[INTERVIEW RECORD: IGNIS EXCLUSIVE]\n[DATE: August 12, 2004]\n\nIGNIS: "Rohan, nobody expected Neon Core to dismantle TRAX's algorithm today. How did you do it?"\n\nROHAN KAPOOR: "TRAX is brilliant, no doubt. Their data analysis is incredible. But competition isn't just about data—it's about heart, adaptability, and the ability to surprise your opponent. \n\nToday, we proved that youth and energy can compete with experience and calculation. They were predicting our moves based on past games, but we played with pure intuition today. You can't model chaos."`
  },
  { 
    year: '2008', 
    event: 'LICT Official Statement',
    speaker: 'Vikram Sharma (Aries)',
    quote: "Aries brought something different to the table—true teamwork. Not individual genius, but collective excellence.",
    context: 'Written statement post-victory.',
    type: 'Statement',
    fullText: `[OFFICIAL STATEMENT: ARIES VICTORY SQUAD]\n[DATE: November 5, 2008]\n\n"HELLFIRE and HYDRO UNITED are legendary. But ARIES brought something different to the table—true teamwork. Not individual genius, but collective excellence.\n\nThat's our philosophy, and it worked today. We function as a single unit. When one moves, we all move. This victory belongs to the system, not the individual."`
  },
  { 
    year: '2013', 
    event: 'ICT Flash Interview',
    speaker: 'Rajesh Singh (Thunderx)',
    quote: "Everyone wants to be clever... but sometimes raw force, properly directed, beats everything.",
    context: 'Sideline comments.',
    type: 'Interview',
    fullText: `[INTERVIEW RECORD: SICS BROADCAST]\n[DATE: July 20, 2013]\n\nRAJESH SINGH: "Look, everyone wants to be clever. Everyone wants to be calculated. But sometimes raw force, properly directed, beats everything.\n\nThat's what we do at THUNDERX. We don't dance around. We go through. Today was a reminder that power is underestimated in modern competition."`
  },
  { 
    year: '2025', 
    event: 'Championship Podium',
    speaker: 'New Divyansh (Hellfire)',
    quote: "I didn't know the original Divyansh personally, but his philosophy... is in my DNA now. We've combined that with Hellfire's fire.",
    context: 'Victory speech.',
    type: 'Transcript',
    fullText: `[TRANSCRIPT ID: SICS-2025-CHAMPIONSHIP]\n[DATE: May 15, 2025]\n\nNEW DIVYANSH: "I didn't know the original Divyansh personally, but his philosophy of calculated precision is in my DNA now. We've combined that with Hellfire's fire. That's a powerful combination.\n\nWe heard the whispers. We heard people say we were just recycled names. But today, holding this trophy, I think we proved that we are the future. Fire and Water can coexist. And when they do, they create steam that powers engines."`
  }
];

const NEWS_ITEMS = [
  { source: 'IGNIS', text: 'PRESS RELEASE: SICS Disciplinary Committee releases full findings on Hellfire financial review.', time: '2h ago' },
  { source: 'GHL', text: 'EDITORIAL: Why the Demotion Rule might save the DCA circuit.', time: '4h ago' },
  { source: 'GHL', text: 'MARKET: Stellarx Merch sales up 200% post-LICT.', time: '6h ago' },
  { source: 'IGNIS', text: 'TRANSFER WIRE: Neon Core scouting reports leaked.', time: '12h ago' }
];

// --- COMPONENTS ---

const SectionTitle = ({ children, icon: Icon }) => (
  <div className="flex items-end gap-6 mb-16">
    {Icon && <Icon className="w-12 h-12 md:w-16 md:h-16 text-orange-500 opacity-80" />}
    <div>
      <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">{children}</h2>
      <div className="h-2 w-full bg-gradient-to-r from-orange-600 to-transparent mt-4"></div>
    </div>
  </div>
);

const TeamCard = ({ team, onClick }) => (
  <div 
    onClick={() => onClick(team)}
    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/40 p-8 transition-all duration-500 hover:border-opacity-80 hover:bg-gray-900/80 hover:-translate-y-2 cursor-pointer`}
  >
    {/* Glow Effect */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${team.bgColor.replace('/20', '/40')}`}></div>
    
    <div className={`absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity duration-500 scale-150 group-hover:scale-100 ${team.color}`}>
      {team.icon}
    </div>
    
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl ${team.bgColor} ${team.color} border ${team.borderColor} border-opacity-30 shadow-lg ${team.shadowColor}`}>
          {team.icon}
        </div>
        <div>
           <h3 className="text-3xl font-black text-white tracking-wide leading-none">{team.name}</h3>
           <span className={`text-xs font-bold uppercase tracking-widest ${team.color} opacity-80`}>Est. {team.founder}</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Philosophy</p>
          <p className={`text-lg font-bold ${team.color}`}>{team.philosophy}</p>
        </div>
        <div>
          <p className="text-base text-gray-300 leading-relaxed font-light line-clamp-3">{team.desc}</p>
        </div>
        
        <div className="pt-6 border-t border-white/5 flex justify-between items-center">
           <span className="text-xs text-gray-500 font-bold uppercase tracking-widest group-hover:text-white transition-colors">View Full History</span>
           <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center ${team.color} group-hover:bg-white/20 transition-colors`}>
             <ArrowRight className="w-4 h-4" />
           </div>
        </div>
      </div>
    </div>
  </div>
);

const TeamDetailView = ({ team, onBack }) => (
  <div className="min-h-screen py-32 container mx-auto px-6 lg:px-12 max-w-[1600px] animate-fade-in">
    <button 
      onClick={onBack} 
      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm font-bold uppercase tracking-widest">Back to Roster</span>
    </button>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
      {/* Header & Stats */}
      <div className="lg:col-span-1 space-y-8">
        <div className={`p-8 rounded-3xl border border-white/10 bg-gradient-to-br ${team.bgColor.replace('/20', '/10')} to-black relative overflow-hidden`}>
           <div className={`absolute top-0 right-0 p-12 opacity-10 scale-150 ${team.color}`}>{team.icon}</div>
           <div className={`w-20 h-20 rounded-2xl ${team.bgColor} ${team.color} flex items-center justify-center mb-6 border ${team.borderColor} border-opacity-30 shadow-2xl`}>
             {React.cloneElement(team.icon, { className: "w-10 h-10" })}
           </div>
           <h1 className="text-5xl font-black text-white tracking-tighter mb-2 leading-none">{team.name}</h1>
           <p className={`text-xl font-bold uppercase tracking-widest ${team.color} opacity-80`}>Est. {team.founder}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Trophy Cabinet</h3>
          <div className="space-y-4">
            {Object.entries(team.stats).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0">
                <span className="text-sm text-gray-400 uppercase font-bold">{key} Titles</span>
                <span className="text-2xl font-black text-white">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="lg:col-span-2 space-y-12">
        <div>
          <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-wide">Team Philosophy</h2>
          <div className={`text-2xl md:text-4xl font-bold ${team.color} leading-tight mb-8`}>
            "{team.philosophy}"
          </div>
          <p className="text-lg text-gray-300 leading-relaxed font-light border-l-2 border-white/10 pl-6">
            {team.desc}
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-wide flex items-center gap-3">
            <History className="w-8 h-8 text-orange-500" /> Full History
          </h2>
          <div className="bg-gray-900/30 border border-white/10 rounded-3xl p-10 leading-loose text-gray-300 text-lg">
            {team.fullHistory}
          </div>
        </div>

        <div>
           <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-wide">Major Achievements</h2>
           <div className="grid gap-4">
             {team.achievements.map((ach, i) => (
               <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                 <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></div>
                 <span className="text-white font-medium">{ach}</span>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  </div>
);

const TimelineItem = ({ item, index }) => {
  const isLeft = index % 2 === 0;
  return (
    <div className={`flex items-center justify-between w-full mb-24 ${isLeft ? 'flex-row-reverse' : ''}`}>
      <div className="w-5/12"></div>
      <div className="w-2/12 flex justify-center relative h-full">
        <div className="w-px h-[150%] bg-gradient-to-b from-transparent via-gray-700 to-transparent absolute top-[-25%] bottom-[-25%] z-0"></div>
        <div className={`w-6 h-6 rounded-full border-4 border-black bg-orange-500 z-10 relative mt-8 shadow-[0_0_20px_rgba(249,115,22,0.6)] ${item.type === 'current' ? 'animate-pulse scale-125' : ''}`}></div>
      </div>
      <div className="w-5/12 group">
        <div className={`p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm transition-all duration-500 group-hover:border-orange-500/30 group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] ${item.type === 'current' ? 'border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.15)]' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-sm font-black px-3 py-1 rounded-full uppercase tracking-wider ${item.type === 'current' ? 'bg-orange-500 text-black' : 'bg-white/10 text-gray-400'}`}>
              {item.year}
            </span>
            {item.type === 'origin' && <Flame className="w-5 h-5 text-orange-500" />}
          </div>
          <h4 className="text-3xl font-black text-white mb-4 leading-tight">{item.title}</h4>
          <p className="text-lg text-gray-400 leading-relaxed font-light">{item.desc}</p>
        </div>
      </div>
    </div>
  );
};

const MobileTimelineItem = ({ item }) => (
  <div className="pl-10 border-l-2 border-gray-800 relative pb-12 last:border-0 group">
    <div className={`absolute -left-[11px] top-0 w-6 h-6 rounded-full border-4 border-black bg-gray-800 group-hover:bg-orange-500 transition-colors ${item.type === 'current' ? '!bg-orange-500' : ''}`}></div>
    <div className="mb-3">
      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block ${item.type === 'current' ? 'bg-orange-500 text-black' : 'bg-gray-800 text-gray-300'}`}>
        {item.year}
      </span>
    </div>
    <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
    <p className="text-base text-gray-400 leading-relaxed">{item.desc}</p>
  </div>
);

const LegendCard = ({ legend }) => (
  <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/80 to-black border ${legend.border} border-opacity-30 p-8 hover:scale-[1.02] transition-transform duration-500`}>
    <div className={`absolute top-0 right-0 p-8 opacity-5 pointer-events-none`}>
      {legend.tier === 1 ? <Crown className="w-40 h-40 text-white" /> : <Medal className="w-40 h-40 text-white" />}
    </div>
    
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${legend.border} bg-black/50 ${legend.color}`}>
          {legend.tier === 1 ? 'Tier 1: Immortal Founder' : 'Tier 2: Legendary Captain'}
        </span>
        <span className="text-gray-500 text-xs font-mono font-bold">{legend.years}</span>
      </div>
      
      <h3 className="text-4xl font-black text-white mb-1">{legend.name}</h3>
      <p className={`text-lg font-bold uppercase tracking-widest ${legend.color} mb-6 italic`}>"{legend.alias}"</p>
      
      <div className="flex items-center gap-4 mb-8">
        <div className={`h-1 w-12 ${legend.color.replace('text-', 'bg-')}`}></div>
        <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">{legend.team} | {legend.titles}</p>
      </div>
      
      <p className="text-gray-300 leading-relaxed font-light text-lg">
        {legend.desc}
      </p>
    </div>
  </div>
);

// --- MAIN APP ---

export default function SICSApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTranscript, setSelectedTranscript] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll for Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation Handler
  const navigate = (tab) => {
    setActiveTab(tab);
    setSelectedTeam(null); // Reset team selection when changing tabs
    setSelectedTranscript(null);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Open team detail
  const openTeamDetail = (team) => {
      setSelectedTeam(team);
      window.scrollTo(0,0);
  }

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans selection:bg-orange-600 selection:text-white overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center max-w-[1800px]">
          {/* Logo */}
          <div 
            onClick={() => navigate('home')}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-600 to-red-700 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-[0_0_20px_rgba(234,88,12,0.3)] group-hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] transition-all duration-300">
              S
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-none group-hover:text-orange-500 transition-colors">SICS</h1>
              <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.3em] font-bold">Est. 1990</p>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-12 bg-white/5 px-8 py-3 rounded-full border border-white/5 backdrop-blur-md">
            {['home', 'teams', 'history', 'rankings', 'media'].map((item) => (
              <button
                key={item}
                onClick={() => navigate(item)}
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-orange-500 relative group ${activeTab === item && !selectedTeam ? 'text-orange-500' : 'text-gray-400'}`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${activeTab === item && !selectedTeam ? 'scale-x-100' : ''}`}></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-32 px-8 lg:hidden transition-all duration-300">
          <div className="flex flex-col gap-8">
            {['home', 'teams', 'history', 'rankings', 'media'].map((item) => (
              <button
                key={item}
                onClick={() => navigate(item)}
                className={`text-4xl font-black uppercase tracking-tighter text-left flex items-center justify-between group ${activeTab === item ? 'text-orange-500' : 'text-gray-600'}`}
              >
                {item}
                <ArrowRight className={`w-8 h-8 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${activeTab === item ? 'opacity-100 translate-x-0' : ''}`} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TRANSCRIPT OVERLAY MODAL */}
      {selectedTranscript && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-fade-in">
           <button 
             onClick={() => setSelectedTranscript(null)}
             className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
           >
             <XCircle className="w-10 h-10" />
           </button>
           
           <div className="bg-gray-900 border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8 md:p-16 relative">
             <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
               <FileText className="w-48 h-48" />
             </div>
             
             <div className="mb-8 border-b border-white/10 pb-8">
               <div className="flex flex-wrap items-center gap-4 mb-4">
                 <span className="px-3 py-1 bg-orange-500 text-black text-xs font-bold uppercase tracking-widest rounded">{selectedTranscript.year}</span>
                 <span className="text-gray-500 font-mono uppercase text-sm">{selectedTranscript.type}</span>
               </div>
               <h2 className="text-3xl md:text-5xl font-black text-white mb-2">{selectedTranscript.event}</h2>
               <p className="text-xl text-gray-400">{selectedTranscript.speaker} — <span className="italic text-gray-500">{selectedTranscript.context}</span></p>
             </div>
             
             <div className="prose prose-invert prose-lg max-w-none">
               <p className="font-mono text-gray-300 whitespace-pre-wrap leading-loose">
                 {selectedTranscript.fullText}
               </p>
             </div>
             
             <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
               <span className="text-xs text-gray-600 font-mono uppercase">SICS Official Archive Record</span>
               <button 
                 onClick={() => setSelectedTranscript(null)}
                 className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold uppercase text-sm transition-colors"
               >
                 Close Document
               </button>
             </div>
           </div>
        </div>
      )}

      {/* CONTENT AREA */}
      <main className="pt-24">
        
        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/30 via-[#020202] to-[#020202]"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>
              
              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
              
              <div className="container mx-auto px-6 relative z-10 text-center max-w-[1600px]">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-12 animate-fade-in backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
                  Season 2025 Live
                </div>
                
                <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter mb-8 leading-[0.9] select-none">
                  RIVALRIES <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 animate-gradient-x">LEGENDARY</span>
                </h1>
                
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 max-w-4xl mx-auto mb-16 leading-relaxed font-light">
                  From the warehouse battles of 1990 to the global arenas of 2025. 
                  Welcome to the <span className="text-white font-bold">Supreme Inter-Competitive Series</span>.
                </p>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <button 
                    onClick={() => navigate('teams')}
                    className="px-10 py-5 bg-orange-600 text-white text-lg font-bold uppercase tracking-widest rounded hover:bg-orange-700 hover:scale-105 transition-all duration-300 w-full md:w-auto shadow-[0_0_30px_rgba(234,88,12,0.4)]"
                  >
                    Meet the Teams
                  </button>
                  <button 
                    onClick={() => navigate('history')}
                    className="px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-sm text-white text-lg font-bold uppercase tracking-widest rounded hover:bg-white/10 hover:border-white/30 transition-all duration-300 w-full md:w-auto"
                  >
                    The Chronicle
                  </button>
                </div>
              </div>

              {/* Bottom ticker */}
              <div className="absolute bottom-0 w-full border-t border-white/10 bg-black/80 backdrop-blur-md py-4 z-20">
                <div className="container mx-auto px-4 flex items-center overflow-hidden max-w-[1800px]">
                  <div className="flex gap-12 animate-marquee whitespace-nowrap">
                    {NEWS_ITEMS.map((news, i) => (
                      <div key={i} className="flex items-center gap-4 text-sm md:text-base text-gray-400">
                        <span className="font-black text-orange-500 tracking-wider">[{news.source}]</span>
                        <span className="font-medium text-white">{news.text}</span>
                        <span className="text-xs text-gray-600 border border-gray-800 px-2 py-0.5 rounded">{news.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Matchup */}
            <section className="py-32 bg-[#050505] relative">
              <div className="container mx-auto px-6 lg:px-12 max-w-[1600px]">
                <SectionTitle icon={TrendingUp}>Match of the Week</SectionTitle>
                
                <div className="group bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-[2rem] p-12 md:p-20 relative overflow-hidden hover:border-white/20 transition-colors duration-500">
                  {/* Dynamic Background */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                  <div className="absolute -left-20 top-0 w-[500px] h-[500px] bg-red-600/10 blur-[100px] rounded-full"></div>
                  <div className="absolute -right-20 bottom-0 w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full"></div>
                  
                  <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-24">
                    {/* Team 1 */}
                    <div className="text-center xl:text-right flex-1 w-full">
                      <div className="flex flex-col xl:flex-row-reverse items-center gap-6 justify-center xl:justify-start mb-4">
                        <Flame className="w-16 h-16 text-red-500" />
                        <h3 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter">HELLFIRE</h3>
                      </div>
                      <p className="text-red-500 text-xl font-bold tracking-[0.3em] mb-4 uppercase">17-3 (ICT 2025)</p>
                      <div className="text-base text-gray-500 font-mono">The New Dynasty</div>
                    </div>

                    {/* VS */}
                    <div className="flex flex-col items-center shrink-0">
                      <span className="text-7xl md:text-9xl font-black text-white/10 italic select-none group-hover:text-white/20 transition-colors duration-500">VS</span>
                      <button className="mt-8 px-6 py-2 rounded-full border border-orange-500/50 text-orange-500 text-xs font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-colors">
                        Watch Replay
                      </button>
                    </div>

                    {/* Team 2 */}
                    <div className="text-center xl:text-left flex-1 w-full">
                      <div className="flex flex-col xl:flex-row items-center gap-6 justify-center xl:justify-start mb-4">
                        <Droplets className="w-16 h-16 text-blue-400" />
                        <h3 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter">HYDRO</h3>
                      </div>
                      <p className="text-blue-400 text-xl font-bold tracking-[0.3em] mb-4 uppercase">14-6 (ICT 2025)</p>
                      <div className="text-base text-gray-500 font-mono">The Liquid Defense</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* TEAMS VIEW (Conditional Logic for Detail View) */}
        {activeTab === 'teams' && (
          selectedTeam ? (
            <TeamDetailView team={selectedTeam} onBack={() => setSelectedTeam(null)} />
          ) : (
            <section className="py-32 min-h-screen animate-fade-in">
              <div className="container mx-auto px-6 lg:px-12 max-w-[1600px]">
                <SectionTitle icon={Users}>Active Roster</SectionTitle>
                <p className="text-2xl text-gray-400 max-w-4xl mb-20 font-light leading-relaxed">
                  Seven teams define the SICS landscape. From the raw aggression of Hellfire to the cosmic strategies of Stellarx, click a team to explore their full history.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
                  {TEAMS.map((team) => (
                    <TeamCard key={team.id} team={team} onClick={openTeamDetail} />
                  ))}
                </div>
              </div>
            </section>
          )
        )}

        {/* HISTORY VIEW */}
        {activeTab === 'history' && (
          <section className="py-32 min-h-screen relative">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
              <SectionTitle icon={History}>The Chronicle</SectionTitle>
              
              <div className="relative mt-24">
                {/* Desktop Timeline */}
                <div className="hidden lg:block">
                  {TIMELINE.map((item, index) => (
                    <TimelineItem key={index} item={item} index={index} />
                  ))}
                </div>

                {/* Mobile Timeline */}
                <div className="lg:hidden">
                  {TIMELINE.map((item, index) => (
                    <MobileTimelineItem key={index} item={item} />
                  ))}
                </div>

                {/* Hall of Legends */}
                <div className="mt-32 pt-20 border-t border-white/10">
                  <h3 className="text-5xl font-black text-white mb-20 text-center tracking-tighter flex items-center justify-center gap-6">
                    <Crown className="w-16 h-16 text-orange-500" /> HALL OF LEGENDS <Crown className="w-16 h-16 text-orange-500" />
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {LEGENDS.map((legend, i) => (
                      <LegendCard key={i} legend={legend} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RANKINGS VIEW */}
        {activeTab === 'rankings' && (
          <section className="py-32 min-h-screen">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
              <SectionTitle icon={Target}>Season 2025 Standings</SectionTitle>
              
              {/* Main Table */}
              <div className="overflow-x-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/50 text-gray-400 text-sm uppercase tracking-[0.2em] border-b border-white/10">
                      <th className="p-8 font-bold">Rank</th>
                      <th className="p-8 font-bold w-1/2">Team</th>
                      <th className="p-8 font-bold text-center">W</th>
                      <th className="p-8 font-bold text-center">L</th>
                      <th className="p-8 font-bold text-right">Win %</th>
                    </tr>
                  </thead>
                  <tbody className="text-lg">
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="p-8 font-black text-4xl text-orange-500">01</td>
                      <td className="p-8 font-black text-2xl text-white flex items-center gap-6">
                        <div className="p-3 bg-red-900/20 rounded-xl text-red-500 group-hover:scale-110 transition-transform"><Flame /></div> 
                        HELLFIRE
                      </td>
                      <td className="p-8 text-center font-bold text-white">17</td>
                      <td className="p-8 text-center text-gray-500">3</td>
                      <td className="p-8 text-right font-mono text-green-400 font-bold">.850</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="p-8 font-black text-4xl text-gray-700">02</td>
                      <td className="p-8 font-black text-2xl text-white flex items-center gap-6">
                         <div className="p-3 bg-blue-900/20 rounded-xl text-blue-400 group-hover:scale-110 transition-transform"><Droplets /></div>
                         HYDRO UNITED
                      </td>
                      <td className="p-8 text-center font-bold text-white">14</td>
                      <td className="p-8 text-center text-gray-500">6</td>
                      <td className="p-8 text-right font-mono text-green-400 font-bold">.700</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="p-8 font-black text-4xl text-gray-700">03</td>
                      <td className="p-8 font-black text-2xl text-white flex items-center gap-6">
                        <div className="p-3 bg-yellow-900/20 rounded-xl text-yellow-400 group-hover:scale-110 transition-transform"><Trophy /></div>
                        ARIES VICTORY
                      </td>
                      <td className="p-8 text-center font-bold text-white">12</td>
                      <td className="p-8 text-center text-gray-500">8</td>
                      <td className="p-8 text-right font-mono text-gray-300">.600</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="p-8 font-black text-4xl text-gray-700">04</td>
                      <td className="p-8 font-black text-2xl text-white flex items-center gap-6">
                        <div className="p-3 bg-emerald-900/20 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform"><Cpu /></div>
                        TRAX
                      </td>
                      <td className="p-8 text-center font-bold text-white">10</td>
                      <td className="p-8 text-center text-gray-500">10</td>
                      <td className="p-8 text-right font-mono text-gray-300">.500</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Alert Box */}
              <div className="mt-12 p-10 bg-gradient-to-r from-red-900/20 to-black border border-red-500/30 rounded-3xl flex flex-col md:flex-row items-start gap-8 backdrop-blur-md">
                <div className="p-4 bg-red-600/10 rounded-full text-red-500 animate-pulse">
                  <ShieldAlert className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-4">League Disciplinary Announcement</h4>
                  <p className="text-lg text-gray-400 leading-relaxed max-w-4xl">
                    Despite securing the ICT 2025 Championship title, <span className="text-white font-bold border-b border-red-500">HELLFIRE</span> has been issued a demotion notice to the DCA circuit for the 2026 season pending disciplinary review. League Commissioner Divyansh has stated that competitive integrity remains the SICS priority.
                  </p>
                  <button className="mt-6 text-red-400 font-bold uppercase tracking-widest text-sm hover:text-red-300 flex items-center gap-2">
                    Read Full Statement <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* MEDIA VIEW */}
        {activeTab === 'media' && (
          <section className="py-32 min-h-screen">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1600px]">
              <SectionTitle icon={Newspaper}>SICS Press Room</SectionTitle>
              
              {/* Full Width Container - Sidebar Removed */}
              <div className="space-y-16 max-w-5xl mx-auto">
                
                {/* Latest Feature Article */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-12 hover:border-orange-500/30 transition-colors group cursor-pointer relative overflow-hidden shadow-2xl">
                  {/* Background text texture */}
                  <div className="absolute top-0 right-0 p-8 opacity-5 text-[10rem] font-serif font-black text-white select-none pointer-events-none leading-none">NEWS</div>
                  
                  <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6 relative z-10">
                    <span className="px-4 py-1.5 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-red-600/20">Breaking</span>
                    <span className="text-gray-500 font-mono text-sm">IGNIS • 2 hours ago</span>
                  </div>
                  
                  <h3 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight group-hover:text-orange-500 transition-colors relative z-10">
                    The New Fire: Exclusive Interview with 'New Rahul'
                  </h3>
                  
                  <p className="text-2xl text-gray-400 mb-10 leading-relaxed font-light max-w-4xl relative z-10">
                    In a candid sit-down, the successor to the Hellfire legacy opens up about the controversial 2025 restructuring, the burden of the name, and the team's reaction to the shocking demotion ruling.
                  </p>

                  <div className="flex items-center gap-3 text-orange-500 font-bold uppercase tracking-widest text-sm group-hover:gap-5 transition-all relative z-10">
                     Read Full Article <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
                
                {/* Secondary Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-900/40 border border-white/10 rounded-3xl p-10 hover:bg-gray-900/60 transition-colors hover:-translate-y-1 duration-300">
                     <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded border border-blue-500/30 text-xs font-bold uppercase">Analysis</span>
                        <span className="text-gray-500 text-xs">GHL • Yesterday</span>
                     </div>
                     <h4 className="text-3xl font-bold text-white mb-4 hover:text-blue-400 cursor-pointer transition-colors leading-tight">Investigative Report: The Cost of Victory</h4>
                     <p className="text-gray-400 text-lg leading-relaxed mb-4 font-light">Hellfire's total team investment topped ₹4.2 crores. We break down the player acquisition costs.</p>
                  </div>

                   <div className="bg-gray-900/40 border border-white/10 rounded-3xl p-10 hover:bg-gray-900/60 transition-colors hover:-translate-y-1 duration-300">
                     <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded border border-purple-500/30 text-xs font-bold uppercase">Opinion</span>
                        <span className="text-gray-500 text-xs">IGNIS • 3 days ago</span>
                     </div>
                     <h4 className="text-3xl font-bold text-white mb-4 hover:text-purple-400 cursor-pointer transition-colors leading-tight">Why Stellarx is the Real Winner of 2025</h4>
                     <p className="text-gray-400 text-lg leading-relaxed mb-4 font-light">While Hellfire grabbed headlines, Stellarx quietly built a dynasty that will last decades.</p>
                  </div>
                </div>

                {/* Historical Archive (The Vault) */}
                <div className="pt-16 border-t border-white/10">
                  <div className="flex items-center justify-between mb-12">
                    <h3 className="text-4xl font-black text-white uppercase tracking-wide flex items-center gap-5">
                      <AlignLeft className="w-10 h-10 text-gray-500" /> Official Transcripts
                    </h3>
                    <div className="hidden md:block text-gray-500 font-mono text-sm uppercase tracking-widest">
                       Archive Access: PUBLIC
                    </div>
                  </div>
                  
                  <div className="grid gap-6">
                    {ARCHIVE_MEDIA.map((item, i) => (
                      <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-8 hover:bg-white/10 hover:border-white/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 group cursor-pointer" onClick={() => setSelectedTranscript(item)}>
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                             <span className="text-sm font-mono text-orange-500 font-bold">{item.year}</span>
                             <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-black/40 px-3 py-1 rounded border border-white/5">{item.type}</span>
                          </div>
                          <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">{item.event}</h4>
                          <p className="text-base text-gray-400 font-light"><span className="text-gray-200 font-medium">{item.speaker}</span> — {item.context}</p>
                        </div>
                        
                        <div className="w-full md:w-auto shrink-0">
                           <button 
                             className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors border border-white/10 px-6 py-3 rounded-xl group-hover:bg-orange-600 group-hover:border-orange-600 shadow-lg"
                           >
                              <FileText className="w-4 h-4" /> Read Full Text
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-[#020202] border-t border-white/5 py-24 mt-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1600px]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
            <div className="text-left">
              <h2 className="text-6xl font-black text-white tracking-tighter mb-2 opacity-50">SICS</h2>
              <p className="text-sm text-gray-500 uppercase tracking-[0.3em] font-bold">Supreme Inter-Competitive Series</p>
            </div>
            <div className="flex flex-wrap gap-12">
              {['About', 'Careers', 'Press', 'Legal', 'Contact'].map((link) => (
                  <a key={link} href="#" className="text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold">{link}</a>
              ))}
            </div>
            <div className="text-gray-700 text-sm font-mono">
              &copy; 1990-2025 SICS League. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        @keyframes gradient-x {
            0%, 100% {
                background-size: 200% 200%;
                background-position: left center;
            }
            50% {
                background-size: 200% 200%;
                background-position: right center;
            }
        }
        .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}