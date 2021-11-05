import React, { Component } from "react";
import prompt from "antd-prompt";
import { Button, message } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";

class Prompt extends Component {
  handler = async () => {
    try {
      const name = await prompt({
        title: "Please enter name",
        placeholder: "Your name",
        rules: [
          {
            required: true,
            message: "You must enter name",
          },
        ],
      });
      message.success("Your name is " + name);
    } catch (e) {
      message.error("Please enter name");
    }
  };
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={this.handler}>Press Here !</Button>

        <Link to="/questions">To Questions</Link>
      </div>
    );
  }
}

export default Prompt;
