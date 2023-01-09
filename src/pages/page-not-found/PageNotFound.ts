import './page-not-found.scss';
import { TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { CONSTANTS } from './constants';

export class PageNotFound implements IDrawComponent {
  public draw(): HTMLElement {
    const wrapper = getDOMElement(TAGS.div, CONSTANTS.class);
    const title = getDOMElement(
      TAGS.h1,
      CONSTANTS.title.class,
      CONSTANTS.title.text,
    );
    const returnStart = getDOMElement(
      TAGS.span,
      CONSTANTS.returnStart.class,
      CONSTANTS.returnStart.text,
    );
    const returnLink = getDOMElement(
      TAGS.a,
      CONSTANTS.returnLink.class,
      CONSTANTS.returnLink.text,
      undefined,
      CONSTANTS.returnLink.attr,
    );
    const returnEnd = getDOMElement(
      TAGS.span,
      CONSTANTS.returnEnd.class,
      CONSTANTS.returnEnd.text,
    );

    wrapper.append(title, returnStart, returnLink, returnEnd);

    return wrapper;
  }
}
