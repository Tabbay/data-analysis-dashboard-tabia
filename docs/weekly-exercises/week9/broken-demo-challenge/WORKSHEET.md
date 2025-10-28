# 🔍 Bug Hunting Worksheet - Quality Detective Challenge

## Your Detective Team: _______________

---

## 🎯 Mission
Find and document all 4 bugs in the BrokenDemo component at `/broken-demo`

---

## 📋 Systematic Debugging Process

### Step 1: Visual Inspection (2 minutes)
Look at the UI WITHOUT clicking anything yet.
- What do you notice about the button text?
- Does anything look "off" visually?
- Are there any obvious UI inconsistencies?

**Your observations:**
```
_____________________
_____________________
_____________________
```

---

### Step 2: User Interaction Testing (3 minutes)
Now interact with the component. Test everything!
- Click "Show Chart" - what happens?
- Click "Use Empty Data" - what happens?
- Try different sequences of button clicks
- Does the button text match what it does?

**What broke? Document each issue:**

**Bug #1:**
- What happened: _______________
- Expected behavior: _______________
- Actual behavior: _______________

**Bug #2:**
- What happened: _______________
- Expected behavior: _______________
- Actual behavior: _______________

---

### Step 3: Console Investigation (3 minutes)
Open Chrome DevTools (F12) and check the Console tab.
- What error messages do you see?
- What line numbers are mentioned?
- What does the error message tell you?

**Console findings:**
```
_____________________
_____________________
_____________________
```

---

### Step 4: Code Investigation (5 minutes)
Look at `src/pages/BrokenDemo.tsx` in Dev Mode
- Where do you think the bugs are? (line numbers)
- What code looks suspicious?
- What variables might be undefined?
- Are data structures used correctly?

---

## 🐛 Bug Documentation Table

| Bug # | Line # | Type | What's Wrong | Your Proposed Fix |
|-------|--------|------|--------------|-------------------|
| 1     |        | Visual / Logic / Runtime / Edge Case |              |                   |
| 2     |        | Visual / Logic / Runtime / Edge Case |              |                   |
| 3     |        | Visual / Logic / Runtime / Edge Case |              |                   |
| 4     |        | Visual / Logic / Runtime / Edge Case |              |                   |

---

### Step 5: Prioritize by Severity
Rank these bugs from most to least severe:

1. **Most Critical:** _______________ 
   - **Why?** _______________

2. **High Priority:** _______________ 
   - **Why?** _______________

3. **Medium Priority:** _______________ 
   - **Why?** _______________

4. **Low Priority:** _______________ 
   - **Why?** _______________

---

### Step 6: Propose Solutions
For each bug, write the CODE FIX you would implement:

**Bug #1 Fix:**
```tsx
// Your code here




```

**Bug #2 Fix:**
```tsx
// Your code here




```

**Bug #3 Fix:**
```tsx
// Your code here




```

**Bug #4 Fix:**
```tsx
// Your code here




```

---

## 🤔 Reflection Questions

1. **Which bug was hardest to find? Why?**
```
_____________________
_____________________
```

2. **What debugging strategy worked best for your team?**
```
_____________________
_____________________
```

3. **How would you test this component to make sure all bugs are fixed?**
```
_____________________
_____________________
```

4. **What did you learn about systematic debugging?**
```
_____________________
_____________________
```

---

## 🎯 Team Debugging Strategy
Describe the process your team followed (steps, who did what, how you collaborated):
```
_____________________
_____________________
_____________________
_____________________
```

---

## ✅ Checklist Before Submitting
- [ ] Found all 4 bugs
- [ ] Documented each bug with clear description
- [ ] Identified line numbers in code
- [ ] Proposed fixes for each bug
- [ ] Prioritized bugs by severity
- [ ] Tested your understanding with the solution page
- [ ] Reflected on what you learned

---

**Time to Complete:** _________ minutes

**Bugs Found:** _____ out of 4

**Ready to compare your answers?** Navigate to `/broken-demo-solution` to see the fixes!
