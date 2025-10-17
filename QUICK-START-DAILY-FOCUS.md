# Quick Start: Daily Focus Feature

## 🚀 Getting Started in 3 Steps

### Step 1: Start the App
```bash
npm install  # If you haven't already
npm run dev  # Start development server
```

### Step 2: Navigate to Daily Focus
1. Open your browser to `http://localhost:5173`
2. You'll see the Dashboard
3. Click the **large blue banner** that says "[Today's Day] - Your Daily Focus"
   - OR go directly to: `http://localhost:5173/daily-focus`

### Step 3: Start Your Day!
1. ✨ **Read Affirmations**: Click each of the 3 morning affirmations
2. 🎯 **Review Tasks**: See your 4 tasks for today
3. 🧠 **Check Focus Areas**: Note the 4 key areas to concentrate on
4. ✅ **Complete Tasks**: Click tasks to mark them done throughout the day
5. 🌙 **Evening Reflection**: After 5 PM, answer reflection questions

## 📅 What You'll See Today

The app automatically shows content for **{Current Day}**.

### Example: If it's Monday
- **Theme**: "Momentum & Action"
- **Color**: Blue/Cyan gradient
- **Focus**: Building unstoppable momentum
- **3 Affirmations** about taking action and staying focused
- **4 Tasks** like "Morning Power Hour" and "Focus Block"
- **Progress Tracking** showing your completion rate

## 🎨 Visual Guide

### Dashboard View
```
┌─────────────────────────────────────────────────┐
│  Welcome to ConsistentMind                      │
│                                                  │
│  ┌───────────────────────────────────────────┐ │
│  │ 📅  Monday - Your Daily Focus             │ │
│  │  Get your personalized plan for today...  │ │
│  │                                         19 │ │
│  │                                    Oct 2025│ │
│  └───────────────────────────────────────────┘ │
│                                                  │
│  [Unstoppable Mind] [Manifestation] [Goals]...  │
└─────────────────────────────────────────────────┘
```

### Daily Focus Page Layout
```
┌─────────────────────────────────────────────────┐
│  📅 Monday                                       │
│  Momentum & Action                          75% │
│  ████████████░░░░                               │
├─────────────────────────────────────────────────┤
│                                                  │
│  ✨ Morning Affirmations                        │
│  ┌─────────────────────────────────────────┐   │
│  │ ✓ I start this week with unstoppable... │   │
│  │ ✓ Every action I take today moves me... │   │
│  │ □ I am energized, focused, and ready... │   │
│  └─────────────────────────────────────────┘   │
│                                                  │
│  🎯 Daily Tasks                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ ✓ Morning Power Hour                    │   │
│  │ ✓ Quick Win Sprint                      │   │
│  │ □ Focus Block                           │   │
│  │ □ Energy Check                          │   │
│  └─────────────────────────────────────────┘   │
│                                                  │
│  🧠 Focus Areas          📊 Stats               │
│  • Take immediate action • Tasks: 2/4           │
│  • Build momentum        • Affirmations: 2/3    │
│  • Stay focused          • Progress: 75%        │
│  • Avoid distractions                           │
└─────────────────────────────────────────────────┘
```

## 📱 Mobile Experience

The page is fully responsive and looks great on mobile:
- Single column layout
- Large, tap-friendly buttons
- Smooth scrolling
- All features accessible

## 🎯 Daily Workflow

### Morning (Start of Day)
1. Open app
2. Click featured Daily Focus banner
3. Read and click through affirmations (2 min)
4. Review your 4 tasks (1 min)
5. Note the focus areas (1 min)
6. **Total: 4 minutes to start your day right!**

### Throughout Day
- Check off tasks as you complete them
- Refer to focus areas when needed
- Watch your progress percentage grow

### Evening (After 5 PM)
- Return to Daily Focus page
- Answer 3 reflection questions
- Review your completion rate
- Feel accomplished!

## 🗓️ Weekly Journey

Each day is different:

**Sunday**: Plan your week, set intentions
**Monday**: Take action, build momentum  
**Tuesday**: Deep work, master skills
**Wednesday**: Connect and communicate
**Thursday**: Execute and deliver results
**Friday**: Review and optimize
**Saturday**: Rest and recharge

## 🔥 Pro Tips

### Tip 1: Make it a Habit
- Open Daily Focus **first thing** in the morning
- Bookmark: `http://localhost:5173/daily-focus`

### Tip 2: Evening Reflection
- Set a reminder for 5 PM to do your evening reflection
- Take 5 minutes to thoughtfully answer the questions

### Tip 3: Explore Different Days
- Use the **weekly navigation** on the right sidebar
- Preview tomorrow's theme
- Plan ahead for the week

### Tip 4: Track Your Streaks
- Try to hit 100% completion each day
- Build momentum by completing tasks early

### Tip 5: Customize (Advanced)
- Edit `src/pages/DailyFocusPage.tsx`
- Modify the `WEEKLY_CONTENT` object
- Add your own affirmations and tasks

## ❓ FAQ

### Q: When does the day reset?
**A:** The day updates automatically at midnight based on your system time.

### Q: Is my progress saved?
**A:** Yes! Everything saves automatically to localStorage. Your progress persists even if you close the browser.

### Q: Can I change the content?
**A:** Absolutely! Edit the `WEEKLY_CONTENT` object in the component. See [DAILY-FOCUS-FEATURE.md](./DAILY-FOCUS-FEATURE.md) for details.

### Q: Does it work offline?
**A:** Yes! Once loaded, it works completely offline.

### Q: Can I use it on mobile?
**A:** Yes! Fully responsive and mobile-optimized.

## 🎉 Success Indicators

You're using it right when:
- ✅ You check it every morning
- ✅ You complete most/all tasks daily
- ✅ You feel more focused throughout the day
- ✅ You do evening reflections regularly
- ✅ Your completion rate is consistently high

## 📊 Example Daily Stats

After using for a day, you might see:
```
Tasks Completed: 4/4
Affirmations: 3/3
Overall Progress: 100%
```

This means:
- ✨ You read all 3 affirmations
- ✅ You completed all 4 tasks
- 🎯 You had a 100% productive day!

## 🚀 Next Steps

1. ✅ Start using Daily Focus today
2. ✅ Complete all tasks and affirmations
3. ✅ Do evening reflection
4. ✅ Come back tomorrow for new content
5. ✅ Build a 7-day streak!

## 💬 Feedback

As you use the feature, think about:
- What do you love?
- What could be better?
- What tasks/affirmations resonate most?
- What would you change?

## 🎯 Your First Day Challenge

**Today's Mission**: Hit 100% completion!

1. [ ] Read all 3 affirmations
2. [ ] Complete all 4 tasks
3. [ ] Review focus areas at least twice
4. [ ] Do evening reflection
5. [ ] Check your stats

**Reward**: Feel accomplished and build momentum for tomorrow! 🏆

---

**Ready to start?** Just run `npm run dev` and open `http://localhost:5173`!

🎉 **Let's make today amazing!** 🎉

