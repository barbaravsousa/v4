import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { mixins, Section, Heading } from '@styles';
import Chart from 'chart.js';

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
`;

const Skills = ({ data }) => {
  const revealTitle = useRef(null);
  const canvasRef = useRef(null);
  const revealProjects = useRef([]);
  useEffect(() => {
    const defaultColors = [
      {
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
      },
      {
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
      },
      {
        backgroundColor: 'rgba(152,251,152,1)',
        borderColor: 'rgba(34,139,34,1)',
        pointBackgroundColor: 'rgba(34,139,34,1)',
      },
    ];
    let colorsIndex = 0;
    const datasetTitles = new Set();
    data.forEach(element => datasetTitles.add(element.node.frontmatter.dataset));
    const labels = data.map(element => element.node.frontmatter.title);
    const datasets = [];
    for (const title of datasetTitles) {
      datasets.push({
        label: title,
        fill: true,
        ...defaultColors[colorsIndex],
        data: Array.from({ length: labels.length }).fill(0),
      });
      colorsIndex = (colorsIndex + 1) % defaultColors.length;
    }
    for (let i = 0; i < data.length; i++) {
      const key = data[i].node.frontmatter.dataset;
      for (const dataset of datasets) {
        if (key === dataset.label) {
          dataset.data[i] = parseFloat(data[i].node.frontmatter.percentage);
          break;
        }
      }
    }

    new Chart(canvasRef.current, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {},
    });
    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  // TODO: map data to args needed by chart.js
  // TODO: chart.js chart like https://github.com/jarrekk/Jalpc/blob/0f11fe02c6793601caa6afc78a449074a7045845/_includes/sections/skills.html

  return (
    <StyledContainer id="skills">
      <Heading ref={revealTitle}>Skills</Heading>
      <canvas ref={canvasRef} width="800" height="600"></canvas>

      <div>Hello World</div>
    </StyledContainer>
  );
};

Skills.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Skills;
