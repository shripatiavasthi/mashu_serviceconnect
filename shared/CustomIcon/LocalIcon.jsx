import EmergencyHelpIcon from '../../assets/svg/EmergencyHelpIcon';
import WellMindIcon from '../../assets/svg/WellMindIcon';
import TelephoneIcon from '../../assets/svg/TelephoneIcon';
import EmailIcon from '../../assets/svg/EmailIcon';
import CameraVideoIcon from '../../assets/svg/CameraVideoIcon';
import HomeIcon from '../../assets/svg/HomeIcon';
import JobAssIcon from '../../assets/svg/JobAssIcon';
import ArrowIcon from '../../assets/svg/ArrowIcon';
import LegalIcon from '../../assets/svg/LegalIcon';
import MapPathIcon from '../../assets/svg/MapPathIcon';
import SkillIcon from '../../assets/svg/SkillIcon';
import NotificationIcon from '../../assets/svg/NotificationIcon';
import StartEduIcon from '../../assets/svg/StartEduIcon';
import TrainingIcon from '../../assets/svg/TrainingIcon';
import WhatNeedIcon from '../../assets/svg/WhatNeedIcon';
import ServiceConnectIcon from '../../assets/svg/ServiceConnectIcon';
import CrossroadIcon from '../../assets/svg/CrossroadIcon';
import WebsiteIcon from '../../assets/svg/WebsiteIcon';
import LoginIcon from '../../assets/svg/LoginIcon';
import SearchIcon from '../../assets/svg/SearchIcon';
import MenuIcon from '../../assets/svg/MenuIcon';
import BackIcon from '../../assets/svg/BackIcon';
import PdfIcon from '../../assets/svg/PdfIcon';
import CrossIcon from '../../assets/svg/CrossIcon';
import MedicalIcon from '../../assets/svg/MedicalIcon';
import CloudIcon from '../../assets/svg/cloud-off.svg';
import Map_Icon from '../../assets/svg/Map_Icon.svg';
import EventScheduleIcon from '../../assets/svg/EventScheduleIcon.svg';

function getLocalIcon(iconName) {
  switch (iconName) {
    case 'WellMind':
      return WellMindIcon;
    case 'Arrow':
      return ArrowIcon;
    case 'Telephone':
      return TelephoneIcon;
    case 'Email':
      return EmailIcon;
    case 'CameraVideo':
      return CameraVideoIcon;
    case 'Home':
      return HomeIcon;
    case 'JobAss':
      return JobAssIcon;
    case 'Legal':
      return LegalIcon;
    case 'MapPath':
      return MapPathIcon;
    case 'Skill':
      return SkillIcon;
    case 'Notification':
      return NotificationIcon;
    case 'StartEdu':
      return StartEduIcon;
    case 'Training':
      return TrainingIcon;
    case 'WhatNeed':
      return WhatNeedIcon;
    case 'ServiceConnect':
      return ServiceConnectIcon;
    case 'Crossroad':
      return CrossroadIcon;
    case 'Website':
      return WebsiteIcon;
    case 'Login':
      return LoginIcon;
    case 'Search':
      return SearchIcon;
    case 'Menu':
      return MenuIcon;
    case 'Back':
      return BackIcon;
    case 'CrossIcon':
      return CrossIcon;
    case 'PdfIcon':
      return PdfIcon;
    case 'MedicalIcon':
      return MedicalIcon;
    case 'Cloud':
      return CloudIcon;
    case 'Map_Icon':
      return Map_Icon;
    case 'EventScheduleIcon':
      return EventScheduleIcon;  
    default:
      return EmergencyHelpIcon;
  }
}

export default getLocalIcon;
