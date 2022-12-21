import './logo.scss';
import IDrawComponent from '../../common/interface/IDrawComponent';
import getDOMElement from '../../common/helpers/getDOMElement';

export default class Logo implements IDrawComponent {
  public draw() {
    const logo = getDOMElement('h1', 'logo');
    const logoLink = getDOMElement('a', 'logo__link', 'Online Store', {
      href: './index.html',
    });

    logo.append(logoLink);

    return logo;
  }
}
