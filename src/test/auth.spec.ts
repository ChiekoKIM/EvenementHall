import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { nextTick } from "vue";
import HomeView from "../views/HomeView.vue";



describe("HomeView.vue", () => {
  it("redirige vers 'SimulationSalle' si le mot de passe est correct", async () => {
    // 1️⃣ Mock de `router.push`
    const push = vi.fn();
    const router = { push };

    // 2️⃣ Monter le composant avec le router mocké
    const wrapper = mount(HomeView, {
      global: {
        mocks: {
          $router: router, // Simule Vue Router
        },
      },
    });

    // 3️⃣ Modifier la valeur du mot de passe
    await wrapper.find("input").setValue("1234");

    // 4️⃣ Simuler un clic sur le bouton
    await wrapper.find("button").trigger("click");

    // 5️⃣ Vérifier les appels du mock
    console.log("Calls to push:", push.mock.calls); // 🔍 Debugging

    // 6️⃣ Vérifier que `router.push` a bien été appelé avec le bon argument
    expect(router.push).toHaveBeenCalledWith({ path: "SimulationSalle" });
  });
});
