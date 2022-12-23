import { TAGS } from '../../common/helpers/constants';
import CONSTANTS from './constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import './footer.scss';

export default class Footer implements IDrawComponent {
  public draw() {
    const footer = getDOMElement(TAGS.footer, CONSTANTS.footer.class);
    const gitContainer = getDOMElement(TAGS.div, CONSTANTS.gitContainer.class);
    const gitLink1 = getDOMElement(
      TAGS.a,
      CONSTANTS.gitLink1.class,
      CONSTANTS.gitLink1.text,
      undefined,
      CONSTANTS.gitLink1.attributes,
    );
    const gitLink2 = getDOMElement(
      TAGS.a,
      CONSTANTS.gitLink2.class,
      CONSTANTS.gitLink2.text,
      undefined,
      CONSTANTS.gitLink2.attributes,
    );
    const rsschoolLogoContainer = getDOMElement(
      TAGS.div,
      CONSTANTS.rsschoolLogoContainer.class,
    );
    const rsschoolLogo = getDOMElement(
      TAGS.a,
      CONSTANTS.rsschoolLogo.class,
      undefined,
      undefined,
      CONSTANTS.rsschoolLogo.attributes,
    );
    const date = getDOMElement(
      TAGS.div,
      CONSTANTS.date.class,
      CONSTANTS.date.text,
    );

    gitContainer.append(gitLink1, gitLink2);
    rsschoolLogoContainer.append(rsschoolLogo);
    footer.append(gitContainer, date, rsschoolLogoContainer);

    return footer;
  }
}
