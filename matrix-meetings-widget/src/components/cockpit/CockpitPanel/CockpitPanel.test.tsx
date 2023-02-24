/*
 * Copyright 2022 Nordeck IT + Consulting GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { WidgetApiMockProvider } from '@matrix-widget-toolkit/react';
import { MockedWidgetApi, mockWidgetApi } from '@matrix-widget-toolkit/testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ComponentType, PropsWithChildren, useState } from 'react';
import { Provider } from 'react-redux';
import {
  mockCalendar,
  mockCreateMeetingRoom,
  mockNordeckMeetingMetadataEvent,
} from '../../../lib/testUtils';
import { createStore } from '../../../store';
import { initializeStore } from '../../../store/store';
import { LocalizationProvider } from '../../common/LocalizationProvider';
import { CockpitPanel } from './CockpitPanel';

let widgetApi: MockedWidgetApi;

afterEach(() => widgetApi.stop());

beforeEach(() => (widgetApi = mockWidgetApi({ roomId: '!meeting-room-id' })));

describe('<CockpitPanel>', () => {
  let Wrapper: ComponentType<PropsWithChildren<{}>>;

  beforeEach(() => {
    mockCreateMeetingRoom(widgetApi);

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => +new Date('2022-01-02T13:10:00.000Z'));

    Wrapper = ({ children }: PropsWithChildren<{}>) => {
      const [store] = useState(() => {
        const store = createStore({ widgetApi });
        initializeStore(store);
        return store;
      });

      return (
        <LocalizationProvider>
          <Provider store={store}>
            <WidgetApiMockProvider value={widgetApi}>
              {children}
            </WidgetApiMockProvider>
          </Provider>
        </LocalizationProvider>
      );
    };
  });

  it('should render without exploding', async () => {
    render(<CockpitPanel />, { wrapper: Wrapper });

    await expect(
      screen.findByRole('heading', { name: 'An important meeting', level: 3 })
    ).resolves.toBeInTheDocument();

    expect(
      screen.getByText('Jan 1, 2999, 10:00 AM – 2:00 PM')
    ).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<CockpitPanel />, { wrapper: Wrapper });

    await expect(
      screen.findByRole('heading', { name: 'An important meeting' })
    ).resolves.toBeInTheDocument();

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should display upcoming recurring meeting', async () => {
    widgetApi.mockSendStateEvent(
      mockNordeckMeetingMetadataEvent({
        content: {
          calendar: mockCalendar({
            dtstart: '20220101T150000',
            dtend: '20220101T160000',
            rrule: 'FREQ=DAILY',
          }),
        },
      })
    );

    render(<CockpitPanel />, { wrapper: Wrapper });

    await expect(
      screen.findByRole('heading', { name: 'An important meeting', level: 3 })
    ).resolves.toBeInTheDocument();

    expect(
      screen.getByText('Jan 2, 2022, 3:00 PM – 4:00 PM')
    ).toBeInTheDocument();
  });

  it('should display current recurring meeting if one is in progress', async () => {
    widgetApi.mockSendStateEvent(
      mockNordeckMeetingMetadataEvent({
        content: {
          calendar: mockCalendar({
            dtstart: '20220101T130000',
            dtend: '20220101T140000',
            rrule: 'FREQ=DAILY',
          }),
        },
      })
    );

    render(<CockpitPanel />, { wrapper: Wrapper });

    await expect(
      screen.findByRole('heading', { name: 'An important meeting', level: 3 })
    ).resolves.toBeInTheDocument();

    expect(
      screen.getByText('Jan 2, 2022, 1:00 PM – 2:00 PM')
    ).toBeInTheDocument();
  });

  it('should display last recurring meeting after the series has ended', async () => {
    widgetApi.mockSendStateEvent(
      mockNordeckMeetingMetadataEvent({
        content: {
          calendar: mockCalendar({
            dtstart: '20210101T130000',
            dtend: '20210101T140000',
            rrule: 'FREQ=DAILY;COUNT=5',
          }),
        },
      })
    );

    render(<CockpitPanel />, { wrapper: Wrapper });

    await expect(
      screen.findByRole('heading', { name: 'An important meeting', level: 3 })
    ).resolves.toBeInTheDocument();

    expect(
      screen.getByText('Jan 5, 2021, 1:00 PM – 2:00 PM')
    ).toBeInTheDocument();
  });

  it('should navigate the parent room', async () => {
    render(<CockpitPanel />, { wrapper: Wrapper });

    await expect(
      screen.findByRole('heading', { name: 'An important meeting' })
    ).resolves.toBeInTheDocument();

    userEvent.click(
      screen.getByRole('button', { name: /back to parent room/i })
    );

    expect(widgetApi.navigateTo).toBeCalledWith('https://matrix.to/#/!room-id');
  });
});
