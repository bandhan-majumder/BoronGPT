/*
 * Base structure of a nodejs project
 */

export const basePromptAsXML =
  '<boronArtifact id=\"project-import\" title=\"Project Files\"><boronAction type=\"file\" filePath=\"index.js\">// run `node index.js` in the terminal\n\nconsole.log(`Hello Node.js v${process.versions.node}!`);\n</boronAction><boronAction type=\"file\" filePath=\"package.json\">{\n  \"name\": \"node-starter\",\n  \"private\": true,\n  \"scripts\": {\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n  }\n}\n</boronAction></boronArtifact>';

export const basePromptAsJson = {
  boronArtifact: {
    id: "project-import",
    title: "Project Files",
    boronActions: [
      {
        type: "file",
        filePath: "index.js",
        content:
          "// run `node index.js` in the terminal\n\nconsole.log(`Hello Node.js v${process.versions.node}!`);",
      },
      {
        type: "file",
        filePath: "package.json",
        content:
          '{\n  "name": "node-starter",\n  "private": true,\n  "scripts": {\n    "test": "echo \\"Error: no test specified\\" && exit 1"\n  }\n}',
      },
    ],
  },
};
