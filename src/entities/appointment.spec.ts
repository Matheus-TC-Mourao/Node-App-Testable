import { expect, test } from "vitest";
import { Appointment } from "./appointment";
import { getFutureData } from "../tests/utils/get-future-date";

test("create an appointment", () => {
  const startsAt = getFutureData("2024-11-01");
  const endsAt = getFutureData("2024-11-02");

  const appointment = new Appointment({
    costumer: "Matheus Teixeira",
    startsAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.costumer).toEqual("Matheus Teixeira");
});

test("cannot create an appointment with end date before start date", () => {
  const startsAt = getFutureData("2024-11-02");
  const endsAt = getFutureData("2024-11-01");

  expect(() => {
    return new Appointment({
      costumer: "Matheus Teixeira",
      startsAt,
      endsAt,
    });
  }).toThrow();
});

test("cannot create an appointment with starts date before now", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() - 1);
  endsAt.setDate(endsAt.getDate() + 3);

  expect(() => {
    return new Appointment({
      costumer: "Matheus Teixeira",
      startsAt,
      endsAt,
    });
  }).toThrow();
});
