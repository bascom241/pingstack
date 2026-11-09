const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/+$/, "") || "https://pingstackapp.vercel.app";

export const siteLinks = {
  getStarted: `${appUrl}/`,
  register: `${appUrl}/`,
  login: `${appUrl}/`,
  hasAppUrl: true,
  contact: "mailto:support@pingstack.com",
};
