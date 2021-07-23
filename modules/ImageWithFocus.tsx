import Image from "next/image";
import React from "react";
import styles from "./ImageWithFocus.module.scss";

const GetImage = (props) => {
  return (
    <Image
      src={props.res.image_data}
      alt="Test Pic Zoom"
      width={props.res.width}
      height={props.res.height}
    />
  );
};

export default class ImageWithFocus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prev) => ({
      display: !prev.display,
    }));
  }

  render() {
    const normal_res = this.props.normal_res;
    const focus_res = this.props.focus_res;
    const link = this.props.image_data;
    const focus_elem = (
      <div className={styles.image_focus}>
        <a href="#image-focus" onClick={this.handleClick}>
          <GetImage
            res={{
              image_data: link,
              width: focus_res[0],
              height: focus_res[1],
            }}
          />
        </a>
      </div>
    );
    return (
      <div>
        <a href="#image-focus" onClick={this.handleClick}>
          <GetImage
            res={{
              image_data: link,
              width: normal_res[0],
              height: normal_res[1],
            }}
          />
        </a>
        {this.state.display && focus_elem}
      </div>
    );
  }
}
