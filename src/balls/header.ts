interface Options {
  parentElement: HTMLElement;
  onChange: (count: number) => any;
}

export default class Header {
  parentEelement: HTMLElement;
  onChange: (count: number) => any;

  constructor(options: Options) {
    this.parentEelement = options.parentElement;
    this.onChange = options.onChange;
  }

  render() {
    const container = document.createElement('div');
    container.classList.add('header');

    const headerText = document.createElement('div');
    headerText.classList.add('header__text');
    headerText.innerHTML = 'Bouncing balls';
    container.appendChild(headerText);

    const content = document.createElement('div');
    content.classList.add('header__content');
    container.appendChild(content);

    const input = document.createElement('input');
    content.appendChild(input);

    const buttonLayerOne = document.createElement('div');
    buttonLayerOne.classList.add('header__start-button__layer-one');

    const buttonLayerTwo = document.createElement('div');
    buttonLayerTwo.classList.add('header__start-button__layer-two');
    buttonLayerOne.appendChild(buttonLayerTwo);

    const button = document.createElement('button');
    button.classList.add('header__start-button__button');
    button.innerHTML = 'RUN';
    buttonLayerTwo.append(button);
    content.appendChild(buttonLayerOne);

    button.onclick = () => {
      const count = Number.parseInt(input.value);
      if (Number.isNaN(count) || count < 0 || count > 1000) {
        alert('input should be >=0 && <=1000');
        return;
      }
      this.onChange(count);
    };

    this.parentEelement.appendChild(container);
    // create fade in effect
    setTimeout(() => {
      container.classList.add('header--in');
    });
  }
}
