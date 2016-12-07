import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';

class HomePage extends React.Component {

  render() {
    return (
      <Layout className={s.content}>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            formula
          </div>
        </div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col">




            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
  <tbody>
    <tr>
      <td className="mdl-data-table__cell--non-numeric">
        <input name="x" type="text" />
      </td>
      <td>
        -
      </td>
      <td className="mdl-data-table__cell--non-numeric">
        <input name="y" type="text" />
      </td>
      <td className="mdl-data-table__cell--non-numeric">
        <select>
  <option value="&#60;">&#60;</option>
  <option value="&#8804;">&#8804;</option>
</select>
      </td>
      <td>
        <input name="c" type="text" />
      </td>
      <td>
      <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
              <i className="material-icons">add</i>
            </button>
      </td>
    </tr>
  </tbody>
</table>



            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
  <tbody>
    <tr>
      <td className="mdl-data-table__cell--non-numeric">x</td>
      <td>-</td>
      <td className="mdl-data-table__cell--non-numeric">y</td>
      <td className="mdl-data-table__cell--non-numeric">&#60;</td>
      <td>0</td>
      <td>
      <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
              <i className="material-icons">delete</i>
            </button>
      </td>
    </tr>
  </tbody>
</table>



          </div>
          <div className="mdl-cell mdl-cell--8-col">
          <svg height="400" width="450">
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
          </div>
        </div>
      </Layout>
    );
  }

}

export default HomePage;
