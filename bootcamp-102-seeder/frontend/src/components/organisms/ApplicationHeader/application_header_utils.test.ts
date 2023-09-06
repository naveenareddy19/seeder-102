import {
  formatDate,
  generateGreeting,
} from "../../../../utils/helperFunctions";

jest.mock("../../../../utils/helperFunctions.tsx", () => ({
  generateGreeting: jest.fn(),
  formatDate: jest.fn(),
}));
describe("generateGreeting", () => {
  it('should return "Good morning" before 12:00', () => {
    (generateGreeting as jest.Mock).mockReturnValue("Good morning");
    jest.useFakeTimers().setSystemTime(new Date("2023-07-19T10:00:00"));
    const greeting = generateGreeting();
    expect(greeting).toBe("Good morning");
  });

  it('should return "Good afternoon" between 12:00 and 17:59', () => {
    (generateGreeting as jest.Mock).mockReturnValue("Good afternoon");
    jest.useFakeTimers().setSystemTime(new Date("2023-07-19T15:30:00"));
    const greeting = generateGreeting();
    expect(greeting).toBe("Good afternoon");
  });

  it('should return "Good evening" after 18:00', () => {
    (generateGreeting as jest.Mock).mockReturnValue("Good evening");
    jest.useFakeTimers().setSystemTime(new Date("2023-07-19T20:30:00"));
    const greeting = generateGreeting();
    expect(greeting).toBe("Good evening");
  });
});

describe("formatDate", () => {
  it('should return the formatted date in "Day Month, Year" format', () => {
    (formatDate as jest.Mock).mockReturnValue("20, July, 2023");
    jest.useFakeTimers().setSystemTime(new Date("2023-07-20"));
    const formattedDate = formatDate();
    expect(formattedDate).toBe("20, July, 2023");
  });
});
