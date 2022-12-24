import { TAGS } from '../../common/helpers/constants';
import CONSTANTS from './constants';
import './logo.scss';
import IDrawComponent from '../../common/interface/IDrawComponent';
import getDOMElement from '../../common/helpers/getDOMElement';

export default class Logo implements IDrawComponent {
  public draw() {
    const logo = getDOMElement(TAGS.h1, CONSTANTS.logo.class);
    const logoLink = getDOMElement(
      TAGS.a,
      CONSTANTS.logoLink.class,
      CONSTANTS.logoLink.text,
      undefined,
      CONSTANTS.logoLink.atributes,
    );

    logo.append(logoLink);

    return logo;
  }
}
