const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");

export const siteLinks = {
  getStarted: appUrl ? `${appUrl}/register` : "mailto:support@pingstack.com?subject=Get%20started%20with%20PingStack",
  login: appUrl ? `${appUrl}/login` : "mailto:support@pingstack.com?subject=PingStack%20account%20access",
  hasAppUrl: Boolean(appUrl),
  contact: "mailto:support@pingstack.com",
};
