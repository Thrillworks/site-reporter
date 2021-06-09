import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Paragraph, Image, Heading, Button } from 'grommet';
import data from '../../report/lighthouse/summary.json';

function Screenshot({ image, html }) {
  return image && html && (
    <Box pad="small" margin={{ bottom: 'medium', right: 'medium' }} align="center" key={image} border={{ color: 'silver' }} style={{ backgroundColor: 'whitesmoke' }}>
      <Image src={`data:image/png;base64,${image}`} style={{ maxWidth: '100%' }} />
      <Paragraph size="small" textAlign="center"><em>{html}</em></Paragraph>
    </Box>
  );
}

function Screenshots({ nodes }) {
  return !nodes.length ? (<Paragraph>No screenshots available.</Paragraph>) : (
    <Box direction="row" wrap="true" align="start">
      {nodes.map(node => (
        node.screenshots && node.screenshots.map(image => (<Screenshot image={image} html={node.html} />))
      ))}
    </Box>
  );
}

function Violation({ violation }) {
  const firstNode = violation.nodes.length && violation.nodes[0];
  const firstAny = firstNode && firstNode.any.length && firstNode.any[0];
  const allNodes = (firstAny && firstAny.relatedNodes.length) ? [...violation.nodes, ...firstAny.relatedNodes] : violation.nodes;
  const uniqueNodes = allNodes.filter((node, index) => (
    allNodes.map(node => node.html).indexOf(node.html) === index
  ));

  return (
    <Box align="stretch" border={{ side: 'top', color: 'silver', size: 'xsmall' }}>
      <Heading level="2">{violation.id}</Heading>
      <Text>{violation.description}.</Text>
      {firstNode && firstNode.failureSummary && (
        <Box>
          <Heading level="4">Recommendation</Heading>
          <Text>{firstNode.failureSummary}.</Text>
        </Box>
      )}
      <Heading level="4">Screenshots</Heading>
      <Screenshots nodes={uniqueNodes} />
    </Box>
  );
}

function Violations({ violations }) {
  return !violations || !violations.length ? (
    <Paragraph>No violations found.</Paragraph>
  ) : (
    violations.map(violation => (<Violation violation={violation} key={violation.id} />))
  );
}

export default function AccessibilityAudit({ match }) {
  const name = match.params.name;
  const result = data.find(datum => datum.name === name);
  const audit = result && result.accessibilityAudit;
  return (
    <Box margin={{ vertical: 'small', horizontal: 'large' }}>
      <Link to="/" style={{ color: 'gray' }}>&lsaquo; Back</Link>
      {!audit ? (
        <Paragraph>No violations found.</Paragraph>
      ) : (
        <Box>
          <Heading color="dodgerblue" style={{ wordWrap: 'break-word' }}>{audit.url}</Heading>
          <Violations violations={audit.violations} />
          <Button primary={true} label={"Violations: " + audit.violations.length} style={{ position: 'fixed', bottom: '.5rem', right: '.5rem' }} />
        </Box>
      )}
    </Box>
  );
}

