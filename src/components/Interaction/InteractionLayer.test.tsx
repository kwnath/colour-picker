import { fireEvent, render } from '@testing-library/react';
import { InteractiveLayer } from './InteractionLayer';
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';

describe('InteractionLayer', () => {
  it('should trigger onMove when container is clicked and dragged', () => {
    const onMove = sinon.stub().returns(true);

    const wrapper = render(
      <InteractiveLayer onMove={onMove}>
        <div data-testid="container"></div>
      </InteractiveLayer>,
    );

    const container = wrapper.getByTestId('container');

    /** Expect that this is not called yet */
    expect(onMove.calledOnce).to.be.false;

    /** Now click the container it should call onMove */
    fireEvent.mouseDown(container, {});
    expect(onMove.calledOnce).to.be.true;
  });
});
