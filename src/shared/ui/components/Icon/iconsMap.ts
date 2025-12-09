import { FaRegSmileWink, FaLeaf, FaGithub, FaReact } from 'react-icons/fa';
import { MdOutlineNotifications, MdBugReport, MdHome, MdSettings } from 'react-icons/md';
import { IoMdRocket, IoIosArrowForward, IoMdClose } from 'react-icons/io';
import { FaCircleCheck } from "react-icons/fa6";

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
  'io-close': IoMdClose,
  'fa-circle-check': FaCircleCheck,
};

export type TIconName = keyof typeof iconsMap;
