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
    const labels = [];
    const dataset = {
      label: 'Ability',
      fill: true,
      backgroundColor: 'rgba(180,226,221,0.2)',
      borderColor: 'rgba(51,133,122,1)',
      pointBorderColor: '#fff',
      pointBackgroundColor: 'rgba(51,133,122,1)',
      data: [],
    };
    for (const element of data) {
      const obj = element.node.frontmatter;
      labels.push(obj.title);
      dataset.data.push(parseFloat(obj.percentage));
    }

    new Chart(canvasRef.current, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [dataset],
      },
      options: {
        scale: {
          responsive: true,
          lineArc: false,
          gridLines: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
          pointLabels: {
            fontSize: 14,
            fontColor: 'rgba(136, 146, 176, 1)',
          },
          ticks: {
            backdropColor: 'rgba(10, 25, 47, 1)',
          },
        },
        legend: {
          display: false,
        },
      },
    });
    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledContainer id="skills">
      <Heading ref={revealTitle}>Skills</Heading>
      <canvas ref={canvasRef} width="800" height="600"></canvas>
    </StyledContainer>
  );
};

Skills.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Skills;
