
const injectedSessions: Array<string> = [];
const sessionHasBeenInjected = (sessionid: string) => {
  return injectedSessions.includes(sessionid);
};
const addSession = (sessionid: string) => {
  return injectedSessions.push(sessionid);
};
export {
  sessionHasBeenInjected,
  addSession,
};
