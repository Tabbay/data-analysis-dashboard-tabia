# Professional Test Case Template

## Converting Bug Reports into Test Cases

This template shows you how to convert the bugs you found during the Bug Hunt Challenge into professional test cases that developers can use.

---

## ❌ Beginner Bug Report (Too Vague)

```markdown
"The app crashed when I uploaded a weird file"
```

**Problems**:
- What kind of weird file?
- What steps did you take?
- What error appeared?
- Can anyone reproduce this?

---

## ✅ Professional Test Case (Specific & Reproducible)

```markdown
**Test ID**: TC-UPLOAD-001
**Feature**: Data Upload
**Component**: CSV File Validation
**Scenario**: Upload empty CSV file causes application crash
**Priority**: P0 (Critical)
**Severity**: Critical
**Status**: New

---

### Prerequisites
- Application is loaded and accessible at `/`
- Browser: Chrome 120+ (or specify your browser)
- No data currently uploaded

---

### Test Data
**File**: `empty.csv` (see SAMPLE_TEST_FILES folder)
**File Size**: 0 bytes
**Content**: Completely empty file

---

### Steps to Reproduce
1. Navigate to homepage (`/`)
2. Locate "Upload Data" section
3. Create empty CSV file (0 bytes) OR use provided `empty.csv`
4. Drag empty file to upload zone
5. Observe behavior

---

### Expected Result
✅ Application should:
- Detect empty file before processing
- Display user-friendly error message: "File appears to be empty. Please upload a valid CSV file."
- Prevent upload from proceeding
- Application remains stable and usable
- User can retry with a different file

---

### Actual Result
❌ Application instead:
- Accepts the empty file
- Attempts to parse empty content
- Chart component crashes with error
- User sees blank screen or frozen interface
- Console shows error: `TypeError: Cannot read property 'length' of undefined at ChartSection.tsx:45`

---

### Evidence
**Console Error**:
```
TypeError: Cannot read property 'length' of undefined
    at ChartSection.tsx:45:23
    at processData (dataAnalysis.ts:12:8)
```

**Screenshot**: [Attach screenshot of crashed state]

---

### Impact
- **User Impact**: High - Users cannot use application after crash
- **Frequency**: Medium - Users might accidentally upload empty files
- **Workaround**: None - requires page refresh

---

### Suggested Fix
```javascript
// Add validation in DataUpload.tsx before parsing
const handleFileUpload = (file: File) => {
  // Check file size
  if (file.size === 0) {
    toast.error("File appears to be empty. Please upload a valid CSV file.");
    return;
  }
  
  // Continue with existing upload logic...
  parseCSV(file);
};
```

---

### Test Environment
- **Date Found**: 2024-10-24
- **Browser**: Chrome 120.0.6099.109
- **OS**: Windows 11 / macOS 14 / Ubuntu 22.04
- **Screen Size**: 1920x1080
- **Network**: Normal (not throttled)

---

### Prevention Strategy
**How to prevent this category of bugs**:
- Add file validation layer before any processing
- Implement size checks (min and max)
- Add unit tests for edge cases like empty files
- Consider file content validation (not just extension)

---

### Related Test Cases
- TC-UPLOAD-002: Upload file with headers only
- TC-UPLOAD-003: Upload non-CSV file with .csv extension
- TC-UPLOAD-004: Upload corrupted CSV file
```

---

## 🎯 Key Components of a Good Test Case

### 1. Clear Identifiers
- **Test ID**: Unique identifier (TC-FEATURE-###)
- **Feature**: What part of the app
- **Scenario**: One-line summary of what's being tested

### 2. Context
- **Priority**: P0 (critical) → P3 (low)
- **Severity**: How bad is the impact?
- **Prerequisites**: What needs to be true before starting

### 3. Reproducibility
- **Test Data**: Exact files or inputs used
- **Steps**: Numbered, specific steps anyone can follow
- **Expected vs Actual**: Clear contrast

### 4. Evidence
- **Console errors**: Copy exact error messages
- **Screenshots**: Visual proof
- **Test environment**: Browser, OS, date

### 5. Value-Add
- **Suggested fix**: Help developers understand the solution
- **Prevention**: How to avoid similar bugs
- **Impact analysis**: Why this matters

---

## 📊 Priority Levels Guide

| Priority | Description | Response Time | Example |
|----------|-------------|---------------|---------|
| **P0** | Critical - App unusable | Fix immediately | App crashes on upload |
| **P1** | High - Major feature broken | Fix within 24 hours | Data displays incorrectly |
| **P2** | Medium - Annoying but has workaround | Fix within week | Poor error message |
| **P3** | Low - Cosmetic or minor | Fix when available | Button text has typo |

---

## 🎨 Severity vs Priority

**Severity** = How bad is the bug technically?
**Priority** = How urgently should it be fixed?

Example:
```markdown
**Bug**: Typo in CEO's name on homepage
**Severity**: Low (cosmetic)
**Priority**: P0 (CEO will see it - fix now!)

**Bug**: Rare edge case crashes app
**Severity**: Critical (app crash)
**Priority**: P2 (affects 0.1% of users - fix later)
```

---

## ✍️ Practice Exercise

Convert this vague bug report into a professional test case:

**Vague Report**: "The chart looks weird with special characters"

**Your Task**: Use the template above to create:
1. Clear steps to reproduce
2. Test data that causes the issue
3. Expected vs actual results
4. Suggested fix

---

## 💡 Pro Tips

1. **Write for someone who's never seen the bug**
   - Assume nothing
   - Be extremely specific
   - Include every detail

2. **Make it reproducible**
   - If you can't reproduce it, neither can developers
   - Include exact test data
   - Note timing and sequence

3. **Think about impact**
   - How many users affected?
   - Is there a workaround?
   - What's the business impact?

4. **Suggest solutions when possible**
   - You found the bug - you understand it best
   - Code suggestions are helpful (but not required)
   - Prevention strategies show strategic thinking

5. **Be objective and professional**
   - No blame or judgment
   - Focus on facts and evidence
   - Assume good intentions

---

## 🚀 Ready to Create Your Test Cases?

Now take the bugs you found in the Bug Hunt Challenge and convert them into professional test cases using this template!

**Goal**: Create 3-5 high-quality test cases that any developer could use to fix the bugs you discovered.
