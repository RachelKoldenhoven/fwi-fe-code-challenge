import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { TableHeader } from './TableHeader';

describe('TableHeader', () => {
  it('should have an Add Player button', () => {
    // Setup
    const thWrapper = shallow(<TableHeader />);
    const addPlayerBtn = thWrapper.find('.table__player__add');

    // Exercise

    // Assert
    expect(addPlayerBtn).toHaveLength(1);
  });

  it('should call onAdd when btn is clicked', () => {
    // Setup
    const onAdd = sinon.spy();
    const thWrapper = shallow(<TableHeader onAdd={onAdd} />);
    const addPlayerBtn = thWrapper.find('.table__player__add');

    // Exercise
    addPlayerBtn.simulate('click');

    // Assert
    expect(onAdd.calledOnce).toEqual(true);
  });
});
