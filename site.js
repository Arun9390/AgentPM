import { boot } from "./runtime/index.js";
import { getProjectState } from "./script.js";

const status =
    document.querySelector(
        "#assistant-status"
    );

const siteBase =
    new URL(
        "./",
        import.meta.url
    ).href;

try {

    const { engine } =
        await boot(
            "#agent-app",
            {
                originUrl: siteBase,
                sandboxWorkerUrl:
                    new URL(
                        "runtime/sandbox-worker.js",
                        siteBase
                    ).href
            }
        );

    const network =
        engine.top.network;

    const originalGetAgentSpec =
        network.getAgentSpec.bind(
            network
        );

    network.getAgentSpec =
        (name) => {

            const spec =
                originalGetAgentSpec(
                    name
                );

            if (!spec) {
                return null;
            }

            return {
                ...spec,

                instructions:
`${spec.instructions}

Current Project State:
${JSON.stringify(getProjectState(), null, 2)}`
            };
        };

    status.textContent =
        "✅ Chief Agent connected successfully";

}
catch (error) {

    status.textContent =
        `❌ Assistant unavailable: ${error.message}`;

    console.error(
        "Assistant startup failed",
        error
    );
}