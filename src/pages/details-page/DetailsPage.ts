import './details-page.scss';
import { TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { Details } from '../../components/details/Details';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { CLASS } from './constants';

export class DetailsPage implements IDrawComponent {
  private footer: HTMLElement;
  private header: HTMLElement;
  private details: HTMLElement;

  constructor(data: Data) {
    this.header = new Header().draw();
    this.footer = new Footer().draw();
    this.details = new Details(data).draw();
  }

  draw(): HTMLElement {
    const main = getDOMElement(TAGS.main, CLASS);

    main.append(this.header, this.details, this.footer);

    return main;
  }
}
