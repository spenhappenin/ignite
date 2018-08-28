import React from 'react';

const createMarkup = (html) => {
  return { __html: html };
};

const GenerateHtml = (props) => (
  <div
    dangerouslySetInnerHTML={createMarkup(props.text)}
  />
);

export default GenerateHtml;
