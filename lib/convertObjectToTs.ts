export function convertToTs(value: any, spaceCount = 0): string {
  let type = getBasicType(value);
  if (type) {
    return type;
  }
  if (Array.isArray(value)) {
    type = getArrayType(value, spaceCount);
  } else if (typeof value === "object") {
    type = getObjectType(value, spaceCount);
  } else if (typeof value === "function") {
    type = "(...args: unknown[]) => unknown";
  }
  return type || "unknown";
}

function getObjectType(obj: Record<string, any>, spaceCount = 0): string {
  const keys = Object.keys(obj);
  keys.sort();

  let spaces = "";
  for (let i = 0; i < spaceCount; i++) {
    spaces += " ";
  }
  let str = "{";

  const lines = keys
    .map((key) => {
      const value = obj[key];

      let type = convertToTs(value, spaceCount + 2);

      return `${key}: ${type}`;
    })
    .map((line) => spaces + "  " + line + ";");

  if (lines.length > 0) {
    str = str + "\n" + lines.join("\n") + "\n" + spaces;
  }
  return str + "}";
}

function getArrayType(arr: Array<any>, spaceCount = 0): string {
  let str = "Array<";

  const allTypes: Record<string, boolean> = {};
  arr.forEach((arrValue) => {
    const arrType = convertToTs(arrValue, spaceCount);
    allTypes[arrType] = true;
  });
  const types = Object.keys(allTypes);

  str += types.join(" | ");

  return str + ">";
}

function getBasicType(value: any): string | null {
  let type: string | null = null;
  if (
    typeof value === "string" ||
    value instanceof String ||
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "bigint"
  ) {
    type = typeof value;
  } else if (value instanceof Date) {
    type = "Date";
  } else if (value === null || value === undefined) {
    type = "unknown";
  } else if (typeof value === "function") {
    type = "(...args: unknown[]) => unknown";
  }

  return type;
}
