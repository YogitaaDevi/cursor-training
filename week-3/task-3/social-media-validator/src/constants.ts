export interface SocialMediaOption {
  name: string;
  urlPattern: RegExp;
  defaultUrl: string;
}

export const SOCIAL_MEDIA_OPTIONS: SocialMediaOption[] = [
  {
    name: 'Facebook',
    urlPattern: /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9._-]+$/i,
    defaultUrl: 'https://www.facebook.com/'
  },
  {
    name: 'Twitter',
    urlPattern: /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9._-]+$/i,
    defaultUrl: 'https://www.twitter.com/'
  },
  {
    name: 'Instagram',
    urlPattern: /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._-]+$/i,
    defaultUrl: 'https://www.instagram.com/'
  },
  {
    name: 'Discord',
    urlPattern: /^(https?:\/\/)?(www\.)?discord\.com\/[a-zA-Z0-9._-]+$/i,
    defaultUrl: 'https://www.discord.com/'
  }
]; 