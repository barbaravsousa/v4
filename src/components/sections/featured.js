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

const Featured = ({ data }) => {
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledContainer id="skills">
      <Heading ref={revealTitle}>Skills</Heading>

      <div>Hello World</div>
    </StyledContainer>
  );
};

Featured.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Featured;
