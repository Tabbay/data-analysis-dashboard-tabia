# Sample Data Files for Data Discovery Tool

This folder contains sample CSV files that students can use to test their Data Discovery Tool application throughout the course.

## Available Sample Files

### 1. sales-data.csv
**Purpose**: Sales and revenue analysis
- **Columns**: Date, Product, Category, Revenue, Units_Sold, Customer_Segment, Region
- **Records**: 30 sales transactions
- **Use Cases**: 
  - Revenue trends over time
  - Product category performance
  - Regional sales analysis
  - Customer segment comparison

### 2. employee-data.csv
**Purpose**: HR and workforce analytics
- **Columns**: ID, Name, Age, Department, Salary, Years_Experience, Performance_Rating, Location, Education_Level
- **Records**: 25 employee records
- **Use Cases**:
  - Salary analysis by department
  - Performance vs experience correlation
  - Geographic distribution of workforce
  - Education level impact on compensation

### 3. weather-data.csv
**Purpose**: Environmental data analysis
- **Columns**: Date, Temperature, Humidity, Pressure, Wind_Speed, Precipitation, Air_Quality_Index, UV_Index, City
- **Records**: 30 weather observations across 3 cities
- **Use Cases**:
  - Temperature trends across cities
  - Air quality analysis
  - Weather pattern correlations
  - Climate comparison between locations

### 4. customer-data.csv
**Purpose**: Customer behavior and demographics
- **Columns**: User_ID, Age, Gender, Income, Education, Spending_Score, Brand_Preference, Purchase_Frequency, Online_Shopping, Social_Media_Hours
- **Records**: 25 customer profiles
- **Use Cases**:
  - Customer segmentation analysis
  - Spending behavior patterns
  - Demographics vs preferences
  - Digital engagement correlation

## How to Use These Files

### For Students:
1. Download any of these CSV files to your computer
2. Open your Data Discovery Tool application
3. Use the file upload feature to load the data
4. Explore the visualizations and insights generated
5. Try different chart types and filtering options

### For Testing Features:
- **Data Upload**: Test CSV parsing and validation
- **Chart Generation**: Verify different chart types work with various data
- **Filtering**: Test filtering capabilities across different column types
- **Export**: Validate data export functionality
- **Error Handling**: Try uploading invalid files to test error messages

### Weekly Usage Guide:

**Week 3-4 (Basic Functionality)**:
- Start with sales-data.csv (simple structure)
- Test basic chart creation and data display

**Week 5-6 (Advanced Features)**:
- Use employee-data.csv for filtering and sorting
- Test different chart types with weather-data.csv

**Week 7-8 (Complex Analysis)**:
- Combine multiple datasets
- Use customer-data.csv for advanced analytics

**Week 9-10 (Final Project)**:
- Test with all datasets
- Demonstrate full application capabilities

## Data Characteristics

### Data Types Represented:
- **Numerical**: Revenue, Salary, Temperature, Age
- **Categorical**: Product Category, Department, Gender
- **Date/Time**: Transaction dates, observation dates
- **Boolean**: Online_Shopping (Yes/No)
- **Text**: Names, Cities, Brand preferences

### Data Complexity Levels:
- **Beginner**: sales-data.csv (straightforward structure)
- **Intermediate**: employee-data.csv, weather-data.csv (mixed data types)
- **Advanced**: customer-data.csv (complex relationships)

## Troubleshooting Sample Data

### Common Issues:
1. **File Not Loading**: Ensure file is saved as .csv format
2. **Missing Charts**: Check that data columns are properly formatted
3. **Display Issues**: Verify column headers don't contain special characters

### Expected Behavior:
- All files should load without errors
- Charts should generate automatically upon upload
- Filtering should work on all categorical columns
- Export should maintain data integrity

## Creating Custom Test Data

Students can create their own CSV files following these guidelines:
- Include column headers in the first row
- Mix different data types (numbers, text, dates)
- Keep file size reasonable (under 1MB for testing)
- Ensure data quality (no missing values in key columns)

These sample files are designed to provide realistic, engaging datasets that demonstrate the full capabilities of the Data Discovery Tool while being simple enough for educational purposes.
