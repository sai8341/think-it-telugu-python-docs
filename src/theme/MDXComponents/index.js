import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Quiz from '@site/src/components/Quiz';
import { CardGroup, Card } from '@site/src/components/Cards';
import { AccordionGroup, Accordion } from '@site/src/components/Accordion';
import ZoomableImage from '@site/src/components/ZoomableImage';

export default {
  ...MDXComponents,
  img: (props) => <ZoomableImage {...props} />,
  ZoomableImage,
  Quiz,
  CardGroup,
  Card,
  AccordionGroup,
  Accordion,
};

