import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import { getTunnel } from './VerticalMenu.test';
import VerticalContent from '../VertivcalContent';

const verticalMenuTestid = 'vertical-content';
describe('VerticalContent', () => {
  test('render Chart', async () => {
    const [, , sizeReg, sizeApt] = getTunnel();
    render(<VerticalContent sizeAcceptor={sizeApt} />);
    expect(await screen.findByTestId(verticalMenuTestid)).toBeTruthy();
    act(() => {
      sizeReg({ heihgt: 200, width: 200 });
    });
  });
});
