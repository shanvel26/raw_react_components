import React from 'react';
import './App.css';

function Tooltip({ title, placement, children }) {
  return (
    <div className={`tooltip ${placement}`}>
      {children}
      <span className="tooltiptext">{title}</span>
    </div>
  );
}

function PositionedTooltips() {
  return (
    <div className="container">
      <div className="row center">
        <Tooltip title="Add" placement="top-start">
          <button>top-start</button>
        </Tooltip>
        <Tooltip title="Add" placement="top">
          <button>top</button>
        </Tooltip>
        <Tooltip title="Add" placement="top-end">
          <button>top-end</button>
        </Tooltip>
      </div>
      <div className="row">
        <div className="column">
          <Tooltip title="Add" placement="left-start">
            <button>left-start</button>
          </Tooltip>
          <Tooltip title="Add" placement="left">
            <button>left</button>
          </Tooltip>
          <Tooltip title="Add" placement="left-end">
            <button>left-end</button>
          </Tooltip>
        </div>
        <div className="column end">
          <Tooltip title="Add" placement="right-start">
            <button>right-start</button>
          </Tooltip>
          <Tooltip title="Add" placement="right">
            <button>right</button>
          </Tooltip>
          <Tooltip title="Add" placement="right-end">
            <button>right-end</button>
          </Tooltip>
        </div>
      </div>
      <div className="row center">
        <Tooltip title="Add" placement="bottom-start">
          <button>bottom-start</button>
        </Tooltip>
        <Tooltip title="Add" placement="bottom">
          <button>bottom</button>
        </Tooltip>
        <Tooltip title="Add" placement="bottom-end">
          <button>bottom-end</button>
        </Tooltip>
      </div>
    </div>
  );
}

export default PositionedTooltips;
