# 🎓 WEEK 1 STUDENT GUIDE
**React Fundamentals & Project Setup**

## 📅 This Week's Mission
Get your development environment set up and make your first React component modifications. By the end of today, you'll have a working data analysis application running on your computer!

## 🎯 Learning Goals
- ✅ Have the project running locally on your machine
- ✅ Understand what React components are and how they work
- ✅ Know the difference between JSX and regular HTML
- ✅ Be able to identify props in existing code
- ✅ Make your first code modification successfully

## 🚀 Pre-Session Setup

### Required Software Check
Before class, make sure you have these installed:

#### 1. Node.js (JavaScript Runtime)
```bash
# Test if installed
node --version
# Should show v18.x.x or higher
```
**If not installed**: Download from [nodejs.org](https://nodejs.org) (LTS version)

#### 2. Git (Version Control)
```bash
# Test if installed
git --version
# Should show git version 2.x.x
```
**If not installed**: Download from [git-scm.com](https://git-scm.com)

#### 3. VS Code (Code Editor)
**Download**: [code.visualstudio.com](https://code.visualstudio.com)

**Required Extensions**:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- Auto Rename Tag
- Bracket Pair Colorizer

#### 4. GitHub Account
**Create account**: [github.com](https://github.com)

### Project Setup
```bash
# 1. Clone the starter project
git clone https://github.com/bvcc-swe/data-discovery-plug.git
cd data-discovery-plug

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to http://localhost:5173
```

**✅ Success Check**: You should see "Plug-N-Learn" homepage with a file upload area.

## 📚 Key Concepts Explained

### What is a React Component?
Think of components like LEGO blocks:
- Each component has **one specific job**
- You can **reuse** components anywhere in your app
- You **combine** smaller components to build bigger features

**Example**: The `DataUpload` component's only job is handling file uploads.

### JSX vs HTML
JSX looks like HTML but it's actually JavaScript:

```jsx
// JSX (what we write)
<button onClick={handleClick}>Upload File</button>

// What JSX becomes (pure JavaScript)
React.createElement('button', { onClick: handleClick }, 'Upload File')
```

**Key Difference**: JSX lets you mix HTML-like syntax with JavaScript logic.

### Props (Properties)
Props are how components talk to each other:
```jsx
// Parent component passes data
<DataUpload onDataLoad={handleDataLoad} />

// Child component receives data
const DataUpload = ({ onDataLoad }) => {
  // Use the onDataLoad function here
}
```

## 🛠️ Today's Hands-On Tasks

### Task 1: Explore the File Structure
Open these files and see how they connect:
```
src/
├── App.tsx              # Main app container
├── pages/Index.tsx      # Homepage component
└── components/
    ├── DataUpload.tsx   # File upload feature
    ├── Dashboard.tsx    # Main dashboard
    └── ui/              # Reusable UI pieces
```

### Task 2: Your First Modification
**Goal**: Personalize the homepage title

1. **Open**: `src/pages/Index.tsx`
2. **Find**: Line 28 with "Plug-N-Learn"
3. **Change to**: "Plug-N-Learn: [Your Name]'s Dashboard"
4. **Save** and check your browser - it should update automatically!

### Task 3: Explore Components
**In `src/components/DataUpload.tsx`**, find:
- The component name (starts with `const DataUpload`)
- Props being received (look for `{` after the component name)
- JSX being returned (inside the `return (` statement)

### Task 4: Experiment with Styling
**Try changing colors**:
1. Look for `"blue-600"` in any file
2. Change it to `"purple-600"` or `"green-600"`
3. See what changes in your browser!

## 📊 Sample Data for Testing
Download and save these CSV files to test your app:

### Beginner Dataset: Simple Sales
**File**: `week1-simple-sales.csv`
```csv
Product,Sales,Month
T-Shirts,150,January
Jeans,200,January
Shoes,175,January
T-Shirts,180,February
Jeans,220,February
Shoes,160,February
```

**How to use**: 
1. Copy the data above
2. Save as `week1-simple-sales.csv` on your desktop
3. Try uploading it to your app

## 🏠 Homework Assignments

### Required Tasks
- [ ] **Task 1**: Finish in class activities
- [ ] **Task 2**: Complete exercises in week1-exercises.md 
- [ ] **Task 3**: Explore `src/components/Dashboard.tsx` and identify 3 different components being used


### Stretch Goals (Optional)
- [ ] **Challenge 1**: Find where the page title (browser tab) is set and change it
- [ ] **Challenge 2**: Add your name to the footer or header
- [ ] **Challenge 3**: Create a simple CSV file with your own data to test

### Reflection Questions
Write answers to these (bring to next class):
1. What's the difference between a component and regular HTML?
2. How do props help components work together?
3. What happens when you save a file - how does the browser update?

## 🆘 Troubleshooting

### "npm run dev" isn't working
```bash
# Try these steps:
npm cache clean --force
rm -rf node_modules
npm install
npm run dev
```

### Browser shows errors
1. Check the terminal for red error messages
2. Look at browser console (F12 → Console tab)
3. Make sure you saved your files

### Changes not showing
1. Save your file (Ctrl+S or Cmd+S)
2. Refresh browser (F5)
3. Check if development server is still running

## 🎯 Success Criteria
By the end of Week 1, you should:
- ✅ Have the app running without errors
- ✅ Successfully made at least 2 text changes
- ✅ Understand the basic file structure
- ✅ Know what components, JSX, and props are
- ✅ Feel comfortable making small changes

## 📞 Getting Help
- **During class**: Ask questions immediately!
- **Slack/Discord**: [Your class channel]
- **Email instructor**: [Instructor email]
- **Study buddy**: Partner with a classmate

---

**Next Week Preview**: We'll learn about React state - how to make components remember and change data. You'll build your first interactive feature! 🚀

*Week 1 Guide - Updated September 2025*
