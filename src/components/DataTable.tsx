
import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, ArrowUpDown, ArrowUp, ArrowDown, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataRow } from '@/types/data';
import { getDataSummary } from '@/utils/dataAnalysis';

interface DataTableProps {
  data: DataRow[];
}

type SortDirection = 'asc' | 'desc' | null;

const DataTable = ({ data }: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [columnFilter, setColumnFilter] = useState<string>('all');

  const summary = useMemo(() => getDataSummary(data), [data]);
  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  const filteredAndSortedData = useMemo(() => {
    let filtered = data;

    // Filter by search term
    if (searchTerm) {
      filtered = data.filter(row => 
        Object.values(row).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by column type
    if (columnFilter !== 'all') {
      const columnsOfType = Object.entries(summary.columnTypes)
        .filter(([_, type]) => type === columnFilter)
        .map(([column, _]) => column);
      
      filtered = filtered.map(row => {
        const filteredRow: DataRow = {};
        columnsOfType.forEach(col => {
          if (col in row) filteredRow[col] = row[col];
        });
        return filteredRow;
      });
    }

    // Sort data
    if (sortColumn && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        
        // Handle null/undefined values
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return sortDirection === 'asc' ? 1 : -1;
        if (bVal == null) return sortDirection === 'asc' ? -1 : 1;
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        
        if (sortDirection === 'asc') {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }

    return filtered;
  }, [data, searchTerm, sortColumn, sortDirection, columnFilter, summary.columnTypes]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortColumn(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return <ArrowUpDown className="h-3 w-3 opacity-50" />;
    if (sortDirection === 'asc') return <ArrowUp className="h-3 w-3" />;
    if (sortDirection === 'desc') return <ArrowDown className="h-3 w-3" />;
    return <ArrowUpDown className="h-3 w-3 opacity-50" />;
  };

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'number') {
      // Format large numbers with proper separators
      if (Math.abs(value) >= 1000) {
        return value.toLocaleString();
      }
      // Format decimal numbers
      if (value % 1 !== 0) {
        return value.toFixed(2);
      }
      return value.toString();
    }
    if (typeof value === 'boolean') {
      return value ? '✓' : '✗';
    }
    return String(value);
  };

  const getColumnType = (column: string) => {
    return summary.columnTypes[column] || 'text';
  };

  const exportFilteredData = () => {
    const visibleColumns = columnFilter === 'all' ? columns : 
      Object.entries(summary.columnTypes)
        .filter(([_, type]) => type === columnFilter)
        .map(([column, _]) => column);

    const csvContent = [
      visibleColumns.join(','),
      ...filteredAndSortedData.map(row => 
        visibleColumns.map(col => formatValue(row[col])).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `filtered_data_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const visibleColumns = columnFilter === 'all' ? columns : 
    Object.entries(summary.columnTypes)
      .filter(([_, type]) => type === columnFilter)
      .map(([column, _]) => column);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <CardTitle className="flex items-center gap-2">
            Data Explorer
            <span className="text-sm font-normal text-muted-foreground">
              ({filteredAndSortedData.length.toLocaleString()} of {data.length.toLocaleString()} rows)
            </span>
          </CardTitle>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search all data..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 w-full sm:w-[250px]"
              />
            </div>
            
            <Select value={columnFilter} onValueChange={(value) => {
              setColumnFilter(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Columns</SelectItem>
                <SelectItem value="numeric">Numeric Only</SelectItem>
                <SelectItem value="text">Text Only</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={exportFilteredData} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {visibleColumns.map((column) => (
                    <TableHead 
                      key={column} 
                      className="cursor-pointer hover:bg-muted/50 transition-colors select-none"
                      onClick={() => handleSort(column)}
                    >
                      <div className="flex items-center justify-between min-w-[100px]">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{column}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            getColumnType(column) === 'numeric' ? 'bg-blue-100 text-blue-700' :
                            getColumnType(column) === 'boolean' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {getColumnType(column)}
                          </span>
                        </div>
                        {getSortIcon(column)}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell 
                      colSpan={visibleColumns.length} 
                      className="text-center py-8 text-muted-foreground"
                    >
                      {searchTerm ? `No results found for "${searchTerm}"` : 'No data available'}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((row, index) => (
                    <TableRow 
                      key={index}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      {visibleColumns.map((column) => (
                        <TableCell 
                          key={column}
                          className={`${
                            getColumnType(column) === 'numeric' ? 'text-right font-mono' : ''
                          }`}
                        >
                          {formatValue(row[column])}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Enhanced Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div>
              Showing {Math.min(filteredAndSortedData.length, (currentPage - 1) * itemsPerPage + 1)} to{' '}
              {Math.min(filteredAndSortedData.length, currentPage * itemsPerPage)} of{' '}
              {filteredAndSortedData.length.toLocaleString()} entries
              {searchTerm && ` (filtered from ${data.length.toLocaleString()} total)`}
            </div>
            
            <Select 
              value={itemsPerPage.toString()} 
              onValueChange={(value) => {
                setItemsPerPage(parseInt(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              <span className="text-sm">Page</span>
              <Input
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= totalPages) {
                    setCurrentPage(page);
                  }
                }}
                className="w-16 h-8 text-center"
                min={1}
                max={totalPages}
              />
              <span className="text-sm">of {totalPages}</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTable;
