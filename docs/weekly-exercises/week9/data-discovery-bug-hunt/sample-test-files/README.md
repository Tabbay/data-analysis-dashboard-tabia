# Sample Test Files for Week 9 Bug Hunt

This folder contains deliberately problematic CSV files designed to test edge cases in the Data Discovery application.

## Files Included

### 1. `empty.csv`
- **Purpose**: Test handling of completely empty files
- **Size**: 0 bytes
- **Expected Behavior**: Application should reject with clear error message
- **Common Issue**: Many apps crash when trying to parse empty files

---

### 2. `headers_only.csv`
- **Purpose**: Test handling of CSV with headers but no data rows
- **Content**: Just the header row: `Name,Value,Date,Category`
- **Expected Behavior**: Should handle gracefully, possibly show "No data to display"
- **Common Issue**: Chart libraries often crash with empty datasets

---

### 3. `special_chars.csv`
- **Purpose**: Test international characters and special symbols
- **Content**: Names with accents (José, Müller), apostrophes (O'Brien), Asian characters (李明), ampersands, quotes
- **Expected Behavior**: Should display all characters correctly without corruption
- **Common Issue**: Encoding problems (mojibake), escaped characters displaying incorrectly

---

### 4. `malformed.csv`
- **Purpose**: Test CSV parsing with structural errors
- **Issues**: 
  - Missing quotes around text with commas
  - Unclosed quotes
  - Inconsistent column counts (extra columns in some rows)
- **Expected Behavior**: Either parse intelligently or show specific error
- **Common Issue**: Parser crashes or silently corrupts data

---

### 5. `huge_numbers.csv`
- **Purpose**: Test numeric boundary cases
- **Content**:
  - Very large numbers (999999999)
  - Very small decimals (0.00000001)
  - Negative numbers
  - Scientific notation (1.5e+10)
  - Zero
- **Expected Behavior**: Numbers should display correctly, charts should scale appropriately
- **Common Issue**: Overflow errors, chart scaling problems, scientific notation not parsed

---

## How to Use These Files

### During Bug Hunt Challenge
1. Download these files to your computer
2. Navigate to `/` in the application
3. Try uploading each file
4. Document what happens:
   - Does it work correctly?
   - Does it crash?
   - Is the error message helpful?
   - Does the chart render properly?

### Creating Test Cases
Use these files as test data in your professional test cases:

```markdown
**Test Data**: special_chars.csv (see SAMPLE_TEST_FILES)
**File Content**: Contains names with accents, quotes, and Unicode characters
```

---

## Expected Bugs to Find

Here are some bugs students might discover (don't peek at solutions too early!):

1. **Empty File**: Likely causes chart component to crash
2. **Headers Only**: May show confusing blank chart or error
3. **Special Characters**: Might display incorrectly or break data table
4. **Malformed CSV**: Could silently corrupt data or show unhelpful errors
5. **Huge Numbers**: Chart axis labels might overlap or display in scientific notation

---

## Creating Your Own Test Files

Want to create more edge cases? Try:

```csv
# All same values (tests chart with no variance)
Name,Value,Date,Category
Test,100,2024-01-01,A
Test,100,2024-01-02,A
Test,100,2024-01-03,A

# Single row (minimum viable dataset)
Name,Value,Date,Category
Lonely,42,2024-01-01,Solo

# Mixed data types (numbers stored as text)
Name,Value,Date,Category
Normal,100,2024-01-01,A
Text,"one hundred",2024-01-02,B
Mixed,12.34,2024-01-03,C

# Extremely long strings
Name,Value,Date,Category
"This is an extremely long name that goes on and on and on for many characters to test text overflow and truncation behavior in the UI components",999,2024-01-01,Overflow
```

---

## Tips for Effective Testing

1. **Test one variable at a time**: Don't combine multiple edge cases in one file initially
2. **Document expected behavior**: Before uploading, predict what SHOULD happen
3. **Compare actual vs expected**: The gap is where bugs live
4. **Think like a user**: Would a real person encounter this scenario?
5. **Be systematic**: Test all files, not just the obvious ones

---

## Learning Objectives

By working with these test files, you'll learn to:
- ✅ Identify common data quality issues
- ✅ Understand CSV parsing challenges
- ✅ Recognize edge cases in data applications
- ✅ Test systematically rather than randomly
- ✅ Document issues professionally

---

## Need More Test Data?

Check the main `/sample-data/` folder for additional datasets you can modify:
- `employee-data.csv`
- `sales-data.csv`
- `customer-data.csv`
- `weather-data.csv`

Try creating broken versions of these for more advanced testing!
