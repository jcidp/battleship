const createElement = (element, content, classes, attributes) => {
  const ele = document.createElement(element);
  if (content) ele.textContent = content;
  if (classes && classes.length) {
    classes.split(" ").forEach((myClass) => ele.classList.add(myClass));
  }
  if (attributes)
    attributes.forEach((attribute) =>
      ele.setAttribute(attribute[0], attribute[1]),
    );
  return ele;
};

const renderLinkIcon = (name, viewBox, path, myClass) => {
  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const iconPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );

  const title = document.createElement("title");
  title.textContent = name;
  iconSvg.appendChild(title);

  iconSvg.setAttribute("viewBox", viewBox);

  iconPath.setAttribute("d", path);

  iconSvg.appendChild(iconPath);

  if (name === "pencil" || name === "delete") iconSvg.classList.add(name);
  if (myClass) iconSvg.classList.add(myClass);

  return iconSvg;
};

export { createElement, renderLinkIcon };
