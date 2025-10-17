import { useState, useEffect } from 'react';
import { Calendar, Check, TrendingUp, Brain, Heart, Target, Sparkles, Sun, Moon } from 'lucide-react';

interface DailyTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: 'mindset' | 'action' | 'reflection';
}

interface DayContent {
  theme: string;
  icon: any;
  color: string;
  gradient: string;
  affirmations: string[];
  focusAreas: string[];
  tasks: DailyTask[];
  eveningReflection: string[];
}

const WEEKLY_CONTENT: Record<string, DayContent> = {
  Sunday: {
    theme: "Vision & Planning",
    icon: Sparkles,
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
    affirmations: [
      "I am the architect of my life; I build its foundation and choose its contents",
      "This week, I am unstoppable and focused on my highest goals",
      "I attract abundance and success in all areas of my life"
    ],
    focusAreas: [
      "Review last week's wins and lessons",
      "Set clear intentions for the week ahead",
      "Visualize your ideal outcomes",
      "Plan major tasks and priorities"
    ],
    tasks: [
      { id: 'sun-1', title: 'Weekly Review', description: 'Reflect on last week - what worked, what didn\'t', completed: false, category: 'reflection' },
      { id: 'sun-2', title: 'Set Weekly Intentions', description: 'Write down 3-5 main goals for this week', completed: false, category: 'mindset' },
      { id: 'sun-3', title: 'Visualize Success', description: '10 minutes of vivid visualization of your goals', completed: false, category: 'mindset' },
      { id: 'sun-4', title: 'Plan Week Schedule', description: 'Block time for your most important tasks', completed: false, category: 'action' }
    ],
    eveningReflection: [
      "What am I most excited about this week?",
      "What obstacles might I face and how will I overcome them?",
      "How do I want to feel by the end of this week?"
    ]
  },
  Monday: {
    theme: "Momentum & Action",
    icon: TrendingUp,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    affirmations: [
      "I start this week with unstoppable momentum and clarity",
      "Every action I take today moves me closer to my goals",
      "I am energized, focused, and ready to dominate this week"
    ],
    focusAreas: [
      "Take immediate action on your #1 priority",
      "Build momentum with quick wins",
      "Stay focused on high-impact activities",
      "Avoid distractions and time-wasters"
    ],
    tasks: [
      { id: 'mon-1', title: 'Morning Power Hour', description: 'Tackle your most important task first thing', completed: false, category: 'action' },
      { id: 'mon-2', title: 'Quick Win Sprint', description: 'Complete 3 small tasks to build momentum', completed: false, category: 'action' },
      { id: 'mon-3', title: 'Focus Block', description: '90 minutes of deep work, no interruptions', completed: false, category: 'action' },
      { id: 'mon-4', title: 'Energy Check', description: 'Rate your energy 1-10, adjust as needed', completed: false, category: 'reflection' }
    ],
    eveningReflection: [
      "What momentum did I build today?",
      "What's my #1 priority for tomorrow?",
      "How can I improve my focus and energy?"
    ]
  },
  Tuesday: {
    theme: "Deep Work & Mastery",
    icon: Brain,
    color: "indigo",
    gradient: "from-indigo-500 to-purple-500",
    affirmations: [
      "I am in a state of flow, creating my best work effortlessly",
      "My mind is sharp, focused, and operating at peak capacity",
      "I master new skills with ease and confidence"
    ],
    focusAreas: [
      "Enter deep work states - no multitasking",
      "Learn and improve your craft",
      "Eliminate all distractions",
      "Practice deliberate skill development"
    ],
    tasks: [
      { id: 'tue-1', title: 'Deep Work Session 1', description: '2 hours of uninterrupted focused work', completed: false, category: 'action' },
      { id: 'tue-2', title: 'Skill Development', description: 'Practice or learn something new for 45 minutes', completed: false, category: 'action' },
      { id: 'tue-3', title: 'Deep Work Session 2', description: 'Another 90-minute focused work block', completed: false, category: 'action' },
      { id: 'tue-4', title: 'Learning Review', description: 'Document key insights from today', completed: false, category: 'reflection' }
    ],
    eveningReflection: [
      "What did I learn or master today?",
      "How deep was my focus? (Rate 1-10)",
      "What will I improve tomorrow?"
    ]
  },
  Wednesday: {
    theme: "Connection & Communication",
    icon: Heart,
    color: "rose",
    gradient: "from-rose-500 to-pink-500",
    affirmations: [
      "I communicate with clarity, confidence, and authenticity",
      "I build powerful relationships that support my growth",
      "I am a magnet for positive, ambitious people"
    ],
    focusAreas: [
      "Strengthen key relationships",
      "Communicate your vision clearly",
      "Network and collaborate",
      "Give value to others"
    ],
    tasks: [
      { id: 'wed-1', title: 'Reach Out', description: 'Connect with 3 people who inspire you', completed: false, category: 'action' },
      { id: 'wed-2', title: 'Value Creation', description: 'Help someone solve a problem today', completed: false, category: 'action' },
      { id: 'wed-3', title: 'Communication Practice', description: 'Refine your pitch or presentation', completed: false, category: 'action' },
      { id: 'wed-4', title: 'Gratitude List', description: 'Write 5 people you\'re grateful for', completed: false, category: 'mindset' }
    ],
    eveningReflection: [
      "Who did I connect with meaningfully today?",
      "How did I add value to others?",
      "What relationship will I nurture tomorrow?"
    ]
  },
  Thursday: {
    theme: "Execution & Results",
    icon: Target,
    color: "emerald",
    gradient: "from-emerald-500 to-green-500",
    affirmations: [
      "I execute with precision and achieve outstanding results",
      "Every action I take creates measurable progress",
      "I am a finisher - I complete what I start"
    ],
    focusAreas: [
      "Complete unfinished projects",
      "Focus on measurable outcomes",
      "Track your progress and wins",
      "Push through resistance"
    ],
    tasks: [
      { id: 'thu-1', title: 'Project Push', description: 'Move your main project forward significantly', completed: false, category: 'action' },
      { id: 'thu-2', title: 'Results Tracking', description: 'Measure and document your progress', completed: false, category: 'reflection' },
      { id: 'thu-3', title: 'Finish Strong', description: 'Complete 2-3 pending tasks completely', completed: false, category: 'action' },
      { id: 'thu-4', title: 'Wins Documentation', description: 'List all wins and accomplishments today', completed: false, category: 'reflection' }
    ],
    eveningReflection: [
      "What tangible results did I create today?",
      "What am I most proud of finishing?",
      "How can I execute even better tomorrow?"
    ]
  },
  Friday: {
    theme: "Optimization & Improvement",
    icon: TrendingUp,
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
    affirmations: [
      "I constantly improve and optimize every area of my life",
      "I learn from every experience and become better daily",
      "I am committed to continuous growth and evolution"
    ],
    focusAreas: [
      "Review what's working and what's not",
      "Optimize your systems and processes",
      "Learn from mistakes and wins",
      "Prepare for next week"
    ],
    tasks: [
      { id: 'fri-1', title: 'Week Review', description: 'Analyze what worked well this week', completed: false, category: 'reflection' },
      { id: 'fri-2', title: 'System Optimization', description: 'Improve one process or habit', completed: false, category: 'action' },
      { id: 'fri-3', title: 'Learning Integration', description: 'Document key lessons from the week', completed: false, category: 'reflection' },
      { id: 'fri-4', title: 'Next Week Prep', description: 'Prepare tools and resources for Monday', completed: false, category: 'action' }
    ],
    eveningReflection: [
      "What was my biggest win this week?",
      "What will I do differently next week?",
      "How much did I grow this week? (Rate 1-10)"
    ]
  },
  Saturday: {
    theme: "Recharge & Restore",
    icon: Sun,
    color: "sky",
    gradient: "from-sky-500 to-blue-500",
    affirmations: [
      "I honor my need for rest and restoration",
      "I recharge my mind, body, and spirit with joy",
      "I am balanced, energized, and ready for continued success"
    ],
    focusAreas: [
      "Rest and recover intentionally",
      "Engage in activities that energize you",
      "Spend time on hobbies and passion projects",
      "Prepare mentally for the week ahead"
    ],
    tasks: [
      { id: 'sat-1', title: 'Self-Care Morning', description: 'Do something that brings you pure joy', completed: false, category: 'mindset' },
      { id: 'sat-2', title: 'Physical Activity', description: 'Move your body - workout, walk, or play', completed: false, category: 'action' },
      { id: 'sat-3', title: 'Passion Project', description: 'Work on something you love, no pressure', completed: false, category: 'action' },
      { id: 'sat-4', title: 'Mental Prep', description: 'Light planning and visualization for next week', completed: false, category: 'mindset' }
    ],
    eveningReflection: [
      "How recharged do I feel? (Rate 1-10)",
      "What gave me the most joy today?",
      "What am I grateful for from this week?"
    ]
  }
};

