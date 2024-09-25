import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders User Dashboard heading", () => {
  render(<App />);

  const headingElement = screen.getByText(/User Dashboard/i);
  expect(headingElement).toBeInTheDocument();
});
