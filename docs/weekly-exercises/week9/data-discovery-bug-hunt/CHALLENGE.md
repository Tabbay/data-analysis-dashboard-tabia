# 🐛 Bug Hunt Challenge
## Try to Break the Data Discovery Application!

**Mission**: For the next 15 minutes, your job is to find as many bugs as possible in the Data Discovery application.

**Where**: Navigate to `/` (the main homepage)

**Goal**: Document everything that breaks, crashes, looks wrong, or behaves unexpectedly

---

## 🎯 Attack Vectors

Use these strategies to find bugs. Try to think creatively!

### 1. File Upload Chaos 📁

**🎯 Use the Sample Test Files Provided!**
Navigate to `/docs/weekly-exercises/week9/SAMPLE_TEST_FILES/` and try uploading these pre-made problematic files:

- **`empty.csv`**: Zero-byte file (no content at all)
- **`headers_only.csv`**: CSV with just the header row, no data
- **`special_chars.csv`**: International characters like `José María`, `O'Brien & Associates`, `李明`
- **`malformed.csv`**: Deliberately broken CSV with missing quotes, extra commas, inconsistent columns
- **`huge_numbers.csv`**: Extreme values (999999999, -999999, 0.00000001)

**Additional Tests to Try**:
- **Wrong file type**: Rename a `.txt` or `.jpg` to `.csv` and try uploading
- **Huge files**: Create a CSV with 1000+ rows
- **Create your own**: Make custom problem files based on what you think might break the app

---

### 2. UI Stress Testing 🖱️

Break things by using the interface in unexpected ways:

- **Rapid clicking**: Click the upload button 10 times rapidly
- **Multiple uploads**: Try uploading a second file while first upload is in progress
- **Browser back button**: Upload a file, then hit back button
- **Window resize**: Upload data, then resize browser window while chart is rendering
- **Zoom levels**: 
  - Zoom to 50% - does everything still work?
  - Zoom to 200% - does layout break?
- **Mobile view**: Use DevTools responsive mode (F12 → Toggle device toolbar)
- **Tab navigation**: Try using only keyboard (Tab, Enter, Arrow keys)

---

### 3. Data Boundary Testing 📊

Test with unusual but valid data patterns:

- **Single row**: CSV with just one row of data
- **Empty cells**: CSV with missing values or null entries
- **Extremely long text**: 500+ character strings in cells
- **All zeros**: Dataset where every value is 0
- **All same value**: Dataset where every value is identical
- **Negative only**: Dataset with only negative numbers
- **Mixed types**: Numbers stored as text (e.g., "123" with quotes)

---

### 4. Network & Performance 🌐

Test under poor conditions:

- **Slow network**: 
  - Open DevTools (F12)
  - Network tab → Throttling → Slow 3G
  - Try uploading a file
- **No network**: 
  - Disconnect internet
  - Try interacting with the app
- **Cache issues**: Clear browser cache (Ctrl+Shift+Delete) mid-session
- **Incognito mode**: Does the app work in private browsing?
- **Multiple tabs**: Open app in 3+ tabs simultaneously

---

## 📝 Documentation Template

For each bug you find, quickly note:

```markdown
### Bug #X: [Short Description]

**What I Did**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**What Happened**: 
[Describe the problem]

**What Should Happen**: 
[Expected behavior]

**How Bad Is It?**
- [ ] Critical (app crashes/unusable)
- [ ] High (major feature broken)
- [ ] Medium (annoying but workaround exists)
- [ ] Low (cosmetic issue)

**Screenshot/Error**: 
[Paste console error or describe visual issue]
```

---

## 🏆 Competition Rules

- **Most bugs found**: Team with most legitimate bugs wins
- **Most creative**: Bonus points for creative attack vectors
- **Best documented**: Clearest bug descriptions get recognition
- **Most critical**: Finding P0 bugs (app crashes) counts double

---

## 💡 Tips for Success

1. **Open the Console**: Press F12 → Console tab. Many bugs show error messages here
2. **Take screenshots**: Visual bugs need visual proof
3. **Copy error messages**: Right-click error in console → Copy
4. **Try combinations**: Sometimes bugs only appear with multiple steps
5. **Think like a user**: What would frustrate a real person?
6. **Be systematic**: Don't just click randomly - follow the attack vectors
7. **Note your environment**: Browser, OS, screen size might matter

---

## 🚫 Out of Scope

Don't report these (they're not bugs):

- Missing features that were never implemented
- "I don't like this color" (subjective design preferences)
- Performance is slow on a 10-year-old computer
- Bugs in other parts of the app (focus on `/` only)

---

## ⏰ Time Management

- **Minutes 0-5**: Try obvious attack vectors (empty files, rapid clicks)
- **Minutes 5-10**: Get creative (combinations, edge cases)
- **Minutes 10-15**: Document your findings clearly

---

## 🎓 Learning Objectives

By the end of this challenge, you'll have:
- ✅ Developed a "tester's mindset" for finding edge cases
- ✅ Practiced systematic bug investigation
- ✅ Learned to distinguish between bugs and missing features
- ✅ Experienced the QA process in a real application
- ✅ Built intuition for what users might break

---

**Ready? Set? BREAK THINGS!** 🚀

(Don't worry - you can't actually break anything permanently. This is a safe environment to practice!)
