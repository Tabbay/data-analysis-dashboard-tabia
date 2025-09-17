
// ==========================================
// 🔢 WEEK 4+: dataAnalysis.ts - Data Processing Utilities
// ==========================================
// This file contains functions for analyzing and processing data
// Students will enhance these utilities throughout the course

import { DataRow } from '@/types/data';

// 📊 Interface definitions for data analysis
export interface DataSummary {
  totalRows: number;
  totalColumns: number;
  numericColumns: number;
  textColumns: number;
  columnTypes: Record<string, 'numeric' | 'text' | 'boolean'>;
  missingValues: Record<string, number>;
}

export interface DataInsight {
  type: 'summary' | 'trend' | 'correlation' | 'outlier' | 'distribution';
  title: string;
  description: string;
  value?: string | number;
  confidence: 'high' | 'medium' | 'low';
  column?: string;
  details?: any;
}

// 🔧 WEEK 4: Students will enhance this function with advanced processing
// 🔧 WEEK 8: Students will add personal data analysis capabilities
// 🔧 WEEK 9: Students will integrate AI-powered insights here
export const getDataSummary = (data: DataRow[]): DataSummary => {
  if (!data || data.length === 0) {
    return {
      totalRows: 0,
      totalColumns: 0,
      numericColumns: 0,
      textColumns: 0,
      columnTypes: {},
      missingValues: {}
    };
  }

  const columns = Object.keys(data[0]);
  const columnTypes: Record<string, 'numeric' | 'text' | 'boolean'> = {};
  const missingValues: Record<string, number> = {};

  // Analyze each column
  columns.forEach(column => {
    let numericCount = 0;
    let booleanCount = 0;
    let missingCount = 0;

    data.forEach(row => {
      const value = row[column];
      if (value === null || value === undefined || value === '') {
        missingCount++;
      } else if (typeof value === 'number' && !isNaN(value)) {
        numericCount++;
      } else if (typeof value === 'boolean') {
        booleanCount++;
      }
    });

    // Determine column type based on majority
    if (numericCount > data.length * 0.8) {
      columnTypes[column] = 'numeric';
    } else if (booleanCount > data.length * 0.8) {
      columnTypes[column] = 'boolean';
    } else {
      columnTypes[column] = 'text';
    }

    missingValues[column] = missingCount;
  });

  const numericColumns = Object.values(columnTypes).filter(type => type === 'numeric').length;
  const textColumns = Object.values(columnTypes).filter(type => type === 'text').length;

  return {
    totalRows: data.length,
    totalColumns: columns.length,
    numericColumns,
    textColumns,
    columnTypes,
    missingValues
  };
};

export const generateDataInsights = (data: DataRow[]): DataInsight[] => {
  if (!data || data.length === 0) {
    return [];
  }

  const insights: DataInsight[] = [];
  const summary = getDataSummary(data);
  const columns = Object.keys(data[0]);

  // Dataset overview insight
  insights.push({
    type: 'summary',
    title: 'Dataset Overview',
    description: `Your dataset contains ${summary.totalRows.toLocaleString()} rows and ${summary.totalColumns} columns, with ${summary.numericColumns} numeric columns for analysis.`,
    confidence: 'high'
  });

  // Analyze numeric columns for insights
  columns.forEach(column => {
    if (summary.columnTypes[column] === 'numeric') {
      const values = data
        .map(row => row[column])
        .filter(val => typeof val === 'number' && !isNaN(val)) as number[];

      if (values.length > 0) {
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const sorted = [...values].sort((a, b) => a - b);
        const median = sorted.length % 2 === 0
          ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
          : sorted[Math.floor(sorted.length / 2)];
        
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min;

        // Generate insights based on statistics
        insights.push({
          type: 'summary',
          title: `${column} Statistics`,
          description: `Average: ${mean.toFixed(2)}, Median: ${median.toFixed(2)}, Range: ${min.toFixed(2)} to ${max.toFixed(2)}`,
          confidence: 'high',
          column,
          details: { mean, median, min, max, range }
        });

        // Detect potential outliers
        const q1 = sorted[Math.floor(sorted.length * 0.25)];
        const q3 = sorted[Math.floor(sorted.length * 0.75)];
        const iqr = q3 - q1;
        const outlierThreshold = iqr * 1.5;
        const outliers = values.filter(val => val < q1 - outlierThreshold || val > q3 + outlierThreshold);

        if (outliers.length > 0) {
          insights.push({
            type: 'outlier',
            title: `Outliers Detected in ${column}`,
            description: `Found ${outliers.length} potential outliers that may need attention or represent interesting data points.`,
            confidence: 'medium',
            column,
            details: { outliers: outliers.slice(0, 5) } // Show first 5 outliers
          });
        }
      }
    }
  });

  // Check for missing data patterns
  const columnsWithMissing = Object.entries(summary.missingValues)
    .filter(([_, count]) => count > 0)
    .sort(([_, a], [__, b]) => b - a);

  if (columnsWithMissing.length > 0) {
    const [columnName, missingCount] = columnsWithMissing[0];
    const percentage = (missingCount / summary.totalRows * 100).toFixed(1);
    
    insights.push({
      type: 'summary',
      title: 'Missing Data Alert',
      description: `Column "${columnName}" has ${missingCount} missing values (${percentage}% of data). Consider data cleaning strategies.`,
      confidence: 'high',
      column: columnName,
      details: { missingCount, percentage }
    });
  }

  // Look for potential correlations between numeric columns
  const numericColumns = columns.filter(col => summary.columnTypes[col] === 'numeric');
  if (numericColumns.length >= 2) {
    insights.push({
      type: 'correlation',
      title: 'Correlation Analysis Available',
      description: `With ${numericColumns.length} numeric columns, you can explore relationships between variables like ${numericColumns.slice(0, 2).join(' and ')}.`,
      confidence: 'medium',
      details: { numericColumns }
    });
  }

  // Data distribution insights
  const largeDatasetThreshold = 1000;
  if (summary.totalRows > largeDatasetThreshold) {
    insights.push({
      type: 'distribution',
      title: 'Large Dataset Detected',
      description: `With ${summary.totalRows.toLocaleString()} rows, this dataset is suitable for advanced statistical analysis and machine learning applications.`,
      confidence: 'high'
    });
  }

  return insights.slice(0, 10); // Return top 10 insights
};

export const getNumericColumns = (data: DataRow[]): string[] => {
  if (!data || data.length === 0) return [];
  
  const summary = getDataSummary(data);
  return Object.entries(summary.columnTypes)
    .filter(([_, type]) => type === 'numeric')
    .map(([column, _]) => column);
};

export const getColumnValues = (data: DataRow[], column: string): (string | number)[] => {
  return data.map(row => row[column]).filter(val => val !== null && val !== undefined && typeof val !== 'boolean') as (string | number)[];
};

export const calculateStatistics = (values: number[]) => {
  if (values.length === 0) return null;

  const sorted = [...values].sort((a, b) => a - b);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];

  // Calculate mode
  const frequency: Record<number, number> = {};
  values.forEach(val => {
    frequency[val] = (frequency[val] || 0) + 1;
  });
  const mode = Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)[0]?.[0];

  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const standardDeviation = Math.sqrt(variance);

  return {
    mean,
    median,
    mode: mode ? parseFloat(mode) : null,
    min: Math.min(...values),
    max: Math.max(...values),
    range: Math.max(...values) - Math.min(...values),
    standardDeviation,
    variance,
    count: values.length
  };
};
