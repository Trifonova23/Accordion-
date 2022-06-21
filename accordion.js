async function solution() {
  const main = document.getElementById("main");
  const url = `http://localhost:3030/jsonstore/advanced/articles/list`;

  const response = await fetch(url);
  const data = await response.json();

  data.forEach((a) => {
    let divAccordion = createElement("div", "", ["class", "accordion"]);
    let divHead = createElement("div", "", ["class", "head"]);
    let span = createElement("span", a.title);
    let button = createElement("button", "more", [
      "class",
      "button",
      "id",
      a._id,
    ]);

    let divExtra = createElement("div", "", ["class", `extra ${a._id}`]);
    let p = createElement("p");

    button.addEventListener("click", async (event) => {
      console.log("in the event", event.path[0].id);
      const initialsValue = event.path[0].id;
      const url = `http://localhost:3030/jsonstore/advanced/articles/details/${initialsValue}`;

      const responseExtraInformation = await fetch(url);
      const dataExtraInformation = await responseExtraInformation.json();

      console.log(document.querySelector(`#${initialsValue}`));
      if (document.querySelector(`#${initialsValue}`).textContent === "more") {
        document.querySelector(`#${initialsValue}`).textContent = "less";
        document.querySelector(`.${initialsValue}`).style.display = "block";
        document.querySelector(`.${initialsValue} p`).textContent =
          dataExtraInformation.content;
      } else {
        document.querySelector(`#${initialsValue}`).textContent = "more";
        document.querySelector(`.${initialsValue}`).style.display = "none";
        document.querySelector(`.${initialsValue} p`).textContent = "";
      }
    });

    divAccordion.appendChild(divHead);
    divHead.appendChild(span);
    divHead.appendChild(button);
    divAccordion.appendChild(divExtra);
    divExtra.appendChild(p);
    main.appendChild(divAccordion);
  });

  function createElement(type, content, attributes = []) {
    const element = document.createElement(type);
    if (content) {
      element.textContent = content;
    }

    if (attributes.length > 0) {
      for (let i = 0; i < attributes.length; i += 2) {
        element.setAttribute(attributes[i], attributes[i + 1]);
      }
    }
    return element;
  }
}
solution();
