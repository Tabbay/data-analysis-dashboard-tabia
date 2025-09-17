# 🔧 Git & GitHub Troubleshooting Guide

**Quick solutions for common student issues with the template repository**

## 🚨 Quick Diagnosis

### Is it a Git problem or a React problem?

**Git Problem Signs:**
- Error messages mention `git`, `remote`, `branch`, `merge`
- Issues with getting instructor updates
- Problems pushing/pulling code
- Repository or GitHub-related errors

**React Problem Signs:**
- Error messages in the browser console
- App won't start with `npm run dev`
- Component errors or blank pages
- TypeScript compilation errors

👉 **If it's a React problem**, check the main project troubleshooting docs. This guide is for Git/GitHub issues only.

## 🔍 Most Common Issues

### 1. "Can't Get Instructor Updates"

#### Symptoms:
- `git fetch upstream` fails
- Error: "remote upstream does not exist"
- No new instructor changes appearing

#### Diagnosis:
```bash
git remote -v
```

**If you don't see `upstream`:**
```bash
# Add instructor's repository as upstream
git remote add upstream https://github.com/INSTRUCTOR_USERNAME/TEMPLATE_REPO.git
```

**If upstream exists but fetch fails:**
```bash
# Remove and re-add upstream
git remote remove upstream
git remote add upstream https://github.com/INSTRUCTOR_USERNAME/TEMPLATE_REPO.git
git fetch upstream
```

### 2. "Merge Conflicts When Getting Updates"

#### Symptoms:
- Error: "Automatic merge failed; fix conflicts and then commit"
- Files show conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
- Git won't let you continue

#### Step-by-Step Solution:

**Step 1: Identify conflicted files**
```bash
git status
```
Look for files marked "both modified"

**Step 2: Open each file in VS Code**
Look for sections like this:
```javascript
<<<<<<< HEAD
// Your version of the code
const myVariable = "my value";
=======
// Instructor's version of the code
const myVariable = "instructor value";
>>>>>>> upstream/main
```

**Step 3: Choose which version to keep**
- Keep yours: Delete instructor's version and conflict markers
- Keep instructor's: Delete your version and conflict markers  
- Keep both: Combine them logically and remove conflict markers

**Step 4: Complete the merge**
```bash
git add .
git commit -m "Resolved merge conflicts from instructor updates"
```

### 3. "Permission Denied" or "Authentication Failed"

#### Symptoms:
- Can't push to GitHub
- "Permission denied (publickey)" error
- "Authentication failed" when pushing

#### Solutions:

**Option 1: Use GitHub CLI (Recommended)**
```bash
# Install GitHub CLI first: https://cli.github.com/
gh auth login
```

**Option 2: Check your remote URL**
```bash
# See your current remote
git remote -v

# If it shows HTTPS, you might need to use SSH
git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
```

**Option 3: Generate SSH key**
```bash
# Generate new SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to SSH agent
ssh-add ~/.ssh/id_ed25519

# Copy public key and add to GitHub
cat ~/.ssh/id_ed25519.pub
```

### 4. "Your Branch is Ahead/Behind"

#### Symptoms:
- Git says "Your branch is ahead of 'origin/main' by X commits"
- Or "Your branch is behind 'origin/main' by X commits"

#### What This Means:
- **Ahead**: You have commits that aren't on GitHub yet
- **Behind**: GitHub has commits you don't have locally

#### Solutions:

**If ahead (normal after making changes):**
```bash
git push origin main
```

**If behind (after instructor updates):**
```bash
git pull origin main
```

**If both ahead and behind:**
```bash
git pull origin main  # Get remote changes first
git push origin main  # Then push your changes
```

### 5. "Detached HEAD State"

#### Symptoms:
- Git says you're in "detached HEAD" state
- Your commits seem to disappear
- Branch shows a commit hash instead of "main"

#### Quick Fix:
```bash
# Create a new branch from current state
git branch recovery-branch

# Switch back to main
git checkout main

# Merge your changes back
git merge recovery-branch

# Clean up
git branch -d recovery-branch
```

## 🛠️ Advanced Troubleshooting

### Repository is Completely Broken

If nothing else works, here's the "nuclear option":

#### Option 1: Clone Fresh Copy
```bash
# Backup any important uncommitted changes first!
# Then clone a fresh copy
cd ..
rm -rf your-broken-repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
git remote add upstream https://github.com/INSTRUCTOR/TEMPLATE.git
```

#### Option 2: Reset to Instructor's Version
```bash
# ⚠️ This will delete ALL your changes!
git fetch upstream
git reset --hard upstream/main
git push origin main --force
```

### Recovering Lost Commits

If you accidentally deleted commits:

```bash
# See all recent actions
git reflog

# Find your lost commit (look for commit messages)
# Restore it (replace COMMIT_HASH with actual hash)
git checkout COMMIT_HASH

# Create new branch from this point
git branch recovery-branch
git checkout main
git merge recovery-branch
```

### Large Files or Performance Issues

If Git is slow or complaining about large files:

```bash
# See largest files in repository
git ls-files | xargs -I {} stat -f "%z %N" {} | sort -n | tail -10

# Remove large files from history (dangerous!)
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch path/to/large/file' \
  --prune-empty --tag-name-filter cat -- --all
```

## 📋 Prevention Checklist

### Daily Habits to Avoid Issues:
- [ ] Commit frequently with good messages
- [ ] Pull instructor updates regularly
- [ ] Don't edit files you didn't create (unless instructed)
- [ ] Keep your repository clean (no large files)
- [ ] Always check `git status` before major operations

### Weekly Habits:
- [ ] Update from instructor before starting new work
- [ ] Push your work to GitHub regularly
- [ ] Check that your repository page on GitHub looks correct
- [ ] Backup important work outside of Git occasionally

## 🆘 Getting Help

### Self-Help Steps:
1. **Read the error message completely**
2. **Try `git status` to understand current state**
3. **Search this guide for similar symptoms**
4. **Google the exact error message**
5. **Try Stack Overflow with Git tag**

### When to Ask for Help:
- After trying self-help steps
- If you're afraid of losing work
- If error messages don't make sense
- If you need to understand why something happened

### How to Ask for Help Effectively:

**Always include:**
```
What I was trying to do:
[Describe your goal]

What command I ran:
[Exact command]

What happened:
[Full error message]

Current status:
[Output of `git status`]

What I've already tried:
[List your attempts]
```

**Example good help request:**
```
What I was trying to do:
Get the Week 3 updates from my instructor

What command I ran:
git merge upstream/main

What happened:
CONFLICT (content): Merge conflict in src/components/DataTable.tsx
Automatic merge failed; fix conflicts and then commit the result.

Current status:
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
	both modified:   src/components/DataTable.tsx

What I've already tried:
- Opened the file in VS Code and saw the conflict markers
- Not sure which version to choose
```

## 🎓 Learning from Mistakes

Every Git mistake is a learning opportunity! Common student mistakes and what they teach:

- **Merge conflicts** → Learn about collaboration and code integration
- **Lost commits** → Understand Git's safety features and recovery
- **Permission errors** → Learn about authentication and security
- **Branch confusion** → Understand Git's branching model

Remember: Even experienced developers run into Git issues regularly. The key is learning to diagnose and resolve them confidently! 🚀

## 📚 Additional Resources

- [Official Git Tutorial](https://git-scm.com/docs/gittutorial)
- [GitHub Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)