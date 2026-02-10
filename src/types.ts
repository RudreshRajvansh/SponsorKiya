export type UserType = 'organizer' | 'brand';

export interface User {
  name: string;
  avatar: string;
  role: UserType;
}

export interface CardData {
  title: string;
  sub: string;
  tag: string;
  metric: string;
}