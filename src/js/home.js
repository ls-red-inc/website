const boardMembers = document.querySelector(".board-members tbody");

fetch("data/home.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load home data (${response.status})`);
    }
    return response.json();
  })
  .then((data) => {
    document.title = data.title;
    document.querySelector("#site-title").textContent = data.title;
    document.querySelector("#site-description").textContent = data.description;

    boardMembers.replaceChildren(
      ...data["board-members"].map(({ role, name }) => {
        const item = document.createElement("tr");
        const roleLabel = document.createElement("th");
        const memberName = document.createElement("td");
        roleLabel.scope = "row";
        roleLabel.textContent = role;
        memberName.textContent = name;
        item.append(roleLabel, memberName);
        return item;
      }),
    );
  })
  .catch((error) => {
    console.error(error);
    const errorRow = document.createElement("tr");
    const message = document.createElement("td");
    message.colSpan = 2;
    message.textContent = "Board members could not be loaded.";
    errorRow.append(message);
    boardMembers.replaceChildren(errorRow);
  });
