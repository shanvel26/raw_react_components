// src/ResizableTable.js
import React, { useState, useRef } from 'react';
import './ResizableTable.css';

const ResizableTable = () => {
  const [columns, setColumns] = useState([
    { name: 'Name', width: 200 },
    { name: 'Age', width: 100 },
    { name: 'Email', width: 300 },
  ]);

  const tableRef = useRef(null);

  const startResize = (index, e) => {
    const startX = e.clientX;
    const startWidth = columns[index].width;

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      setColumns((prevColumns) => {
        const newColumns = [...prevColumns];
        newColumns[index].width = newWidth > 50 ? newWidth : 50; // minimum width
        return newColumns;
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="table-container" ref={tableRef}>
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={{ width: col.width }}>
                <div className="header">
                  {col.name}
                  <div
                    className="resizer"
                    onMouseDown={(e) => startResize(index, e)}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>25</td>
            <td>john.doe@example.com</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>30</td>
            <td>jane.smith@example.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResizableTable;
