// import { SocialEntity } from '@entities/social.entity';
import { UserEntity } from '@entities/user.entity';

export const isUUID = (value: string): boolean => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(value);
};

export const isValidEmail = (email: string): boolean => {
  const regexExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // regular expression to match valid email addresses

  return regexExp.test(email);
};

export const isTrue = (value?: string): boolean => value === 'true';

// export const getTwitter = (user: UserEntity): SocialEntity => {
//   const social = user?.socials.find((social) => social.type === 'twitter');
//   return social;
// };

export const isTaproot = (address: string): boolean => {
  const firstFour = address.substring(0, 4);
  return firstFour === 'bc1p';
};
