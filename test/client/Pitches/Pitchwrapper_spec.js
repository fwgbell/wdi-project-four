/* global describe,it */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import PitchWrapper from '../../../src/components/pitches/PitchWrapper';

const testData = {
  _id: 1234,
  name: 'Good Pitch',
  image: 'https://i.ebayimg.com/images/g/SZMAAMXQeW5TX9ZT/s-l300.jpg',
  matches: []
};

const match = {
  params: {
    id: 1234
  }
};
const Component = (
  <MemoryRouter>
    <PitchWrapper  pitch={testData} match={match} />
  </MemoryRouter>
);

sinon.stub(axios, 'get')
  .returns(Promise.resolve({ data: testData }));

describe('PitchShow', () => {
  it('should show the pitch name and image', done => {
    const component = mount(Component);
    expect(component.find('img').props().src).to.eq(testData.image);
    expect(component.find('h2').text()).to.eq(testData.name);
    done();
  });

  it('should show the correct number of images', done => {
    const component = mount(Component);
    expect(component.find('img').length).to.eq(1);
    done();
  });

  it('should show the correct number of titles', done => {
    const component = mount(Component);
    expect(component.find('h2').length).to.eq(1);
    done();
  });
});
