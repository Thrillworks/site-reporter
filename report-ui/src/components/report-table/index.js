import React, { Component } from 'react';
import { DataTable, Box, Meter, Text } from 'grommet';
import { Link } from 'react-router-dom';
import data from '../../report/lighthouse/summary.json';

const columns = [
  {
    property: 'url',
    header: <Text>Page</Text>,
    primary: true,
  },
  {
    property: 'score',
    header: "Average Score Value",
    render: datum => (
      <Box align="right" pad={{ vertical: 'xsmall' }}>
        {datum.score * 100}
      </Box>
    ),
  },
  {
    property: 'score',
    header: 'Average Score',
    render: datum => (
      <Box pad={{ vertical: 'xsmall' }}>
        <Meter
          values={[{ value: datum.score * 100 }]}
          thickness="small"
          size="small"
          background="orange"
        />
      </Box>
    ),
  },
  {
    property: 'html',
    header: 'Site Report',
    render: datum => {
      // const temp_link = process.env.PUBLIC_URL + '/report/lighthouse/' + datum.html;
      return (
        <Box pad={{ vertical: 'xsmall' }}>
          <a href={`/report/lighthouse/${datum.html}`}>Report</a>
        </Box>
      )
    },
  },
  {
    property: 'html',
    header: 'Accessibility Audit',
    render: datum => {
      return datum.accessibilityAudit && (
        <Box pad={{ vertical: 'xsmall' }}>
          <Link to={`accessibility/audit/${datum.name}`}>Audit</Link>
        </Box>
      )
    },
  },

];

export default class extends Component {
  render() {
    return (
      <Box align='center'>
        <DataTable resizeable={true} columns={columns} data={data} />
      </Box>
    );
  }
}

