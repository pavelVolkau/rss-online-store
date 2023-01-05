import './details-page.scss';
import { TAGS } from '../../common/helpers/constants';
import getDOMElement from '../../common/helpers/getDOMElement';
import IDrawComponent from '../../common/interface/IDrawComponent';
import { Data } from '../../common/types/data';
import { Details } from '../../components/details/Details';
import { CLASS } from './constants';
import { Crumbs } from '../../components/crumbs/Crumbs';

export class DetailsPage implements IDrawComponent {
  private details: HTMLElement;
  private crumbs: HTMLElement;

  constructor(data: Data) {
    this.details = new Details(data).draw();
    this.crumbs = new Crumbs(data).draw();
  }

  draw(): HTMLElement {
    const wrapper = getDOMElement(TAGS.div, CLASS);

    wrapper.append(this.crumbs, this.details);

    return wrapper;
  }
}
