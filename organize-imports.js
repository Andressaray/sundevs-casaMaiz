const fs = require("fs");
const path = require("path");

const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"];
const IGNORE_DIRS = ["node_modules", ".git", "__tests__", "dist", "build"];

function isIgnoredDir(dir) {
  return IGNORE_DIRS.some((ignore) => dir.includes(ignore));
}

function getAllFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (isIgnoredDir(fullPath)) {
      return;
    }

    if (stat.isDirectory()) {
      files = files.concat(getAllFiles(fullPath));
    } else if (EXTENSIONS.includes(path.extname(item))) {
      files.push(fullPath);
    }
  });

  return files;
}

function categorizeImport(importLine) {
  const match = importLine.match(/from\s+['"]([^'"]+)['"]/);
  if (!match) {
    return { category: "other", line: importLine };
  }

  const module = match[1];

  if (/^react($|\/|-)/.test(module)) {
    return { category: "react", line: importLine, module };
  }

  if (module.startsWith("@") && !module.startsWith("@/")) {
    return { category: "scoped", line: importLine, module };
  }

  if (module.startsWith("@/")) {
    return { category: "local", line: importLine, module };
  }

  return { category: "other", line: importLine, module };
}

function sortImports(content) {
  const lines = content.split("\n");
  const importLines = [];
  let importEndIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("import ")) {
      importLines.push({ ...categorizeImport(line), originalLine: line });
      importEndIndex = i + 1;
    } else if (
      line.length > 0 &&
      !line.startsWith("/*") &&
      !line.startsWith("//")
    ) {
      break;
    }
  }

  if (importLines.length === 0) {
    return content;
  }

  const groups = {
    react: [],
    scoped: [],
    local: [],
    other: [],
  };

  importLines.forEach((imp) => {
    groups[imp.category].push(imp);
  });

  Object.keys(groups).forEach((key) => {
    groups[key].sort((a, b) => {
      const moduleA = a.module || a.originalLine;
      const moduleB = b.module || b.originalLine;
      return moduleA.localeCompare(moduleB);
    });
  });

  const sortedImports = [];

  if (groups.react.length > 0) {
    sortedImports.push(...groups.react.map((imp) => imp.originalLine));
  }

  if (groups.scoped.length > 0) {
    if (sortedImports.length > 0) {
      sortedImports.push("");
    }
    sortedImports.push(...groups.scoped.map((imp) => imp.originalLine));
  }

  if (groups.local.length > 0) {
    if (sortedImports.length > 0) {
      sortedImports.push("");
    }
    sortedImports.push(...groups.local.map((imp) => imp.originalLine));
  }

  if (groups.other.length > 0) {
    if (sortedImports.length > 0) {
      sortedImports.push("");
    }
    sortedImports.push(...groups.other.map((imp) => imp.originalLine));
  }

  const afterImports = lines.slice(importEndIndex).join("\n");
  const newContent =
    sortedImports.join("\n") +
    (afterImports.trim() ? "\n\n" + afterImports : "");

  return newContent;
}

const srcDir = process.argv[2] || "./src";
if (!fs.existsSync(srcDir)) {
  console.error(`Directory not found: ${srcDir}`);
  process.exit(1);
}

const files = getAllFiles(srcDir);

files.forEach((file) => {
  const content = fs.readFileSync(file, "utf8");
  const sorted = sortImports(content);

  if (content !== sorted) {
    fs.writeFileSync(file, sorted, "utf8");
    console.info(`✓ ${file}`);
  }
});
