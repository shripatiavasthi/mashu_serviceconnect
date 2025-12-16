import {useSelector} from 'react-redux';
import * as crashlytics from '../utils/Crashlytics';

export default function translation(textObj) {
  if (!textObj) return '';

  let language = useSelector(({settings}) => settings.language);
  //return value of object as per the key(here, key is the value of lanuage from redux)
  try {
    return textObj[language];
  } catch (err) {
    crashlytics.log(textObj);
    crashlytics.log(err);
    return '';
  }

  //return translatedWord; //? translatedWord : 'UnableToTranslate';
}
