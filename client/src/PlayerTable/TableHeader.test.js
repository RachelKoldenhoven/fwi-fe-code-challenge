import React from 'react';
import { shallow } from 'enzyme';

import TableHeader from './TableHeader';

describe('TableHeader', () => {
  it('should have an Add Player button', () => {
    // Setup
    const thWrapper = shallow(<TableHeader />);
    const addPlayerBtn = thWrapper.find('.table__player-add');

    // Exercise

    // Assert
    expect(addPlayerBtn).toHaveLength(1);
  });
});
