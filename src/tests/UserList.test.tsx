import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import UserList from "../components/UserList";
import axios from "axios";

jest.mock("axios");

describe("UserList Component", () => {
  const mockUsers = [
    {
      id: 1,
      name: "Leanne Graham",
      email: "Sincere@april.biz",
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      address: {
        street: "Kulas Light",
        city: "Gwenborough",
      },
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "Shanna@melissa.tv",
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      address: {
        street: "Victor Plains",
        city: "Wisokyburgh",
      },
    },
  ];

  test("renders loading state", () => {
    render(<UserList />);
    expect(screen.getByText(/loading users/i)).toBeInTheDocument();
  });

  test("renders UserList component with mocked users", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUsers });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/Leanne Graham/i)).toBeInTheDocument();
      expect(screen.getByText(/Ervin Howell/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Sincere@april.biz/i)).toBeInTheDocument();
    expect(screen.getByText(/1-770-736-8031 x56442/i)).toBeInTheDocument();
    expect(screen.getByText(/hildegard.org/i)).toBeInTheDocument();
    expect(screen.getByText(/Kulas Light, Gwenborough/i)).toBeInTheDocument();
    expect(screen.getByText(/Shanna@melissa.tv/i)).toBeInTheDocument();
    expect(screen.getByText(/010-692-6593 x09125/i)).toBeInTheDocument();
    expect(screen.getByText(/anastasia.net/i)).toBeInTheDocument();
    expect(screen.getByText(/Victor Plains, Wisokyburgh/i)).toBeInTheDocument();
  });

  test("renders error message when API fails", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load users/i)).toBeInTheDocument();
    });
  });

  test("filters users based on input", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUsers });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/Leanne Graham/i)).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByPlaceholderText(/filter by name, email, phone, or website/i),
      {
        target: { value: "Ervin" },
      }
    );

    expect(screen.getByText(/Ervin Howell/i)).toBeInTheDocument();
    expect(screen.queryByText(/Leanne Graham/i)).not.toBeInTheDocument();
  });

  test("toggles sorting order", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUsers });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/Leanne Graham/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/sort by email/i));

    await waitFor(() => {
      expect(screen.getByText(/Ervin Howell/i)).toBeInTheDocument();
      expect(screen.getByText(/Leanne Graham/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText(/sort by email/i));

    await waitFor(() => {
      expect(screen.getByText(/Ervin Howell/i)).toBeInTheDocument();
    });
  });
});
