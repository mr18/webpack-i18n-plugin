import React from "react";

export default class Test extends React.Component {
  state: any;
  constructor(props: any) {
    super(props);
    let b: string = "s";
    this.state = {
      title: "标题tsx" + b + " （ " + "撒" + b + "） ",
    };
  }
  render() {
    return (
      <div>
        <header>吓死</header>
        <div title="aaaxas">
          <p>
            萨达（<span>吓死</span>）
          </p>
        </div>
        <footer>{this.state.title}</footer>
      </div>
    );
  }
}
