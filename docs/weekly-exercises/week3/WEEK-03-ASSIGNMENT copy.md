# Week 3 Assignment: Interactive Components & User Input

## 🎯 Overview
Build a simple interactive form component in React that demonstrates your understanding of controlled components, user input handling, and basic validation.

## 📚 Learning Objectives
By completing this assignment, you will demonstrate proficiency in:

- **Controlled form components** (using useState)
- **Handling user input** (text, buttons, forms)
- **Implementing real-time validation and error messages**
- **Conditional rendering** (show/hide messages based on state)
- **Basic state management**

## 🎮 Assignment Description

### Core Requirements (100 points)

#### 1. Name Input Form (60 points)
- [ ] Create a `NameInput` component with a text input and a submit button
- [ ] Use state to control the input value
- [ ] Add real-time validation: name must be at least 2 characters
- [ ] Show an error message if validation fails
- [ ] Show a greeting message when a valid name is submitted
- [ ] Add a "Clear" button to reset the form

#### 2. Add a Second Field (20 points)
- [ ] Add an email input (optional, but must validate if filled)
- [ ] Email must contain `@` and `.`
- [ ] Show error message for invalid email

#### 3. Bonus Features (20 points)
- [ ] Show character count as user types
- [ ] Remember the last entered name using localStorage
- [ ] Add a dropdown for favorite color (optional)

## ✅ Evaluation Rubric

- **Working controlled input with validation** (40 points)
- **Error messages and conditional rendering** (20 points)
- **Clear button and reset logic** (10 points)
- **Second field with validation** (10 points)
- **Bonus features** (up to 20 points)

## 🚀 Getting Started

1. Create a new file: `src/components/NameInput.tsx`
2. Use the example in the student guide as a starting point
3. Import and display your component in `src/pages/Index.tsx`
4. Test all validation and error cases

## 📋 Submission Guidelines

1. **NameInput.tsx** - Your main component (primary submission)
2. **README.md** - Briefly describe your approach and any bonus features
3. **Screenshots** (optional) - Show your working form

### Submission Format
- Create a new branch: `week3-assignment-[your-name]`
- Submit a pull request with your code and documentation

### Due Date
- **Initial submission**: End of Week 3 (Friday 11:59 PM)

## 🔗 Resources

- [React useState Hook](https://react.dev/learn/state-a-components-memory)
- [React Forms](https://react.dev/learn/sharing-state-between-components#controlling-an-input-with-state)
- [TypeScript with React](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/)

---

**Remember**: Focus on controlled components, user input, and validation. Advanced features (tables, search, filtering, useMemo, etc.) are for later weeks!

**Good luck, and happy coding!** 🚀
