export const WS_EVENTS = {
  notifications: {
    new: 'notifications:new',
    read: 'notifications:read',
    readAll: 'notifications:read-all',
  },
  friends: {
    requestCreated: 'friends:request:created',
    requestAccepted: 'friends:request:accepted',
    requestDeclined: 'friends:request:declined',
    requestCancelled: 'friends:request:cancelled',
    updated: 'friends:updated',
  },
} as const;
