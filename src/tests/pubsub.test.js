import events from "../modules/pubsub";

const mockFn = jest.fn((x) => `Your value is: ${x}`);

test("You can subscribe functions to events", () => {
  events.on("firstEvent", mockFn);
  expect(events.getEvents()).toEqual({ firstEvent: [mockFn] });
});

test("You can unsubscribe functions from events", () => {
  events.off("firstEvent", mockFn);
  expect(events.getEvents()).toEqual({ firstEvent: [] });
});

test("Emit an event calls its subscribed function", () => {
  events.on("emitTest", mockFn);
  events.emit("emitTest", "hi");
  expect(mockFn.mock.calls).toHaveLength(1);
  expect(mockFn.mock.calls[0][0]).toBe("hi");
  expect(mockFn.mock.results[0].value).toBe("Your value is: hi");
});
