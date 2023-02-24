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

import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { unstable_useId as useId } from '@mui/utils';
import { t } from 'i18next';
import { ellipsis } from '../../../lib/ellipsis';
import { MeetingParticipant } from '../../../reducer/meetingsApi';
import { ParticipantMembershipIcon } from './ParticipantMembershipIcon';

export type ParticipantItemProps = {
  participant: MeetingParticipant;
};

export function ParticipantItem({ participant }: ParticipantItemProps) {
  const titleId = useId();
  const subtitleId = useId();

  const secondaryText = getParticipantMembership(participant);

  return (
    <>
      <ListItem
        aria-describedby={secondaryText ? subtitleId : undefined}
        aria-labelledby={titleId}
        disableGutters
      >
        <ListItemIcon sx={{ mr: 1, minWidth: 0 }}>
          <ParticipantMembershipIcon participant={participant} />
        </ListItemIcon>

        <ListItemText
          primary={participant.displayName}
          primaryTypographyProps={{ sx: ellipsis, id: titleId }}
          secondary={secondaryText}
          secondaryTypographyProps={{ id: subtitleId }}
        />
      </ListItem>
    </>
  );
}

export function getParticipantMembership(participant: MeetingParticipant) {
  if (participant.membership === 'invite') {
    return t('meetingCard.editParticipants.membership', 'Invited', {
      context: 'invite',
    });
  } else if (participant.membership === 'join') {
    return t('meetingCard.editParticipants.membership', 'Accepted', {
      context: 'join',
    });
  } else {
    return undefined;
  }
}
