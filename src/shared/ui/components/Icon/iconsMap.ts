import { FaRegSmileWink, FaLeaf, FaGithub, FaReact } from 'react-icons/fa';
import { MdOutlineNotifications, MdBugReport, MdHome, MdSettings } from 'react-icons/md';
import { IoMdRocket, IoIosArrowForward } from 'react-icons/io';

export const iconsMap = {
  'fa-smile-wink': FaRegSmileWink,
  'fa-leaf': FaLeaf,
  'fa-github': FaGithub,
  'fa-react': FaReact,
  'md-notifications': MdOutlineNotifications,
  'md-bug-report': MdBugReport,
  'md-home': MdHome,
  'md-settings': MdSettings,
  'io-arrow-forward': IoIosArrowForward,
  'io-rocket': IoMdRocket,
};

export type TIconName = keyof typeof iconsMap;
