import React from 'react';
import { act, render, screen } from '@testing-library/react';
import InfoCardBox from '../InfoCardBox';
import { legends, triggerItems, options, config } from './InfoCard.test';
import { renderHook } from '@testing-library/react-hooks';
import useTunnel from '../../hooks/useTunnel';

const getTrigger = () => 'mouseover';
const infoCardBoxTestid = 'infoCardBox';

// describe('props triggerItems in InforCardBox', () => {
//   test('render InfoCardBox with empty triggerItems', async () => {
//     const { result } = renderHook(() => useTunnel());
//     const [register, acceptor] = result.current;
//     render(
//       <InfoCardBox acceptor={acceptor} legends={legends} getTrigger={getTrigger} options={options} config={config} />
//     );

//     act(() => {
//       register(null as any);
//     });
//     expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
//   });

//   test('render InfoCardBox with first data is undefined in triggerItems', async () => {
//     const { result } = renderHook(() => useTunnel());
//     const [register, acceptor] = result.current;
//     render(
//       <InfoCardBox acceptor={acceptor} legends={legends} getTrigger={getTrigger} options={options} config={config} />
//     );

//     act(() => {
//       register([undefined] as any);
//     });
//     expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
//   });

//   test('render InfoCardBox with first data is empty in triggerItems', async () => {
//     const { result } = renderHook(() => useTunnel());
//     const [register, acceptor] = result.current;
//     render(
//       <InfoCardBox acceptor={acceptor} legends={legends} getTrigger={getTrigger} options={options} config={config} />
//     );

//     act(() => {
//       register([{}] as any);
//     });
//     expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
//   });
// });

// describe('props options.defaultStyles in InforCardBox', () => {
//   // test('render InfoCardBox with empty options', async () => {
//   //   const { result } = renderHook(() => useTunnel());
//   //   const [register, acceptor] = result.current;
//   //   render(
//   //     <InfoCardBox
//   //       acceptor={acceptor}
//   //       legends={legends}
//   //       getTrigger={getTrigger}
//   //       config={config}
//   //       options={undefined as any}
//   //     />
//   //   );
//   //   act(() => {
//   //     register(triggerItems);
//   //   });
//   //   expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
//   // });

//   test('render InfoCardBox with empty options.defaultStyles', async () => {
//     const { result } = renderHook(() => useTunnel());
//     const [register, acceptor] = result.current;
//     render(
//       <InfoCardBox
//         acceptor={acceptor}
//         legends={null as any}
//         getTrigger={getTrigger}
//         config={config}
//         options={undefined as any}
//       />
//     );
//     act(() => {
//       register(triggerItems);
//     });
//     expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
//   });
// });

describe('props legends in InforCardBox', () => {
  // test('render InfoCardBox with empty legends', async () => {
  //   const { result } = renderHook(() => useTunnel());
  //   const [register, acceptor] = result.current;
  //   render(
  //     <InfoCardBox
  //       acceptor={acceptor}
  //       legends={undefined as any}
  //       getTrigger={getTrigger}
  //       options={options}
  //       config={config}
  //     />
  //   );
  //   act(() => {
  //     register(triggerItems);
  //   });
  //   expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
  // });
  // test('render InfoCardBox with different legends', async () => {
  //   const { result } = renderHook(() => useTunnel());
  //   const [register, acceptor] = result.current;
  //   const newLegends = { 深圳: { name: '深圳' } };
  //   render(
  //     <InfoCardBox acceptor={acceptor} legends={newLegends} getTrigger={getTrigger} options={options} config={config} />
  //   );
  //   act(() => {
  //     register(triggerItems);
  //   });
  //   expect(await screen.findByTestId(infoCardBoxTestid)).toBeTruthy();
  // });
});
