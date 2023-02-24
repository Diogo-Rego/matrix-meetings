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

export const shortMonthDateFormat = {
  month: 'short',
  year: 'numeric',
  day: 'numeric',
};

export const longDateFormat = {
  month: 'long',
  year: 'numeric',
  day: 'numeric',
};

export const withoutDayDateFormat = {
  month: 'long',
  year: 'numeric',
};

export const fullLongDateFormat = {
  hour: 'numeric',
  minute: 'numeric',
  month: 'long',
  year: 'numeric',
  day: 'numeric',
};

export const fullNumericDateFormat = {
  hour: 'numeric',
  minute: 'numeric',
  month: 'numeric',
  year: 'numeric',
  day: 'numeric',
};

export const timeOnlyDateFormat = {
  hour: 'numeric',
  minute: 'numeric',
};

export const withoutYearDateFormat = {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

export const fullDateFormat = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};
