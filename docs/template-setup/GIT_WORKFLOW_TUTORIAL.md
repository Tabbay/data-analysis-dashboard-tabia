# 🌟 Git Workflow Tutorial for Students

**Learn Git while building your data analysis dashboard**

## 🎯 What You'll Learn

By the end of this tutorial, you'll understand:
- How Git tracks changes in your code
- The difference between local and remote repositories
- How to collaborate with your instructor through updates
- Essential Git commands for daily development

## 📚 Git Concepts Made Simple

### Think of Git Like...

**A Time Machine for Your Code**
- Each commit is a snapshot in time
- You can go back to any previous version
- You can see exactly what changed and when

**A Collaboration Tool**
- Your instructor makes improvements
- You make your own changes
- Git helps merge everything together safely

## 🛠️ Essential Git Workflow

### Daily Development Cycle

#### 1. Check Your Status
```bash
# Always start by seeing what's changed
git status
```

This shows:
- 🔴 **Red files**: Changed but not staged
- 🟢 **Green files**: Staged and ready to commit
- 📝 **Untracked files**: New files Git doesn't know about

#### 2. Stage Your Changes
```bash
# Stage specific files
git add src/components/DataUpload.tsx

# Stage all changes (be careful!)
git add .

# Stage by category
git add *.tsx  # All TypeScript files
```

#### 3. Commit Your Changes
```bash
# Commit with a descriptive message
git commit -m "Add file size validation to upload component"
```

**Good Commit Messages:**

Follow the **Conventional Commits** standard for professional, consistent commit messages:
📖 **Learn more:** [conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/)

**Format:** `type: description`

**Common types:**
- `feat:` - New features or functionality
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code formatting (no logic changes)
- `refactor:` - Code improvements (no new features)
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**
- ✅ `feat: add file upload validation`
- ✅ `fix: data table sorting bug`
- ✅ `docs: update README setup instructions`
- ✅ `style: format DataUpload component`
- ✅ `chore: complete Week 3 Exercise 2`
- ❌ "changes"
- ❌ "stuff"
- ❌ "idk"

#### 4. Push to Your Repository
```bash
# Send your commits to GitHub
git push origin main
```

### Weekly Update Cycle

#### 1. Save Your Current Work
```bash
# Make sure everything is committed
git add .
git commit -m "My progress before getting week X updates"
```

#### 2. Get Instructor Updates
```bash
# Download latest instructor changes
git fetch upstream

# See what's new (optional but helpful)
git log upstream/main --oneline -5

# Merge instructor updates
git merge upstream/main
```

#### 3. Handle Any Conflicts
If you see a message about merge conflicts:

```bash
# Check which files have conflicts
git status
```

Open the conflicted files in VS Code and look for:
```
<<<<<<< HEAD
Your changes
=======
Instructor's changes
>>>>>>> upstream/main
```

Choose which version to keep, remove the conflict markers, then:
```bash
git add .
git commit -m "Resolved merge conflicts from week X updates"
```

#### 4. Push Your Updated Code
```bash
git push origin main
```

## 🎓 Git Commands Cheat Sheet

### Basic Commands
```bash
# See what's changed
git status

# See commit history
git log --oneline

# See detailed changes
git diff

# Add files to staging
git add <filename>
git add .  # Add everything

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push origin main
```

### Remote Repository Management
```bash
# See your remotes
git remote -v

# Add instructor's repo as upstream
git remote add upstream https://github.com/instructor/repo.git

# Get updates from instructor
git fetch upstream
git merge upstream/main

# Remove a remote (if needed)
git remote remove upstream
```

### Undo Operations
```bash
# Unstage a file
git reset HEAD <filename>

# Undo changes to a file (be careful!)
git checkout -- <filename>

# Go back to previous commit (danger!)
git reset --hard HEAD~1

# See reflog (recovery tool)
git reflog
```

## 🚨 Common Scenarios & Solutions

### Scenario 1: "I Made a Mistake in My Last Commit"

**If you haven't pushed yet:**
```bash
# Fix the mistake, then
git add .
git commit --amend -m "Fixed commit message"
```

**If you already pushed:**
```bash
# Make a new commit with the fix
git add .
git commit -m "Fix mistake from previous commit"
```

### Scenario 2: "I Want to Ignore Certain Files"

Create a `.gitignore` file:
```
# Dependencies
node_modules/

# Build output
dist/
build/

# Environment variables
.env
.env.local

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db
```

### Scenario 3: "I Accidentally Committed Something I Shouldn't Have"

**For the last commit:**
```bash
# Remove file from commit but keep in working directory
git reset --soft HEAD~1
git reset HEAD <filename>
git commit -m "Fixed commit without sensitive file"
```

### Scenario 4: "My Repository is Completely Broken"

**Nuclear option (last resort):**
```bash
# Back up your important changes first!
# Then reset to instructor's latest version
git fetch upstream
git reset --hard upstream/main
git push origin main --force
```

## 🌟 Advanced Tips for Faster Development

### 1. Use Git Aliases
```bash
# Set up shortcuts
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit

# Now you can use:
git st  # instead of git status
git cm -m "message"  # instead of git commit -m "message"
```

### 2. See Pretty Log History
```bash
git log --oneline --graph --decorate --all
```

### 3. Quickly Stage and Commit
```bash
# Stage and commit in one command
git commit -am "Quick commit message"
```

### 4. Compare with Instructor's Version
```bash
# See what instructor added that you don't have
git diff HEAD upstream/main

# See what you added that instructor doesn't have
git diff upstream/main HEAD
```

## 🎯 Week-by-Week Git Skills

### Week 1-2: Git Basics
- [ ] Clone repository
- [ ] Make commits
- [ ] Push to GitHub
- [ ] Set up upstream remote

### Week 3-4: Collaboration
- [ ] Fetch and merge updates
- [ ] Resolve simple merge conflicts
- [ ] Use git status effectively
- [ ] Write good commit messages

### Week 5-6: Intermediate Skills
- [ ] Use git diff to review changes
- [ ] Understand git log and history
- [ ] Create and use .gitignore
- [ ] Undo changes safely

### Week 7-8: Advanced Workflow
- [ ] Cherry-pick specific commits
- [ ] Use git stash for temporary saves
- [ ] Handle complex merge conflicts
- [ ] Recover from mistakes with reflog

### Week 9-10: Professional Practices
- [ ] Write detailed commit messages
- [ ] Use branching for features
- [ ] Tag releases properly
- [ ] Collaborate effectively with others

## 🏆 Git Success Checklist

By the end of the course, you should be able to:
- [ ] Commit changes regularly with descriptive messages
- [ ] Get instructor updates without losing your work
- [ ] Resolve merge conflicts confidently
- [ ] Use Git to track your learning progress
- [ ] Feel comfortable with command line Git operations
- [ ] Help classmates with basic Git issues

## 🆘 Need Help?

### Quick Self-Help
1. **Read the error message carefully** - Git usually tells you what's wrong
2. **Use `git status`** - Shows you the current state
3. **Check `git log --oneline`** - Shows recent history
4. **Try Google with the exact error message**

### Getting Help from Others
When asking for help, always include:
- What you were trying to do
- The exact command you ran
- The complete error message
- Output of `git status`

Remember: Every developer struggles with Git at first. The key is practice and patience! 🚀