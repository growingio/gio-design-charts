import React from 'react';
import { render, screen } from '@testing-library/react';
import VerticalMenu from '../VerticalMenu';
import { act, renderHook } from '@testing-library/react-hooks';
import useTunnel from '../../../hooks/useTunnel';

export const getTunnel = () => {
  const { result: scaleRes } = renderHook(() => useTunnel());
  const { result: heightRes } = renderHook(() => useTunnel());
  const [scaleReg, scaleApt] = scaleRes.current;
  const [heightReg, heightApt] = heightRes.current;
  return [scaleReg, scaleApt, heightReg, heightApt];
};

const verticalMenuTestid = 'vertical-menu';
describe('VerticalMenu', () => {
  test('render Chart', async () => {
    const [scaleReg, scaleApt, heightReg, heightApt] = getTunnel();
    render(<VerticalMenu acceptor={scaleApt} sizeAcceptor={heightApt} />);
    expect(await screen.findByTestId(verticalMenuTestid)).toBeTruthy();
    act(() => {
      scaleReg({});
      heightReg({ heihgt: 200, width: 200 });
    });
  });
});
