import { render } from '@testing-library/react';
import { SubText } from './Text';
import React from 'react';
import { should } from 'chai';

describe('SubText', () => {
  it('should display the text', () => {
    const TEXT = 'hello';
    const { queryByText } = render(<SubText>{TEXT}</SubText>);
    const text = queryByText(TEXT);
    should().exist(text);
  });

  it('should be empty if no text is given', () => {
    const { queryByText } = render(<SubText></SubText>);
    should().not.exist(queryByText('.*'));
  });
});
