const projectState = {
    projects: []
};

let totalProjects = 0;

export function createProject() {

    const project =
        document.getElementById(
            "projectName"
        ).value.trim();

    if (!project) {
        alert("Please enter a project name");
        return;
    }

    const priority =
        document.getElementById(
            "priority"
        ).value;

    projectState.projects.push({
        name: project,
        status: "In Progress",
        progress: 65,
        priority: priority,
        assignedDeveloper: "Developer Agent",
        assignedTester: "Tester Agent"
    });

    totalProjects++;

    document.getElementById(
        "projectCount"
    ).innerText = totalProjects;

    document.getElementById(
        "chiefLogs"
    ).innerHTML =
    `
    <div class="log">
        ✅ Chief Agent analyzed project:
        <strong>${project}</strong>
    </div>

    <div class="log">
        👨‍💻 Developer Agent assigned implementation tasks
    </div>

    <div class="log">
        🧪 Tester Agent assigned validation tasks
    </div>

    <div class="log">
        🚀 Project launched with ${priority} priority
    </div>
    `;

    const card = document.createElement("div");

    card.className = "project";

    card.innerHTML =
    `
      <h4>${project}</h4>

      <p><strong>Status:</strong> In Progress</p>

      <p><strong>Priority:</strong> ${priority}</p>

      <p><strong>Developer:</strong> Developer Agent</p>

      <p><strong>Tester:</strong> Tester Agent</p>

      <div class="progress">
          <div class="fill"></div>
      </div>
    `;

    document
        .getElementById(
            "projectContainer"
        )
        .prepend(card);

    setTimeout(() => {

        card.querySelector(
            ".fill"
        ).style.width = "65%";

    }, 300);

    document.getElementById(
        "projectName"
    ).value = "";
}

export function getProjectState() {
    return projectState;
}

// Enable onclick="createProject()"
window.createProject = createProject;