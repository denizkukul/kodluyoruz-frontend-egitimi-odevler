import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import filterEmoji from "./filterEmoji"
import App from "./App";

beforeEach(() => {
  render(<App />);
})

test("Header renders correctly", () => {
  const header = screen.getByText("Emoji Search");
  expect(header).toBeInTheDocument;
})

test("Emoji-list renders correctly at start", () => {
  const emojiList = screen.getByTestId("emoji-list");
  const emojies = screen.getAllByTestId("emoji-result-row");
  expect(emojiList).toBeInTheDocument;
  expect(emojies).toHaveLength(20);
})

test("Emoji-list renders correctly after filter", () => {
  const searchInput = screen.getByTestId('search-input')
  const searchText = ["hand", "asdwa"];
  searchText.forEach(item => {
    userEvent.type(searchInput, item);
    const filtered = filterEmoji(item, 20);
    const filteredTitles = filtered.map(item => item.title);
    if (filtered.length > 0) {
      const emojiNames = screen.getAllByTestId("emojiname");
      emojiNames.forEach((item) => {
        expect(filteredTitles).toContain(item.textContent);
      });
    }
    else {
      const emojies = screen.queryByTestId("emojiname");
      expect(emojies).not.toBeInTheDocument;
    }
  })
})

test("Emoji should be copied on click.", () => {
  document.execCommand = jest.fn();

  const emojies = screen.getAllByTestId("emojiname");
  let item = emojies[0];

  userEvent.click(item);

  expect(document.execCommand).toHaveBeenCalledTimes(1);
  expect(document.execCommand).toHaveBeenCalledWith("copy");
})