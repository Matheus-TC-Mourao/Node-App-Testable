import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";
import { getFutureData } from "../tests/utils/get-future-date";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";

describe("Create Appointment", () => {
  it("should be able to create an appointment", () => {
    const appointmentRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    const startsAt = getFutureData("2024-11-01");
    const endsAt = getFutureData("2024-11-02");

    expect(
      createAppointment.execute({
        costumer: "Matheus Teixeira",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should not be able to create an appointment with overlapping date", async () => {
    const appointmentRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    const startsAt = getFutureData("2024-11-02");
    const endsAt = getFutureData("2024-11-06");

    await createAppointment.execute({
      costumer: "Matheus Teixeira",
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        costumer: "Matheus Teixeira",
        startsAt: getFutureData("2024-11-01"),
        endsAt: getFutureData("2024-11-04"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        costumer: "Matheus Teixeira",
        startsAt: getFutureData("2024-11-03"),
        endsAt: getFutureData("2024-11-08"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        costumer: "Matheus Teixeira",
        startsAt: getFutureData("2024-11-01"),
        endsAt: getFutureData("2024-11-08"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        costumer: "Matheus Teixeira",
        startsAt: getFutureData("2024-11-03"),
        endsAt: getFutureData("2024-11-05"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
