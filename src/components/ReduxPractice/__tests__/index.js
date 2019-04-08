import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReduxPractice from '../index';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() })

describe('ReduxPractice Component', () => {
  it('should shallow render', () => {
    const wrapper = shallow(<ReduxPractice />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
