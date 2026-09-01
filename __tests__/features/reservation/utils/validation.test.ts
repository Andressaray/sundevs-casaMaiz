import {
  isReservationFormValid,
  validateDate,
  validateName,
  validatePhone,
  validateReservationForm,
} from "@/features/reservation/utils/validation";

describe("features/reservation/utils / validation", () => {
  describe("validateName", () => {
    it("rechaza un nombre vacio", () => {
      expect(validateName("")).toBe("reservations.form.errors.name_required");
    });

    it("rechaza un nombre muy corto", () => {
      expect(validateName("Al")).toBe(
        "reservations.form.errors.name_too_short",
      );
    });

    it("acepta un nombre valido", () => {
      expect(validateName("Ana Torres")).toBeUndefined();
    });
  });

  describe("validatePhone", () => {
    it("rechaza un telefono vacio", () => {
      expect(validatePhone("")).toBe("reservations.form.errors.phone_required");
    });

    it("rechaza un telefono con formato invalido", () => {
      expect(validatePhone("abc123")).toBe(
        "reservations.form.errors.phone_invalid",
      );
    });

    it("acepta un telefono valido", () => {
      expect(validatePhone("+52 55 1234 5678")).toBeUndefined();
    });
  });

  describe("validateDate", () => {
    it("rechaza una fecha vacia", () => {
      expect(validateDate("")).toBe("reservations.form.errors.date_required");
    });

    it("rechaza una fecha con formato invalido", () => {
      expect(validateDate("not-a-date")).toBe(
        "reservations.form.errors.date_invalid",
      );
    });

    it("rechaza una fecha en el pasado", () => {
      expect(validateDate("2000-01-01")).toBe(
        "reservations.form.errors.date_past",
      );
    });

    it("acepta una fecha futura", () => {
      const future = new Date();
      future.setFullYear(future.getFullYear() + 1);
      const iso = future.toISOString().slice(0, 10);

      expect(validateDate(iso)).toBeUndefined();
    });
  });

  describe("validateReservationForm / isReservationFormValid", () => {
    it("marca el formulario como invalido cuando hay errores", () => {
      const errors = validateReservationForm({ name: "", phone: "", date: "" });

      expect(isReservationFormValid(errors)).toBe(false);
    });

    it("marca el formulario como valido cuando todos los campos son correctos", () => {
      const future = new Date();
      future.setFullYear(future.getFullYear() + 1);

      const errors = validateReservationForm({
        name: "Ana Torres",
        phone: "+52 55 1234 5678",
        date: future.toISOString().slice(0, 10),
      });

      expect(isReservationFormValid(errors)).toBe(true);
    });
  });
});
