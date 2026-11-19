import { getProjectState } from "./script.js";

export function registerActions(actions) {

    actions.register({

        name: "get_project_state",

        description:
            "Returns all current projects managed by the PMO system.",

        effect: "read",

        inputSchema: {
            type: "object",
            properties: {},
            additionalProperties: false
        },

        execute: () => getProjectState()

    });

}