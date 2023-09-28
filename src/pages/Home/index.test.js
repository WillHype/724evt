import { waitFor,fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await waitFor(() => screen.getByText("Message envoyé !"), { timeout: 2000 });
      // await screen.findByText("Message envoyé !");
    });
  });

});

// Tests d'intégrations

describe("When a page is created", () => {
  beforeEach(() => {
    render(<Home />);
  });
  it("a list of events is displayed",async () => {
    const Container = screen.getByTestId("events");
    expect(Container).toBeInTheDocument();
  })
  it("a list a people is displayed", async () => {
    const Container = screen.getByTestId("people-list");
    expect(Container.childElementCount).toEqual(6);
  })
  it("a footer is displayed", () => {
    const Footer = screen.getByTestId("Footer");
    expect(Footer).toBeInTheDocument();

  })
  it("an event card, with the last event, is displayed", () => {
    const Footer = screen.getByTestId("Footer");
    const LastEvent = Footer.firstChild;
    expect(LastEvent).toBeInTheDocument();
  })
});
