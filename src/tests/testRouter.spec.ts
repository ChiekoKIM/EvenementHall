import { shallowMount } from "@vue/test-utils";
import { beforeEach, describe, test, vi, expect } from "vitest";
import { useRouter, type Router } from "vue-router"; // Import du type Router
import HomeView from "../views/HomeView.vue";

vi.mock("vue-router");

describe("HomeView", () => {
  const pushMock = vi.fn();

  const mockRouter = {
    push: pushMock,
    currentRoute: {},
  } as unknown as Router;

  vi.mocked(useRouter).mockReturnValue(mockRouter);

  beforeEach(() => {
    pushMock.mockClear();
  });

  test(`navigates to simulationsakke when button is clicked`, async () => {
    const wrapper = shallowMount(HomeView);

    console.log(wrapper.html());
    // Simule un clic sur le bouton
    await wrapper.find("button").trigger("click");

    // Vérifie que `router.push()` a bien été appelé avec `SimulationSalle`
    expect(mockRouter.push).toHaveBeenCalledWith("/simulationsalle");
  });
});
