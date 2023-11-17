import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

interface TableRow {
  id: number;
  [key: string]: string | number; // Add a string index signature for other properties
}

interface TableColumn {
  name: string;
  isNumeric?: boolean;
}

interface RankTableProps {
  heading: string;
  content: TableRow[];
  columns: TableColumn[];
}

interface CustomRankTableProps {
  width: string;
  height: string;
}

const RankTable: React.FC<RankTableProps & CustomRankTableProps> = ({
  heading,
  content,
  columns,
  width,
  height,
}) => {
  // Dummy data for testing
  const dummyContent: TableRow[] = [
    { id: 1, name: 'John Doe', score: 100 },
    { id: 2, name: 'Jane Smith', score: 90 },
    { id: 3, name: 'Bob Johnson', score: 85 },
  ];

  // Dummy columns for testing
  const dummyColumns: TableColumn[] = [
    { name: 'Name' },
    { name: 'Score', isNumeric: true },
  ];

  return (
    <TableContainer width={width} height={height}>
      <Table variant="simple" size="lg">
        <TableCaption>{heading}</TableCaption>
        <Thead>
          <Tr>
            {dummyColumns.map((column, index) => (
              <Th key={index} isNumeric={column.isNumeric}>
                {column.name}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {dummyContent.map((item) => (
            <Tr key={item.id}>
              {dummyColumns.map((column, index) => (
                <Td key={index} isNumeric={column.isNumeric}>
                  {item[column.name]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default RankTable;
