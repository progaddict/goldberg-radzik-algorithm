import React, { PropTypes } from 'react';



class Graph extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <svg ref={node => (this.root = node)} height="400" width="450">
        <path id="lineAB" d="M 100 350 l 150 -300" stroke="red" strokeWidth="3" fill="none" />
        <path id="lineBC" d="M 250 50 l 150 300" stroke="red" strokeWidth="3" fill="none" />
        <path d="M 175 200 l 150 0" stroke="green" strokeWidth="3" fill="none" />
        <path d="M 100 350 q 150 -300 300 0" stroke="blue" strokeWidth="5" fill="none" />
        <g stroke="black" strokeWidth="3" fill="black">
          <circle id="pointA" cx="100" cy="350" r="3" />
          <circle id="pointB" cx="250" cy="50" r="3" />
          <circle id="pointC" cx="400" cy="350" r="3" />
        </g>
        <g fontSize="30" fontFamily="sans-serif" fill="black" stroke="none" textAnchor="middle">
          <text x="100" y="350" dx="-30">A</text>
          <text x="250" y="50" dy="-10">B</text>
          <text x="400" y="350" dx="30">C</text>
        </g>
        Sorry, your browser does not support inline SVG.
      </svg>
    );
  }

}

export default Graph;
