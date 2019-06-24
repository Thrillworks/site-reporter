import React, { Component } from 'react';
import { DataTable, Box, Meter, Text } from 'grommet';
import data from '../../report/summary.json';

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
                {datum.score*100}
            </Box>
        ),
    },
    {
        property: 'score',
        header: 'Average Score',
        render: datum => (
            <Box pad={{ vertical: 'xsmall' }}>
            <Meter
                values={[{ value: datum.score*100 }]}
                thickness="small"
                size="small"
                background="orange"
            />
            </Box>
        ),
    },
    {
        property: 'html',
        header: 'Report Link',
        render: datum => {
            const link = process.env.PUBLIC_URL + '/report/lighthouse/' + datum.html;
            return (
            <Box pad={{ vertical: 'xsmall' }}>
                <a href={link}>Report</a>
            </Box>
            )
        },
    }

];

export default class extends Component {
    render() {
      return (
          <Box align='center'>
            <DataTable resizeable='true' columns={columns} data={data} />
          </Box>
      );
    }
  }