const DailyFocusPage = () => {
  const [currentDay, setCurrentDay] = useState<string>('');
  const [dayContent, setDayContent] = useState<DayContent | null>(null);
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [completedAffirmations, setCompletedAffirmations] = useState<boolean[]>([]);
  const [isEvening, setIsEvening] = useState(false);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const hour = new Date().getHours();
    setIsEvening(hour >= 17); // After 5 PM is evening
    setCurrentDay(today);
    
    if (WEEKLY_CONTENT[today]) {
      const content = WEEKLY_CONTENT[today];
      setDayContent(content);
      
      // Load saved progress from localStorage
      const savedTasks = localStorage.getItem(`daily-tasks-${today}`);
      const savedAffirmations = localStorage.getItem(`daily-affirmations-${today}`);
      
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        setTasks(content.tasks);
      }
      
      if (savedAffirmations) {
        setCompletedAffirmations(JSON.parse(savedAffirmations));
      } else {
        setCompletedAffirmations(content.affirmations.map(() => false));
      }
    }
  }, []);

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem(`daily-tasks-${currentDay}`, JSON.stringify(updatedTasks));
  };

  const toggleAffirmation = (index: number) => {
    const updated = [...completedAffirmations];
    updated[index] = !updated[index];
    setCompletedAffirmations(updated);
    localStorage.setItem(`daily-affirmations-${currentDay}`, JSON.stringify(updated));
  };

  const completionRate = tasks.length > 0 
    ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)
    : 0;

  if (!dayContent) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const Icon = dayContent.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`bg-gradient-to-r ${dayContent.gradient} rounded-3xl p-8 mb-8 shadow-2xl text-white`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Icon size={40} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={20} />
                  <span className="text-sm font-medium opacity-90">{currentDay}</span>
                </div>
                <h1 className="text-4xl font-black">{dayContent.theme}</h1>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90 mb-1">Daily Progress</div>
              <div className="text-5xl font-black">{completionRate}%</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white/20 backdrop-blur-sm rounded-full h-3 overflow-hidden">
            <div 
              className="bg-white h-full transition-all duration-500 rounded-full"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Morning Affirmations */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className={`bg-gradient-to-br ${dayContent.gradient} p-2 rounded-lg`}>
                  <Sparkles className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Morning Affirmations</h2>
              </div>
              <div className="space-y-3">
                {dayContent.affirmations.map((affirmation, index) => (
                  <div
                    key={index}
                    onClick={() => toggleAffirmation(index)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                      completedAffirmations[index]
                        ? `bg-gradient-to-r ${dayContent.gradient} text-white border-transparent shadow-lg`
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        completedAffirmations[index]
                          ? 'border-white bg-white/20'
                          : 'border-gray-400'
                      }`}>
                        {completedAffirmations[index] && <Check size={16} className="text-white" />}
                      </div>
                      <p className="font-medium leading-relaxed">{affirmation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Tasks */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className={`bg-gradient-to-br ${dayContent.gradient} p-2 rounded-lg`}>
                  <Target className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Daily Tasks</h2>
              </div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                      task.completed
                        ? 'bg-green-50 border-green-300'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        task.completed
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-400'
                      }`}>
                        {task.completed && <Check size={16} className="text-white" />}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold mb-1 ${task.completed ? 'text-green-900 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </h3>
                        <p className={`text-sm ${task.completed ? 'text-green-700' : 'text-gray-600'}`}>
                          {task.description}
                        </p>
                        <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                          task.category === 'mindset' ? 'bg-purple-100 text-purple-700' :
                          task.category === 'action' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {task.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evening Reflection */}
            {isEvening && (
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <Moon className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">Evening Reflection</h2>
                </div>
                <div className="space-y-3">
                  {dayContent.eveningReflection.map((question, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                      <p className="font-medium">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Focus Areas */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className={`bg-gradient-to-br ${dayContent.gradient} p-2 rounded-lg`}>
                  <Brain className="text-white" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Focus Areas</h2>
              </div>
              <ul className="space-y-3">
                {dayContent.focusAreas.map((area, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className={`text-${dayContent.color}-500 font-bold mt-1`}>▸</span>
                    <span className="text-gray-700 leading-relaxed">{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weekly Navigation */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">This Week</h2>
              <div className="space-y-2">
                {Object.entries(WEEKLY_CONTENT).map(([day, content]) => (
                  <button
                    key={day}
                    onClick={() => {
                      setCurrentDay(day);
                      setDayContent(content);
                      const savedTasks = localStorage.getItem(`daily-tasks-${day}`);
                      if (savedTasks) {
                        setTasks(JSON.parse(savedTasks));
                      } else {
                        setTasks(content.tasks);
                      }
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      day === currentDay
                        ? `bg-gradient-to-r ${content.gradient} text-white shadow-md`
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`text-xs font-bold ${day === currentDay ? 'text-white' : 'text-gray-500'}`}>
                        {day.slice(0, 3).toUpperCase()}
                      </div>
                      <div className="text-sm font-medium">{content.theme}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className={`bg-gradient-to-br ${dayContent.gradient} rounded-2xl p-6 shadow-lg text-white`}>
              <h3 className="text-lg font-bold mb-4">Today's Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Tasks Completed</span>
                  <span className="text-2xl font-black">{tasks.filter(t => t.completed).length}/{tasks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Affirmations</span>
                  <span className="text-2xl font-black">{completedAffirmations.filter(Boolean).length}/{completedAffirmations.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Overall Progress</span>
                  <span className="text-2xl font-black">{completionRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyFocusPage;




