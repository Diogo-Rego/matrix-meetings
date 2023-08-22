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

export type { CalendarEntry, DateTimeEntry } from './calendarEntry';
export {
  STATE_EVENT_NORDECK_MEETING_METADATA,
  isValidNordeckMeetingMetadataEvent,
  migrateNordeckMeetingMetadataEventSchema,
} from './nordeckMeetingMetadataEvent';
export type { NordeckMeetingMetadataEvent } from './nordeckMeetingMetadataEvent';
export { ROOM_EVENT_REACTION, isValidReactionEvent } from './reactionEvent';
export type { ReactionEvent } from './reactionEvent';
export {
  STATE_EVENT_ROOM_CREATE,
  isValidRoomCreateEvent,
} from './roomCreateEvent';
export type { RoomCreateEvent } from './roomCreateEvent';
export { STATE_EVENT_ROOM_NAME, isValidRoomNameEvent } from './roomNameEvent';
export type { RoomNameEvent } from './roomNameEvent';
export {
  STATE_EVENT_ROOM_TOMBSTONE,
  isValidRoomTombstoneEvent,
} from './roomTombstoneEvent';
export type { RoomTombstoneEvent } from './roomTombstoneEvent';
export {
  STATE_EVENT_ROOM_TOPIC,
  isValidRoomTopicEvent,
} from './roomTopicEvent';
export type { RoomTopicEvent } from './roomTopicEvent';
export {
  STATE_EVENT_SPACE_CHILD,
  isValidSpaceChildEvent,
} from './spaceChildEvent';
export type { SpaceChildEvent } from './spaceChildEvent';
export {
  STATE_EVENT_SPACE_PARENT,
  isValidSpaceParentEvent,
} from './spaceParentEvent';
export type { SpaceParentEvent } from './spaceParentEvent';
export { STATE_EVENT_WIDGETS, isValidWidgetsEvent } from './widgetsEvent';
export type { WidgetsEvent } from './widgetsEvent';
