// 1

function buildHtml(obj) {
  if (!obj.tagName) {
    return "";
  }

  let string = "<" + obj.tagName;
  if (obj.attrs) {
    for (let attr in obj.attrs) {
      string += " " + attr + '="' + obj.attrs[attr] + '"';
    }
  }
  string += ">";

  if (obj.children) {
    for (let i in obj.children) {
      if (typeof obj.children[i] === "string") {
        string += obj.children[i];
      } else {
        string += buildHtml(obj.children[i]);
      }
    }
  }

  string += "</" + obj.tagName + ">";

  return string;
}

const table = {
  tagName: "table",
  attrs: {
    border: "1",
  },
  children: [
    {
      tagName: "tr",
      children: [
        {
          tagName: "td",
          children: ["1x1"],
        },
        {
          tagName: "td",
          children: ["1x2"],
        },
      ],
    },
    {
      tagName: "tr",
      children: [
        {
          tagName: "td",
          children: ["2x1"],
        },
        {
          tagName: "td",
          children: ["2x2"],
        },
      ],
    },
  ],
};

let htmlTree = buildHtml(table);
document.write(htmlTree);

// Рекурсия: DOM tree

function domTree(parent, obj) {
  if (!obj.tagName) {
    return;
  }
  let element = document.createElement(obj.tagName);
  if (obj.attrs) {
    for (let attr in obj.attrs) {
      element.setAttribute(attr, obj.attrs[attr]);
    }
  }
  if (obj.children) {
    for (let child in obj.children) {
      if (typeof obj.children[child] === "string") {
        element.append(document.createTextNode(obj.children[child]));
      } else {
        domTree(element, obj.children[child]);
      }
    }
  }

  parent.append(element);
}

const table = {
  tagName: "table",
  attrs: {
    border: "1",
  },
  children: [
    {
      tagName: "tr",
      children: [
        {
          tagName: "td",
          children: ["1x1"],
        },
        {
          tagName: "td",
          children: ["1x2"],
        },
      ],
    },
    {
      tagName: "tr",
      children: [
        {
          tagName: "td",
          children: ["2x1"],
        },
        {
          tagName: "td",
          children: ["2x2"],
        },
      ],
    },
  ],
};
domTree(document.body, table);

// Deep Copy

function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null || obj === undefined) {
    return obj;
  }
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    newObj[key] = deepCopy(obj[key]);
  }
  return newObj;
}

const arr = [
  1,
  "string",
  null,
  undefined,
  { a: 15, b: 10, c: [1, 2, 3, 4], d: undefined, e: true },
  true,
  false,
];
const arr2 = deepCopy(arr);

// My Stringify

function stringify(value) {
  if (typeof value === "string") {
    return '"' + value + '"';
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return value.toString();
  }

  if (value === null) {
    return "null";
  }

  if (typeof value === "undefined") {
    return "undefined";
  }

  if (Array.isArray(value)) {
    let items = [];

    for (let i in value) {
      items.push(stringify(value[i]));
    }

    return "[" + items.join(",") + "]";
  }

  if (typeof value === "object") {
    let properties = [];

    for (let key in value) {
      properties.push('"' + key + '":' + stringify(value[key]));
    }
    return "{" + properties.join(",") + "}";
  }
}
const table = {
  tagName: "table",
  attrs: {
    border: "1",
  },
  children: [
    {
      tagName: "tr",
      children: [
        {
          tagName: "td",
          children: ["1x1"],
        },
        {
          tagName: "td",
          children: ["1x2"],
        },
      ],
    },
    {
      tagName: "tr",
      children: [
        {
          tagName: "td",
          children: ["2x1"],
        },
        {
          tagName: "td",
          children: ["2x2"],
        },
      ],
    },
  ],
};
let jsonString = stringify(table);
console.log(JSON.parse(jsonString));




