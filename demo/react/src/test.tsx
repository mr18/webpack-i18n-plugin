import React from "react";

export default class Test extends React.Component {
  state: any = {
    title: "标题tsx",
  };
  render() {
    return (
      <div>
        <header>这是标题tsx</header>
        <div title="这是提示文字tsx">
          <p>这是内容tsx</p>
        </div>
        <footer>{this.state.title}</footer>
      </div>
    );
  }
}
