# Week 9: Testing & Quality Assurance

This week focuses on systematic debugging, manual testing, and professional bug documentation through hands-on exercises.

---

## 📁 Directory Structure

```
week9/
├── README.md (you are here)
├── WEEK_9_STUDENT_GUIDE.md       # Complete student guide for the session
├── WEEK_9_INSTRUCTOR_PACKET.md   # Instructor materials and solutions
│
├── broken-demo-challenge/         # Activity 1: Quality Detective Challenge
│   ├── WORKSHEET.md               # Guided worksheet for finding 4 bugs in /broken-demo
│   └── SOLUTION.md                # Solutions and explanations (for instructors)
│
└── data-discovery-bug-hunt/       # Activity 2: Real-World Bug Hunt Workshop
    ├── CHALLENGE.md               # Main bug hunt challenge instructions
    ├── TEST_CASE_TEMPLATE.md      # Professional test case format guide
    └── sample-test-files/         # Problematic CSV files for testing
        ├── README.md
        ├── empty.csv
        ├── headers_only.csv
        ├── malformed.csv
        ├── huge_numbers.csv
        └── special_chars.csv
```

---

## 🎯 Two Main Activities

### Activity 1: Quality Detective Challenge (0:00-0:10)
**Location:** `/broken-demo` page in the application

**Materials:**
- `broken-demo-challenge/WORKSHEET.md` - Guided worksheet for students
- `broken-demo-challenge/SOLUTION.md` - Solutions for instructors

**Goal:** Find 4 intentionally planted bugs using systematic debugging techniques.

**What Students Learn:**
- Visual inspection
- User interaction testing
- Console investigation
- Code analysis
- Bug documentation

---

### Activity 2: Real-World Bug Hunt Workshop (0:30-1:10)
**Location:** Main Data Discovery application (`/`)

**Materials:**
- `data-discovery-bug-hunt/CHALLENGE.md` - Detailed attack vectors and instructions
- `data-discovery-bug-hunt/TEST_CASE_TEMPLATE.md` - Professional test case format
- `data-discovery-bug-hunt/sample-test-files/` - Problematic CSV files for testing

**Goal:** Find bugs by stress-testing the file upload and data visualization features, then document them professionally.

**What Students Learn:**
- Edge case testing
- Boundary testing
- Professional bug documentation
- Test case creation
- Bug prioritization

---

## 🚀 Quick Start

**For Students:**
1. Start with `WEEK_9_STUDENT_GUIDE.md` for complete session overview
2. Use `broken-demo-challenge/WORKSHEET.md` during the warm-up activity
3. Reference `data-discovery-bug-hunt/CHALLENGE.md` during the main workshop
4. Use `data-discovery-bug-hunt/TEST_CASE_TEMPLATE.md` when documenting bugs

**For Instructors:**
1. Review `WEEK_9_INSTRUCTOR_PACKET.md` for session plan and teaching tips
2. Check `broken-demo-challenge/SOLUTION.md` for bug explanations
3. Have `data-discovery-bug-hunt/sample-test-files/` ready for students

---

## 📚 Learning Objectives

By the end of this week, students will:
- ✅ Understand different types of testing (unit, integration, E2E, manual)
- ✅ Practice systematic debugging approaches
- ✅ Create professional test cases and bug reports
- ✅ Build QA checklists for deployment readiness
- ✅ Develop a quality-first mindset

---

## 🔗 Related Resources

- **Application Routes:**
  - `/broken-demo` - Quality Detective Challenge component
  - `/broken-demo-solution` - Solutions (revealed after challenge)
  - `/` - Main Data Discovery app for bug hunt workshop

- **Testing Tools:**
  - Browser DevTools (F12)
  - Chrome Responsive Design Mode
  - Network Throttling (DevTools → Network)

---

## 💡 Tips for Success

- **Start Simple:** Begin with obvious visual bugs before diving into console errors
- **Document Everything:** Take screenshots and copy error messages immediately
- **Be Systematic:** Follow the structured approaches in the worksheets
- **Think Like a User:** Try unexpected actions and edge cases
- **Collaborate:** Share findings with your team as you discover them

---

Need help? See `WEEK_9_STUDENT_GUIDE.md` for detailed explanations and examples!
