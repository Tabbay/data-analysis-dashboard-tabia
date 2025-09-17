# 🎯 Student Setup Guide: Using the GitHub Template

**How to get your own copy of the project and stay updated with weekly improvements**

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Your Copy
1. **Go to the template repository**: [link](https://github.com/bvcc-swe/data-discovery-plug)
2. **Click the green "Use this template" button**
3. **Click "Create a new repository"**
4. **Name your repository**: `data-analysis-dashboard-[your-name]`
5. **Set it to Public** (so you can deploy it later)
6. **Click "Create repository"**

### Step 2: Clone to Your Computer
```bash
# Clone YOUR new repository (replace with your username)
git clone https://github.com/YOUR_USERNAME/data-analysis-dashboard-[your-name].git

# Navigate to the project
cd data-analysis-dashboard-[your-name]

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Step 3: Connect to Instructor Updates
```bash
# Add the instructor's repository as "upstream"
git remote add upstream https://github.com/bvcc-swe/data-discovery-plug.git

# Verify it worked
git remote -v
```

You should see:
- `origin` → Your repository (where you push your work)
- `upstream` → Instructor's repository (where you get updates)

## 📅 Weekly Update Process

**Every week, your instructor will release new features, fixes, and improvements. Here's how to get them:**

### Option 1: Get All Updates (Recommended)
```bash
# 1. Save your current work
git add .
git commit -m "My progress before week X updates"

# 2. Get instructor updates
git fetch upstream
git merge upstream/main

# 3. If there are conflicts, see the troubleshooting section below
```

### Option 2: Cherry-Pick Specific Updates
```bash
# 1. See what's new
git fetch upstream
git log upstream/main --oneline

# 2. Pick specific commits (replace COMMIT_HASH with actual hash)
git cherry-pick COMMIT_HASH
```

## 🔧 Troubleshooting Common Issues

### "Merge conflicts" when updating
**What happened:** You and your instructor changed the same file

**How to fix:**
1. Open the conflicted files in VS Code
2. Look for lines with `<<<<<<<`, `=======`, and `>>>>>>>`
3. Choose which version to keep (yours or instructor's)
4. Remove the conflict markers
5. Save the file
6. Complete the merge:
```bash
git add .
git commit -m "Resolved merge conflicts"
```

### "Your branch is ahead/behind"
**What happened:** Normal! This means you have different changes than the instructor

**How to fix:** Nothing! This is expected. Push your changes when ready:
```bash
git push origin main
```

### Can't see instructor updates
**What happened:** You might not have the upstream remote set up

**How to fix:**
```bash
# Check your remotes
git remote -v

# If upstream is missing, add it
git remote add upstream https://github.com/INSTRUCTOR_USERNAME/TEMPLATE_REPO_NAME.git
```

### Accidentally broke something important
**Emergency reset:** Get back to a working state
```bash
# See your recent commits
git log --oneline

# Go back to a working commit (replace COMMIT_HASH)
git reset --hard COMMIT_HASH

# Or get a fresh copy from instructor
git fetch upstream
git reset --hard upstream/main
```

## 📋 Best Practices

### 1. Commit Your Work Regularly
```bash
# Good practice: commit after each exercise
git add .
git commit -m "Completed Week 2 Exercise 3: Added state management"
```

### 2. Keep Your Repository Updated
- Check for instructor updates at the start of each week
- Read the release notes to understand what's new

### 3. Use Descriptive Commit Messages
```bash
# ❌ Bad
git commit -m "stuff"

# ✅ Good
git commit -m "Added search functionality to data table component"
```

### 4. Push Your Work to GitHub
```bash
# Push your changes regularly
git push origin main
```

## 🆘 Getting Help

### If You're Stuck
1. **Check the troubleshooting section above**
2. **Ask a classmate** - they might have solved the same issue
3. **Ask your instructor** - include:
   - What you were trying to do
   - The exact error message
   - What you've already tried

### Useful Git Commands
```bash
# See the status of your files
git status

# See your commit history
git log --oneline

# See what remotes you have
git remote -v

# See what branch you're on
git branch
```

## 🎉 You're All Set!

Now you have:
- ✅ Your own copy of the project to work on
- ✅ Connection to get instructor updates
- ✅ Knowledge of how to handle common issues

Happy coding! 🚀