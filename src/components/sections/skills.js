import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { mixins, Section, Heading } from '@styles';

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
`;

const Skills = ({ data }) => {
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  // TODO: map data to args needed by chart.js
  // TODO: chart.js chart like https://github.com/jarrekk/Jalpc/blob/0f11fe02c6793601caa6afc78a449074a7045845/_includes/sections/skills.html

  console.log(data);
  return (
    <StyledContainer id="skills">
      <Heading ref={revealTitle}>Skills</Heading>

      <div>Hello World</div>
    </StyledContainer>
  );
};

Skills.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Skills;
