# ReactJS Jest Dynamic Progress Bar


![enter image description here](https://github.com/VickyFengYu/reactJS-jest-dynamic-progress-bar/blob/master/pictures/DynamicProgressBar.jpg)


## Jest

  ```
import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DynamicProgressBar from '../index';
import { Button, DropDown } from '@lux/components';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() })

global.fetch = require('jest-fetch-mock');

import testData from '../__mocks__/data.json';

describe('DynamicProgressBar Component', () => {

  beforeEach(() => {
    fetch.mockReset();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });


  const serviceUrl = 'http://pb-api.herokuapp.com/bars';

  it('should shallow render', () => {
    const wrapper = shallow(<DynamicProgressBar
      serviceUrl={testData.serviceUrl}
    />,
      {
        disableLifecycleMethods: true
      });

    expect(toJson(wrapper)).toMatchSnapshot();
    window['console'].log(wrapper.debug())
  });


  it('should render Progress Bar by default', async function () {
    const wrapper = shallow(
      <DynamicProgressBar
        apiResponse={testData.apiResponse}
        serviceUrl={serviceUrl}
      />, {
        disableLifecycleMethods: true
      }
    );

    fetch.mockResponses(
      [JSON.stringify(testData.apiResponse)],
    );

    await wrapper
      .instance()
      .initializeData()
      .then(() => {
        wrapper.update();

        window['console'].log("fetch.mock.calls => " + JSON.stringify(fetch.mock.calls));

        expect(fetch.mock.calls.length).toBe(1);
        expect(fetch.mock.calls[0][0]).toEqual(serviceUrl);
      });

  });



  // test('Play the Progress Bar, Click the Button', () => {
  it('Play the Progress Bar, Click the Button', function () {
    const fn = jest.fn();
    const component = renderer.create(
      <Button tabIndex={0} secondary
        onClick={fn}
      >
        100
      </Button>
    );
    const instance = component.getInstance();

    instance.props.onClick();

    // expect(component.state('counter')).toBe(1);
    // expect(fn.mock.calls[0][0]).toBe(1);
    expect(fn.mock.calls.length).toBe(1);

  });



  it('Play the DropDown, Select the Item', function () {
    const fn = jest.fn();
    const component = renderer.create(
      <DropDown
        placeholder="TEST"
        onChange={fn}
        items={Object.keys(testData.apiResponse.bars).map(buttonKey => ({
          text: buttonKey + '',
          value: buttonKey
        }))}
      />
    );
    const instance = component.getInstance();
    instance.props.onChange();

    expect(fn.mock.calls.length).toBe(1);

  });



  it('should Play Progress Bar Work Correctly', function () {

    window['console'].log("PlayProgressBar Test Start=> " + '');

    const wrapper = shallow(<DynamicProgressBar
      serviceUrl={testData.serviceUrl}
    />, {
        disableLifecycleMethods: true
      });

    wrapper.instance().playProgressBar(0, 0);
    expect(wrapper.state('limit')).toBe(100);
    expect(wrapper.state('buttons')).toEqual([]);
    expect(wrapper.state('bars')).toEqual([NaN]);

  });



  it('should onProgressBarSelection Work Correctly', function () {

    window['console'].log("PlayProgressBar Test Start=> " + '');

    const wrapper = shallow(<DynamicProgressBar
      serviceUrl={testData.serviceUrl}
    />, {
        disableLifecycleMethods: true
      });

    wrapper.simulate('change', {
      target: {
        value: 0
      }
    });

    wrapper.instance().onProgressBarSelection(wrapper);
    wrapper.update();
    expect(wrapper.state('barSelect')).toBe(undefined);

  });



  it('should Render Document Correctly', function () {

    const wrapper = shallow(<DynamicProgressBar
    />, {
        disableLifecycleMethods: true
      });

    window['console'].log("PlayProgressBar Test Start=> ");

    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('Row').length).toBe(1);
    expect(wrapper.find('DropDown').length).toBe(1);

    expect(wrapper.find('DropDown').exists()).toBeTruthy();

    // window['console'].log("Grid" + wrapper.find('Grid').children().length);
    expect(wrapper.find('Grid').children().length).toBe(1);
  });


});

  
  ```
